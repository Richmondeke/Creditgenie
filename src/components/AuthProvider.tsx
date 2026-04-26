"use client";

import React, { useEffect } from "react";
import { useApplicationStore } from "@/lib/store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { initAuth, fetchApplications } = useApplicationStore();

    useEffect(() => {
        initAuth();
        fetchApplications();
    }, [initAuth, fetchApplications]);

    return <>{children}</>;
}
