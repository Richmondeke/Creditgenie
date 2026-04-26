"use client";

import React, { useState } from "react";
import { User, Shield, Bell, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    const tabs = [
        { id: "profile", label: "General", icon: User },
        { id: "security", label: "Security", icon: Shield },
        { id: "notifications", label: "Notifications", icon: Bell },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-3xl font-light text-navy-deep">Account Settings</h1>
                <p className="text-slate-body mt-2">Manage your personal information and security preferences.</p>
            </header>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-64 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                                activeTab === tab.id
                                    ? "bg-white text-brand-purple shadow-sm ring-1 ring-slate-100"
                                    : "text-slate-body hover:bg-slate-50"
                            )}
                        >
                            <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-brand-purple" : "text-slate-400 group-hover:text-slate-600")} />
                            {tab.label}
                            {activeTab === tab.id && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
                        </button>
                    ))}
                    <div className="pt-4 mt-4 border-t border-slate-100">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </aside>

                <section className="flex-1 space-y-6">
                    {activeTab === "profile" && (
                        <Card className="stripe-shadow border-none p-8 space-y-8 bg-white">
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-slate-label uppercase tracking-widest">Personal Details</p>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-navy-deep">Full Name</label>
                                        <Input defaultValue="Admin User" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-navy-deep">Email Address</label>
                                        <Input defaultValue="admin@lydra.guava.earth" readOnly className="bg-slate-50 cursor-not-allowed opacity-60" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 flex items-center justify-between pt-8 border-t border-slate-50">
                                <div>
                                    <p className="text-sm font-semibold text-navy-deep">Avatar Image</p>
                                    <p className="text-xs text-slate-body mt-1">This will be displayed on your profile.</p>
                                </div>
                                <Button variant="outline" size="sm">Update Photo</Button>
                            </div>
                            <div className="pt-8 flex justify-end">
                                <Button className="h-11 px-8 shadow-lg shadow-brand-purple/10">Save Changes</Button>
                            </div>
                        </Card>
                    )}

                    {activeTab === "security" && (
                        <Card className="stripe-shadow border-none p-8 space-y-8 bg-white">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-navy-deep">Two-Factor Authentication</p>
                                        <p className="text-xs text-slate-body mt-1">Add an extra layer of security to your account.</p>
                                    </div>
                                    <Badge variant="neutral">Disabled</Badge>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <div>
                                        <p className="text-sm font-semibold text-navy-deep">Change Password</p>
                                        <p className="text-xs text-slate-body mt-1">Update your login credentials.</p>
                                    </div>
                                    <Button variant="outline" size="sm">Update</Button>
                                </div>
                            </div>
                        </Card>
                    )}
                </section>
            </div>
        </div>
    );
}

