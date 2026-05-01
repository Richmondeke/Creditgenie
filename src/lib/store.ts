import { create } from "zustand";
import React from "react";
import { LoanApplication, ApplicationStatus, ReviewAction, UserProfile, UserRole } from "./types";
import {
    signInWithRedirect,
    getRedirectResult,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { auth, db, googleProvider } from "./firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    getDoc,
    setDoc,
    query,
    orderBy,
    onSnapshot
} from "firebase/firestore";

// Persist a user profile to Firestore so role survives page refresh
async function saveUserProfile(profile: UserProfile): Promise<void> {
    await setDoc(doc(db, "users", profile.id), {
        name: profile.name,
        email: profile.email,
        role: profile.role,
        creditLimit: profile.creditLimit,
        availableLimit: profile.availableLimit,
    }, { merge: true });
}

// Load a stored profile from Firestore, returns null if not found
async function loadUserProfile(uid: string): Promise<UserProfile | null> {
    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) return null;
    return { id: uid, ...snap.data() } as UserProfile;
}

interface ApplicationStore {
    applications: LoanApplication[];
    isLoading: boolean;
    authLoading: boolean;
    currentUser: UserProfile | null;
    addApplication: (app: Omit<LoanApplication, "id" | "status" | "createdAt" | "updatedAt" | "reviews" | "userId">) => void;
    updateApplicationStatus: (id: string, status: ApplicationStatus, review?: ReviewAction) => void;
    fetchApplications: () => void;
    setCurrentUser: (user: UserProfile | null) => void;
    signInWithGoogle: (role?: UserRole) => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (name: string, email: string, password: string, role?: UserRole) => Promise<void>;
    logout: () => Promise<void>;
    initAuth: () => void;
}

export const useApplicationStore = create<ApplicationStore>((set, get) => ({
    applications: [],
    isLoading: true,
    authLoading: true,
    currentUser: null,
    fetchApplications: () => {
        set({ isLoading: true });
        const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));

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
            localStorage.setItem("pending_role", role);
            await signInWithRedirect(auth, googleProvider);
        } catch (error) {
            console.error("Auth error:", error);
            throw error;
        }
    },

    signInWithEmail: async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;
            const stored = await loadUserProfile(user.uid);
            
            const profile: UserProfile = stored ?? {
                id: user.uid,
                name: user.displayName || user.email?.split('@')[0] || "Lydra User",
                email: user.email || "",
                role: "USER",
                creditLimit: 5000000,
                availableLimit: 5000000,
            };
            
            if (!stored) await saveUserProfile(profile);
            set({ currentUser: profile });
        } catch (error) {
            console.error("Email sign-in error:", error);
            throw error;
        }
    },

    signUpWithEmail: async (name, email, password, role = "USER") => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            await updateProfile(user, { displayName: name });
            
            const profile: UserProfile = {
                id: user.uid,
                name,
                email: user.email || "",
                role,
                creditLimit: role === "USER" ? 5000000 : 0,
                availableLimit: role === "USER" ? 5000000 : 0,
            };
            await saveUserProfile(profile);
            set({ currentUser: profile });
        } catch (error) {
            console.error("Email sign-up error:", error);
            throw error;
        }
    },

    logout: async () => {
        await signOut(auth);
        set({ currentUser: null });
    },

    initAuth: () => {
        // 1. Handle redirect result
        getRedirectResult(auth).then(async (result) => {
            if (result?.user) {
                const user = result.user;
                const pendingRole = (localStorage.getItem("pending_role") as UserRole) || "USER";
                localStorage.removeItem("pending_role");

                const existing = await loadUserProfile(user.uid);
                const profile: UserProfile = existing ?? {
                    id: user.uid,
                    name: user.displayName || "Unknown User",
                    email: user.email || "",
                    role: pendingRole,
                    creditLimit: pendingRole === "USER" ? 5000000 : 0,
                    availableLimit: pendingRole === "USER" ? 5000000 : 0,
                };

                if (!existing) await saveUserProfile(profile);
                set({ currentUser: profile });
            }
        }).catch(err => console.error("Redirect result error:", err));

        // 2. Persistent listener with async profile recovery
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const stored = await loadUserProfile(user.uid);
                const profile: UserProfile = stored ?? {
                    id: user.uid,
                    name: user.displayName || user.email?.split('@')[0] || "Lydra User",
                    email: user.email || "",
                    role: "USER",
                    creditLimit: 5000000,
                    availableLimit: 5000000,
                };
                set({ currentUser: profile, authLoading: false });
            } else {
                set({ currentUser: null, authLoading: false });
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
            const docRef = await addDoc(collection(db, "applications"), newApp);
            await addDoc(collection(db, "activity"), {
                type: "APPLICATION_SUBMITTED",
                actor: currentUser?.name || appData.applicantName,
                detail: appData.applicantName,
                meta: appData.purpose || "",
                applicationId: docRef.id,
                createdAt: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Error adding application:", error);
        }
    },
    updateApplicationStatus: async (id, status, review) => {
        const { currentUser } = get();
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
            await addDoc(collection(db, "activity"), {
                type: "STATUS_CHANGED",
                actor: currentUser?.name || review?.role || "System",
                detail: app.applicantName,
                meta: status,
                applicationId: id,
                approved: review?.approved ?? null,
                createdAt: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Error updating application:", error);
        }
    },
}));

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

export interface ActivityEvent {
    id: string;
    type: string;
    actor: string;
    detail: string;
    meta: string;
    applicationId?: string;
    approved?: boolean | null;
    createdAt: string;
}

export function useActivityFeed() {
    const [events, setEvents] = React.useState<ActivityEvent[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const q = query(collection(db, "activity"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items: ActivityEvent[] = snapshot.docs.map(d => ({
                id: d.id,
                ...d.data(),
            } as ActivityEvent));
            setEvents(items);
            setIsLoading(false);
        }, (err) => {
            console.error("Activity feed error:", err);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return { events, isLoading };
}
