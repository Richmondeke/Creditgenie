"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useApplicationStore } from "@/lib/store";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { currentUser, authLoading } = useApplicationStore();
    const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);

    // Wait for Firebase auth to resolve before deciding to redirect
    useEffect(() => {
        if (!authLoading && currentUser === null) {
            router.push("/login");
        }
    }, [currentUser, authLoading, router]);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            if (Notification.permission === 'default') {
                const timer = setTimeout(() => setShowNotificationPrompt(true), 3000);
                return () => clearTimeout(timer);
            }
        }
    }, []);

    const requestPermission = () => {
        Notification.requestPermission().then(() => {
            setShowNotificationPrompt(false);
        });
    };

    // Show loading spinner while Firebase resolves auth state
    if (authLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f6f9fc]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 lg:pl-64 flex flex-col relative bg-[#f6f9fc]">
                {showNotificationPrompt && (
                    <div className="fixed top-8 right-8 z-[60] animate-in slide-in-from-top-6 duration-700">
                        <div className="bg-navy-deep text-white p-8 rounded-[5px] shadow-stripe-elevated flex items-center gap-8 max-w-md border-none relative overflow-hidden group">
                            <div className="w-14 h-14 bg-brand-purple rounded-[4px] flex items-center justify-center flex-shrink-0 shadow-stripe-ambient relative z-10">
                                <Bell className="w-7 h-7 text-white" />
                            </div>
                            
                            <div className="flex-1 relative z-10">
                                <p className="text-base font-normal mb-1 tracking-tight">Notifications</p>
                                <p className="text-sm text-white/70 leading-relaxed font-light">Get notified when your application status changes.</p>
                                <div className="flex gap-4 mt-6">
                                    <button 
                                        className="bg-brand-purple text-white hover:bg-brand-purple-hover h-9 px-5 text-xs font-normal rounded-[4px] shadow-stripe-ambient transition-all" 
                                        onClick={requestPermission}
                                    >
                                        Enable
                                    </button>
                                    <button 
                                        className="text-white/50 hover:text-white text-xs font-normal transition-colors"
                                        onClick={() => setShowNotificationPrompt(false)}
                                    >
                                        Later
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowNotificationPrompt(false)}
                                className="absolute top-5 right-5 text-white/20 hover:text-white transition-colors p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
                <main className="flex-1 overflow-y-auto p-6 md:p-12">
                    {children}
                </main>
            </div>
        </div>
    );
}
