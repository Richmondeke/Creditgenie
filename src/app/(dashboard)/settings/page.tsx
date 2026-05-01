"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Shield, Bell, LogOut, ChevronRight, Mail, Key, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useApplicationStore } from "@/lib/store";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const router = useRouter();
    const { currentUser, logout } = useApplicationStore();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "security", label: "Security", icon: Shield },
        { id: "notifications", label: "Alerts", icon: Bell },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <header className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-[4px] bg-white border border-slate-border flex items-center justify-center text-slate-400 shadow-stripe-ambient">
                        <User className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-normal text-slate-400 uppercase tracking-[0.2em]">Settings</span>
                </div>
                <h1 className="text-5xl font-light text-navy-deep tracking-tight-large">Account</h1>
                <p className="text-slate-body text-lg font-light leading-relaxed max-w-xl">
                    Manage your profile and security.
                </p>
            </header>

            <div className="flex flex-col lg:flex-row gap-12">
                <aside className="w-full lg:w-72 space-y-3">
                    <div className="p-2 bg-slate-50/50 rounded-[5px] border border-slate-border shadow-stripe">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-4 px-6 py-4 rounded-[4px] text-sm font-normal transition-all group",
                                    activeTab === tab.id
                                        ? "bg-white text-brand-purple shadow-stripe-ambient border border-slate-border/50"
                                        : "text-slate-400 hover:bg-white hover:text-navy-deep transition-all"
                                )}
                            >
                                <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-brand-purple" : "text-slate-300 group-hover:text-slate-400")} />
                                {tab.label}
                                {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto opacity-40" />}
                            </button>
                        ))}
                    </div>
                    
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-8 py-5 rounded-[4px] text-sm font-normal text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100 mt-6"
                    >
                        <LogOut className="w-5 h-5" />
                        Log out
                    </button>
                </aside>

                <section className="flex-1">
                    {activeTab === "profile" && (
                        <Card className="p-12 bg-white space-y-12 shadow-stripe border-slate-border rounded-[5px]">
                            <div className="flex flex-col md:flex-row items-center gap-8 pb-12 border-b border-slate-border">
                                <div className="w-24 h-24 rounded-[4px] bg-white border border-slate-border flex items-center justify-center text-3xl font-light text-brand-purple shadow-stripe-ambient">
                                    {currentUser?.name?.split(" ").map(n => n[0]).join("") || "?"}
                                </div>
                                <div className="text-center md:text-left space-y-1">
                                    <h3 className="text-2xl font-normal text-navy-deep tracking-tight">{currentUser?.name || "Unknown User"}</h3>
                                    <div className="flex items-center gap-3 justify-center md:justify-start">
                                        <Badge variant="info" className="h-6 font-normal tracking-widest text-[10px] uppercase">
                                            {currentUser?.role || "USER"}
                                        </Badge>
                                        <span className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">Active</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-normal text-slate-label uppercase tracking-[0.2em]">Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                            <Input defaultValue={currentUser?.name || ""} readOnly className="pl-12 h-14 bg-white border border-slate-border rounded-[4px] cursor-not-allowed opacity-60 font-normal shadow-stripe-ambient" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-normal text-slate-label uppercase tracking-[0.2em]">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                            <Input defaultValue={currentUser?.email || ""} readOnly className="pl-12 h-14 bg-white border border-slate-border rounded-[4px] cursor-not-allowed opacity-60 font-normal shadow-stripe-ambient" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-normal text-slate-label uppercase tracking-[0.2em]">Role</label>
                                        <Input defaultValue={currentUser?.role?.replace(/_/g, " ") || ""} readOnly className="h-14 bg-white border border-slate-border rounded-[4px] cursor-not-allowed opacity-60 font-normal px-6 shadow-stripe-ambient" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-normal text-slate-label uppercase tracking-[0.2em]">ID</label>
                                        <Input defaultValue={currentUser?.id || ""} readOnly className="h-14 bg-white border border-slate-border rounded-[4px] cursor-not-allowed opacity-60 font-mono text-xs px-6 shadow-stripe-ambient" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6 bg-slate-50 rounded-[4px] border border-slate-border flex items-center gap-4">
                                <Shield className="w-5 h-5 text-brand-purple opacity-40" />
                                <p className="text-xs font-light text-slate-body">
                                    Your details are managed by <span className="text-brand-purple font-normal">Lydraflow</span>.
                                </p>
                            </div>
                        </Card>
                    )}

                    {activeTab === "security" && (
                        <Card className="p-12 bg-white space-y-10 shadow-stripe border-slate-border rounded-[5px]">
                            <div className="space-y-8">
                                <div className="flex items-center justify-between p-8 rounded-[4px] bg-slate-50/20 border border-slate-border group shadow-stripe-ambient">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-[4px] bg-white flex items-center justify-center text-slate-300 group-hover:text-brand-purple transition-all border border-slate-border shadow-stripe-ambient">
                                            <Fingerprint className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-base font-normal text-navy-deep tracking-tight">2FA</p>
                                            <p className="text-sm text-slate-400 font-light mt-1 leading-relaxed">Extra security for your account.</p>
                                        </div>
                                    </div>
                                    <Badge variant="neutral" className="h-7 px-4 font-normal tracking-widest text-[10px] uppercase">Active</Badge>
                                </div>

                                <div className="flex items-center justify-between p-8 rounded-[4px] bg-slate-50/20 border border-slate-border group shadow-stripe-ambient">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-[4px] bg-white flex items-center justify-center text-slate-300 group-hover:text-brand-purple transition-all border border-slate-border shadow-stripe-ambient">
                                            <Key className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-base font-normal text-navy-deep tracking-tight">Account</p>
                                            <p className="text-sm text-slate-400 font-light mt-1 leading-relaxed">You are signed in via SSO.</p>
                                        </div>
                                    </div>
                                    <Badge variant="success" className="h-7 px-4 font-normal tracking-widest text-[10px] uppercase">Google</Badge>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-center gap-3 h-16 rounded-[4px] bg-navy-deep text-white font-normal hover:bg-navy-dark transition-all shadow-stripe active:scale-[0.98]">
                                <LogOut className="w-5 h-5 opacity-40" />
                                Sign out of all devices
                            </button>
                        </Card>
                    )}

                    {activeTab === "notifications" && (
                        <Card className="p-12 bg-white space-y-10 shadow-stripe border-slate-border rounded-[5px]">
                            <p className="text-[11px] font-normal text-slate-label uppercase tracking-[0.2em] px-2">Alerts</p>
                            <div className="space-y-4">
                                {[
                                    { label: "Status updates", desc: "Get notified when status changes." },
                                    { label: "Review alerts", desc: "Get notified when you need to review." },
                                    { label: "Security alerts", desc: "Get notified of security issues." },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-8 rounded-[4px] bg-slate-50/20 border border-slate-border group hover:bg-white hover:shadow-stripe-ambient transition-all">
                                        <div className="max-w-md">
                                            <p className="text-base font-normal text-navy-deep tracking-tight">{item.label}</p>
                                            <p className="text-sm text-slate-400 font-light mt-1 leading-relaxed opacity-70">{item.desc}</p>
                                        </div>
                                        <div className="w-12 h-7 rounded-full bg-brand-purple p-1 relative flex items-center cursor-pointer transition-all hover:bg-brand-purple-hover">
                                            <div className="w-5 h-5 bg-white rounded-full shadow-stripe-ambient ml-auto" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </section>
            </div>
        </div>
    );
}
