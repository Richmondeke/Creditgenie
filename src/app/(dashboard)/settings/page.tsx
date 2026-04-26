"use client";

import React, { useState } from "react";
import { User, Bell, Shield, Wallet, ChevronRight, Save, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

type Tab = "profile" | "notifications" | "security" | "billing";

export default function Settings() {
    const [activeTab, setActiveTab] = useState<Tab>("profile");

    const tabs = [
        { id: "profile", label: "Account Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Shield },
        { id: "billing", label: "Billing & Plans", icon: Wallet },
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto w-full">
            <header className="mb-10">
                <h1 className="text-3xl font-light text-navy-deep">Settings</h1>
                <p className="text-slate-body mt-2">Manage your account preferences and platform configuration.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
                {/* Navigation */}
                <aside className="space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as Tab)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-stripe transition-all",
                                activeTab === tab.id
                                    ? "bg-brand-purple/5 text-brand-purple shadow-sm ring-1 ring-brand-purple/10"
                                    : "text-slate-body hover:bg-slate-100 hover:text-navy-deep"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                            {activeTab === tab.id && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
                        </button>
                    ))}
                    <div className="pt-8 mt-8 border-t border-slate-border">
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-stripe transition-all">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Content */}
                <main className="space-y-6">
                    {activeTab === "profile" && (
                        <Card className="stripe-shadow border-none animate-in fade-in slide-in-from-bottom-2 duration-400">
                            <CardHeader className="border-b border-slate-border pb-6">
                                <CardTitle className="text-xl font-light">Account Profile</CardTitle>
                                <p className="text-slate-body text-sm mt-1">This information is visible to the credit and legal teams.</p>
                            </CardHeader>
                            <CardContent className="space-y-6 py-8">
                                <div className="flex items-center gap-6 pb-6 border-b border-slate-border border-dashed">
                                    <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-slate-border flex items-center justify-center text-2xl font-light text-slate-body">
                                        JD
                                    </div>
                                    <div className="space-y-2">
                                        <Button variant="outline" size="sm">Change Avatar</Button>
                                        <p className="text-[10px] text-slate-body uppercase tracking-[0.1em]">Recommended: 400x400px</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-label uppercase tracking-wider">Full Name</label>
                                        <Input defaultValue="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-label uppercase tracking-wider">Internal Role</label>
                                        <Input defaultValue="Team Lead (Credit)" disabled />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-label uppercase tracking-wider">Email Address</label>
                                    <Input defaultValue="john.doe@creditgenie.ng" />
                                </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50 border-t border-slate-border flex justify-end py-4 rounded-b-stripe">
                                <Button size="sm">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                    {activeTab === "notifications" && (
                        <Card className="stripe-shadow border-none animate-in fade-in slide-in-from-bottom-2 duration-400">
                            <CardHeader className="border-b border-slate-border pb-6">
                                <CardTitle className="text-xl font-light">Notifications</CardTitle>
                                <p className="text-slate-body text-sm mt-1">Control how you receive status updates and approval requests.</p>
                            </CardHeader>
                            <CardContent className="space-y-6 py-8">
                                {[
                                    { title: "New Application Requests", desc: "Get notified when a new loan application is submitted." },
                                    { title: "Approval Status Changes", desc: "Receive alerts when an application you reviewed moves to the next stage." },
                                    { title: "Weekly Performance Report", desc: "A summary of team approvals and rejection metrics." },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-navy-deep">{item.title}</p>
                                            <p className="text-xs text-slate-body">{item.desc}</p>
                                        </div>
                                        <div className="w-10 h-6 bg-brand-purple rounded-full relative p-1 cursor-pointer shadow-inner">
                                            <div className="absolute right-1 top-1 bottom-1 w-4 bg-white rounded-full shadow-sm" />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "security" && (
                        <Card className="stripe-shadow border-none animate-in fade-in slide-in-from-bottom-2 duration-400">
                            <CardHeader className="border-b border-slate-border pb-6">
                                <CardTitle className="text-xl font-light">Security Settings</CardTitle>
                                <p className="text-slate-body text-sm mt-1">Protect your account with modern security standards.</p>
                            </CardHeader>
                            <CardContent className="space-y-8 py-8">
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-bold text-slate-body uppercase tracking-[0.2em]">Change Password</h4>
                                    <div className="space-y-4 max-w-sm">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-label uppercase tracking-wider">Current Password</label>
                                            <Input type="password" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-label uppercase tracking-wider">New Password</label>
                                            <Input type="password" />
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-8 border-t border-slate-border">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-navy-deep">Two-Factor Authentication</p>
                                            <p className="text-xs text-slate-body">Add an extra layer of security to your login.</p>
                                        </div>
                                        <Button variant="outline" size="sm">Enable 2FA</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "billing" && (
                        <Card className="stripe-shadow border-none animate-in fade-in slide-in-from-bottom-2 duration-400 overflow-hidden">
                            <div className="p-8 bg-brand-purple text-white relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                                <h3 className="text-xl font-light mb-1 relative z-10">Professional Plan</h3>
                                <p className="text-white/70 text-sm relative z-10">Up to 500 applications per month</p>
                                <div className="mt-6 flex items-baseline gap-1 relative z-10">
                                    <span className="text-3xl font-semibold">$199</span>
                                    <span className="text-sm text-white/50">/ month</span>
                                </div>
                            </div>
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-bold text-slate-body uppercase tracking-[0.2em]">Payment Method</h4>
                                    <div className="flex items-center gap-4 p-4 border border-slate-border rounded-stripe bg-slate-50">
                                        <div className="w-12 h-8 bg-navy-deep rounded flex items-center justify-center text-[8px] font-bold text-white tracking-widest">VISA</div>
                                        <div>
                                            <p className="text-sm font-medium text-navy-deep">Visa Ending in 4242</p>
                                            <p className="text-[10px] text-slate-body uppercase tracking-wider">Expires 12/28</p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="ml-auto text-brand-purple">Edit</Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50 border-t border-slate-border flex justify-between py-4 px-8 items-center">
                                <p className="text-xs text-slate-body italic">Next billing cycle: May 26, 2026</p>
                                <Button variant="outline" size="sm">Manage Invoices</Button>
                            </CardFooter>
                        </Card>
                    )}
                </main>
            </div>
        </div>
    );
}
