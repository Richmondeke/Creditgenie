"use client";

import React from "react";
import { Clock, CheckCircle2, AlertCircle, RefreshCw, XCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function ActivityPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-3xl font-light text-navy-deep">System Activity</h1>
                <p className="text-slate-body mt-2">A real-time audit log of all actions occurring across the platform.</p>
            </header>

            <Card className="stripe-shadow border-none overflow-hidden bg-white">
                <div className="divide-y divide-slate-50">
                    {[
                        { user: "Sarah Alabi", action: "approved Tier 2", detail: "Nexus Innovations Ltd", time: "2m ago", icon: CheckCircle2, color: "text-success-green" },
                        { user: "System", action: "CAC Verification", detail: "RC-12345 Verified", time: "15m ago", icon: RefreshCw, color: "text-brand-purple" },
                        { user: "Tunde Ednut", action: "submitted new application", detail: "Yaba Retail Ventures", time: "1h ago", icon: Clock, color: "text-slate-400" },
                        { user: "John Doe", action: "requested changes", detail: "Tier 1: Document Upload", time: "3h ago", icon: AlertCircle, color: "text-warning-lemon" },
                        { user: "Legal Counsel", action: "rejected final approval", detail: "RC-92812 Compliance issue", time: "5h ago", icon: XCircle, color: "text-red-500" },
                    ].map((act, i) => (
                        <div key={i} className="p-6 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                            <div className={cn("w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0", act.color)}>
                                <act.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-sm font-semibold text-navy-deep">{act.user}</p>
                                    <span className="text-xs text-slate-400 whitespace-nowrap">{act.time}</span>
                                </div>
                                <p className="text-sm text-slate-body mt-1">
                                    <span className="font-medium text-navy-deep">{act.action}</span> for {act.detail}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

