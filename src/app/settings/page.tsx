"use client";

import React from "react";
import { Settings, Sliders, Bell, Shield, User, Globe } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function SettingsPage() {
    const sections = [
        { title: "Profile", icon: User, desc: "Manage your account details and preferences." },
        { title: "Security", icon: Shield, desc: "Setup 2FA and manage your secure login methods." },
        { title: "Notifications", icon: Bell, desc: "Control how and when you receive application updates." },
        { title: "Integration", icon: Globe, desc: "Connect Creditgenie to external credit scoring APIs." },
    ];

    return (
        <div className="flex-1 p-12 bg-[#f6f9fc]">
            <div className="max-w-4xl mx-auto w-full space-y-8">
                <div>
                    <h1 className="text-3xl font-light text-navy-deep mb-2">Settings</h1>
                    <p className="text-slate-body">Configure the Creditgenie platform and your personal workspace.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sections.map((s) => (
                        <Card key={s.title} className="p-6 hover:border-brand-purple transition-all cursor-pointer group border-none stripe-shadow bg-white">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center group-hover:bg-brand-purple transition-colors">
                                    <s.icon className="w-5 h-5 text-brand-purple group-hover:text-white" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-navy-deep mb-1">{s.title}</h3>
                                    <p className="text-xs text-slate-body leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
