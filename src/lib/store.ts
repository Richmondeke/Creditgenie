import { create } from "zustand";
import React from "react";
import { LoanApplication, ApplicationStatus, ReviewAction, UserProfile, UserRole } from "./types";
import {
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { auth, db, googleProvider } from "./firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    query,
    orderBy,
    onSnapshot
} from "firebase/firestore";

interface ApplicationStore {
    applications: LoanApplication[];
    isLoading: boolean;
    currentUser: UserProfile | null;
    addApplication: (app: Omit<LoanApplication, "id" | "status" | "createdAt" | "updatedAt" | "reviews" | "userId">) => void;
    updateApplicationStatus: (id: string, status: ApplicationStatus, review?: ReviewAction) => void;
    fetchApplications: () => void;
    setCurrentUser: (user: UserProfile | null) => void;
    signInWithGoogle: (role?: UserRole) => Promise<void>;
    logout: () => Promise<void>;
    initAuth: () => void;
}

export const useApplicationStore = create<ApplicationStore>((set, get) => ({
    applications: [],
    isLoading: true,
    currentUser: null,
    fetchApplications: () => {
        set({ isLoading: true });
        const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));

        // Use onSnapshot for real-time updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const apps: LoanApplication[] = [];
            querySnapshot.forEach((doc) => {
                apps.push({ id: doc.id, ...doc.data() } as LoanApplication);
            });
            set({ applications: apps, isLoading: false });
        }, (error) => {
            console.error("Error fetching applications:", error);
            set({ isLoading: false });
        });

        return unsubscribe;
    },
    setCurrentUser: (user) => set({ currentUser: user }),

    signInWithGoogle: async (role = "USER") => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            set({
                currentUser: {
                    id: user.uid,
                    name: user.displayName || "Unknown User",
                    email: user.email || "",
                    role: role,
                    creditLimit: role === "USER" ? 5000000 : 0,
                    availableLimit: role === "USER" ? 5000000 : 0,
                }
            });
        } catch (error) {
            console.error("Auth error:", error);
            throw error;
        }
    },

    logout: async () => {
        await signOut(auth);
        set({ currentUser: null });
    },

    initAuth: () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // If we have a user but no role-specific profile in state yet,
                // we might need to fetch it from Firestore or use a default.
                // For this demo, we'll assume the sign-in process sets the role.
                const { currentUser } = get();
                if (!currentUser) {
                    set({
                        currentUser: {
                            id: user.uid,
                            name: user.displayName || "Unknown User",
                            email: user.email || "",
                            role: "USER", // Default
                            creditLimit: 5000000,
                            availableLimit: 5000000,
                        }
                    });
                }
            } else {
                set({ currentUser: null });
            }
        });
    },

    addApplication: async (appData) => {
        const { currentUser } = get();
        try {
            const newApp = {
                ...appData,
                userId: currentUser?.id || "anonymous",
                status: "PENDING_TEAM_LEAD",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                reviews: [],
            };
            await addDoc(collection(db, "applications"), newApp);
        } catch (error) {
            console.error("Error adding application:", error);
        }
    },
    updateApplicationStatus: async (id, status, review) => {
        try {
            const appRef = doc(db, "applications", id);
            const app = get().applications.find(a => a.id === id);
            if (!app) return;

            const reviews = review ? [...app.reviews, review] : app.reviews;
            await updateDoc(appRef, {
                status,
                reviews,
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error updating application:", error);
        }
    },
}));

// Helper hook for easy usage
export function useApplications() {
    const fetchApplications = useApplicationStore(state => state.fetchApplications);
    const applications = useApplicationStore(state => state.applications);
    const isLoading = useApplicationStore(state => state.isLoading);

    React.useEffect(() => {
        const unsubscribe = fetchApplications();
        return () => {
            if (typeof unsubscribe === 'function') {
                (unsubscribe as () => void)();
            }
        };
    }, [fetchApplications]);

    return { applications, isLoading };
}
