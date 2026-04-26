"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            if (Notification.permission === 'default') {
                const timer = setTimeout(() => setShowNotificationPrompt(true), 2000);
                return () => clearTimeout(timer);
            }
        }
    }, []);

    const requestPermission = () => {
        Notification.requestPermission().then(() => {
            setShowNotificationPrompt(false);
        });
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 lg:pl-64 flex flex-col relative">
                {showNotificationPrompt && (
                    <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-top-4 duration-500">
                        <div className="bg-navy-deep text-white p-6 rounded-2xl stripe-shadow flex items-center gap-6 max-w-sm border border-white/10">
                            <div className="w-12 h-12 bg-brand-purple rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <Bell className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold mb-1">Enable Notifications</p>
                                <p className="text-xs text-white/60">Get instant alerts for approval requests and status changes.</p>
                                <div className="flex gap-3 mt-4">
                                    <Button size="sm" className="bg-white text-navy-deep hover:bg-slate-50 h-8 text-[10px]" onClick={requestPermission}>Enable Now</Button>
                                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 h-8 text-[10px]" onClick={() => setShowNotificationPrompt(false)}>Later</Button>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowNotificationPrompt(false)}
                                className="absolute top-4 right-4 text-white/30 hover:text-white"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
