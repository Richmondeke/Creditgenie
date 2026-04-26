"use client";

import { create } from "zustand";
import React from "react";
import { LoanApplication, ApplicationStatus, ReviewAction } from "./types";

interface ApplicationStore {
    applications: LoanApplication[];
    isLoading: boolean;
    addApplication: (app: Omit<LoanApplication, "id" | "status" | "createdAt" | "updatedAt" | "reviews">) => void;
    updateApplicationStatus: (id: string, status: ApplicationStatus, review?: ReviewAction) => void;
    fetchApplications: () => void;
}

export const useApplicationStore = create<ApplicationStore>((set, get) => ({
    applications: [],
    isLoading: true,
    fetchApplications: () => {
        if (typeof window === "undefined") return;
        const saved = localStorage.getItem("creditgenie_apps");
        if (saved) {
            set({ applications: JSON.parse(saved), isLoading: false });
        } else {
            set({ isLoading: false });
        }
    },
    addApplication: (appData) => {
        const newApp: LoanApplication = {
            ...appData,
            id: Math.random().toString(36).substring(2, 9),
            status: "PENDING_TEAM_LEAD",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            reviews: [],
        };
        const updatedApps = [newApp, ...get().applications];
        set({ applications: updatedApps });
        localStorage.setItem("creditgenie_apps", JSON.stringify(updatedApps));
    },
    updateApplicationStatus: (id, status, review) => {
        const updatedApps = get().applications.map((app) => {
            if (app.id === id) {
                const reviews = review ? [...app.reviews, review] : app.reviews;
                return { ...app, status, reviews };
            }
            return app;
        });
        set({ applications: updatedApps });
        localStorage.setItem("creditgenie_apps", JSON.stringify(updatedApps));
    },
}));

// Helper hook for easy usage
export function useApplications() {
    const store = useApplicationStore();

    React.useEffect(() => {
        store.fetchApplications();
    }, []);

    return store;
}
