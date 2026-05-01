"use client";

import React from "react";
import { useApplicationStore, useApplications } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { 
    Clock, 
    ArrowRight, 
    Building2, 
    DollarSign,
    Inbox,
    ShieldCheck,
    Gavel,
    Users
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReviewsPage() {
    useApplications();
    const { applications, currentUser, isLoading } = useApplicationStore();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const role = currentUser?.role;
    const reviewStatusMap: Record<string, string> = {
        "TEAM_LEAD": "PENDING_TEAM_LEAD",
        "CREDIT": "PENDING_CREDIT",
        "LEGAL": "PENDING_LEGAL"
    };

    const targetStatus = role ? reviewStatusMap[role] : null;
    
    const filteredApps = applications.filter(app => {
        if (targetStatus) return app.status === targetStatus;
        return !["DRAFT", "APPROVED", "REJECTED"].includes(app.status);
    });

    const roleIcons: Record<string, any> = {
        "TEAM_LEAD": Users,
        "CREDIT": ShieldCheck,
        "LEGAL": Gavel
    };
    const RoleIcon = role ? roleIcons[role] || ShieldCheck : ShieldCheck;

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-light text-navy-deep tracking-tight-large">Reviews</h1>
                    <p className="text-slate-body text-base max-w-lg leading-relaxed font-light">
                        Check and approve loan applications.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white p-1 rounded-[5px] border border-slate-border shadow-stripe-ambient">
                    <div className="px-4 py-2 bg-slate-50 rounded-[4px]">
                        <p className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">Total</p>
                        <p className="text-lg font-normal text-navy-deep">{filteredApps.length}</p>
                    </div>
                    <div className="px-4 py-2">
                        <p className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">Delay</p>
                        <p className="text-lg font-normal text-navy-deep">2.4h</p>
                    </div>
                </div>
            </header>

            {filteredApps.length === 0 ? (
                <Card className="p-20 flex flex-col items-center justify-center bg-white text-center rounded-[5px] shadow-stripe border-slate-border">
                    <div className="w-16 h-16 rounded-[4px] bg-white border border-slate-border flex items-center justify-center text-slate-200 mb-6 group hover:text-brand-purple shadow-stripe-ambient transition-colors">
                        <Inbox className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-normal text-navy-deep tracking-tight">All done</h3>
                    <p className="text-slate-400 mt-2 max-w-sm text-base leading-relaxed font-light">
                        You have no pending reviews.
                    </p>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {filteredApps.map((app) => (
                        <Link key={app.id} href={`/applications/${app.id}`}>
                            <Card className="p-0 bg-white hover:border-brand-purple/30 transition-all group overflow-hidden shadow-stripe border-slate-border rounded-[5px]">
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <div className="p-8 flex-1 flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-[4px] bg-white border border-slate-border flex items-center justify-center text-slate-300 group-hover:text-brand-purple shadow-stripe-ambient transition-all duration-300">
                                            <Building2 className="w-8 h-8" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-xl font-normal text-navy-deep truncate tracking-tight">{app.applicantName}</h3>
                                                <div className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-normal text-slate-500 uppercase tracking-widest">
                                                    {app.id.slice(0, 8)}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-5">
                                                <div className="flex items-center gap-1.5 text-slate-body">
                                                    <DollarSign className="w-4 h-4 opacity-40" />
                                                    <span className="text-sm font-normal">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(app.amount)}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-slate-body">
                                                    <Clock className="w-4 h-4 opacity-40" />
                                                    <span className="text-sm font-normal">{new Date(app.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 border-t md:border-t-0 md:border-l border-slate-border bg-slate-50/20 flex items-center justify-between md:justify-end gap-10 md:w-80">
                                        <div className="text-left md:text-right">
                                            <p className="text-[10px] font-normal text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                            <Badge variant="info" className="h-6 font-normal tracking-widest text-[10px] uppercase">
                                                {app.status.split('_').pop()}
                                            </Badge>
                                        </div>
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-slate-border text-slate-300 group-hover:text-brand-purple group-hover:translate-x-1 transition-all duration-300 shadow-stripe-ambient">
                                            <ArrowRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
            
            <footer className="pt-10 flex items-center justify-between text-slate-400">
                <p className="text-xs font-normal uppercase tracking-widest">System Active</p>
                <div className="flex items-center gap-4">
                    <Link href="/help" className="text-xs font-normal hover:text-navy-deep transition-colors uppercase tracking-widest">Guide</Link>
                    <Link href="/help" className="text-xs font-normal hover:text-navy-deep transition-colors uppercase tracking-widest">Security</Link>
                </div>
            </footer>
        </div>
    );
}
