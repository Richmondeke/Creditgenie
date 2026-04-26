"use client";

import React, { useState, useCallback } from "react";
import { ArrowLeft, Building2, Calendar, DollarSign, FileText, ShieldCheck, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ApplicationDetails() {
    const [status, setStatus] = useState("PENDING_LEAD");
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = useCallback(async (nextStatus: string) => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1000));
        setStatus(nextStatus);
        setIsLoading(false);
    }, []);

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
            <Link href="/applications/all" className="flex items-center gap-2 text-sm text-slate-body hover:text-navy-deep transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to List
            </Link>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-2">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-4xl font-light text-navy-deep tracking-tight">Nexus Innovations Ltd</h1>
                        <Badge variant={status === "APPROVED" ? "success" : status === "REJECTED" ? "error" : "info"}>
                            {status.replace("_", " ")}
                        </Badge>
                    </div>
                    <p className="text-slate-body flex items-center gap-2">
                        <Building2 className="w-4 h-4 opacity-40" />
                        RC-123456 • Lagos, Nigeria
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white border-slate-200">
                        <MessageSquare className="w-4 h-4 mr-2 opacity-50" />
                        Comment
                    </Button>
                    <Button variant="outline" className="bg-white border-slate-200">Export PDF</Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="stripe-shadow border-none p-8 bg-white grid grid-cols-2 gap-12">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-label uppercase tracking-widest mb-4">Request Details</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-brand-purple/5 flex items-center justify-center text-brand-purple">
                                    <DollarSign className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xl font-semibold text-navy-deep">NGN 2,500,000</p>
                                    <p className="text-xs text-slate-400">Total Requested</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-label uppercase tracking-widest mb-4">Term & Rate</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-navy-deep">View &quot;Incorporation Certificate.pdf&quot;</p>
                                    <p className="text-xs text-slate-400">@ 4.5% Monthly</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="stripe-shadow border-none p-8 bg-white space-y-6">
                        <h3 className="text-lg font-semibold text-navy-deep flex items-center gap-2">
                            <FileText className="w-5 h-5 text-brand-purple" />
                            Application Summary
                        </h3>
                        <p className="text-sm text-slate-body leading-relaxed">
                            Nexus Innovations is seeking expansion capital to procure additional hardware for their Gbagada operational hub. Their cash flow history indicates strong consistency with an average monthly turnover of NGN 8.2M. All CAC documents have been verified and directors have no pending litigation.
                        </p>
                        <div className="pt-4 grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-label uppercase tracking-widest mb-1">Director Credit Score</p>
                                <p className="text-lg font-semibold text-navy-deep">742 / 850</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-label uppercase tracking-widest mb-1">Industry Risk Level</p>
                                <Badge variant="success">LOW RISK</Badge>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="stripe-shadow border-none p-6 bg-white space-y-6">
                        <h3 className="text-sm font-bold text-navy-deep uppercase tracking-widest border-b border-slate-50 pb-4">Approval Flow</h3>
                        <div className="space-y-8 relative">
                            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-100" />
                            {[
                                { label: "Team Lead Review", stage: "PENDING_LEAD", icon: CheckCircle2, status: status === "PENDING_LEAD" ? "active" : "done" },
                                { label: "Credit Assessment", stage: "PENDING_CREDIT", icon: ShieldCheck, status: status === "PENDING_CREDIT" ? "pending" : (status === "PENDING_LEAD" ? "upcoming" : "done") },
                                { label: "Legal Verification", stage: "PENDING_LEGAL", icon: FileText, status: status === "PENDING_LEGAL" ? "pending" : (status === "APPROVED" ? "done" : "upcoming") },
                                { label: "Final Approval", stage: "APPROVED", icon: CheckCircle2, status: status === "APPROVED" ? "done" : "upcoming" },
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-4 relative z-10">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shadow-sm",
                                        step.status === "done" ? "bg-success-green text-white" :
                                            step.status === "active" ? "bg-brand-purple text-white animate-pulse" : "bg-white border border-slate-200 text-slate-300"
                                    )}>
                                        <step.icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className={cn("text-sm font-semibold", step.status === "upcoming" ? "text-slate-300" : "text-navy-deep")}>{step.label}</p>
                                        {step.status === "active" && <p className="text-[10px] text-brand-purple font-bold tracking-widest mt-0.5 uppercase">Current Step</p>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {status !== "APPROVED" && status !== "REJECTED" && (
                            <div className="pt-6 space-y-3">
                                <Button
                                    className="w-full h-11 shadow-lg bg-success-green hover:bg-success-green/90"
                                    onClick={() => handleAction(
                                        status === "PENDING_LEAD" ? "PENDING_CREDIT" :
                                            status === "PENDING_CREDIT" ? "PENDING_LEGAL" : "APPROVED"
                                    )}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Processing..." : "Approve & Proceed"}
                                </Button>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" className="h-10 text-xs border-slate-200 text-slate-600" onClick={() => handleAction("NEEDS_CHANGES")}>Request Changes</Button>
                                    <Button variant="ghost" className="h-10 text-xs text-red-500 hover:bg-red-50" onClick={() => handleAction("REJECTED")}>Reject App</Button>
                                </div>
                            </div>
                        )}
                    </Card>

                    <Card className="stripe-shadow border-none p-6 bg-slate-50">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-4 h-4 text-warning-lemon" />
                            <p className="text-xs font-bold text-navy-deep uppercase tracking-widest">Internal Memo</p>
                        </div>
                        <p className="text-xs text-slate-body italic font-medium leading-relaxed">
                            &quot;Borrower has been with the platform for 18 months through an external partner. No defaults recorded. Strong candidate for Tier 1.&quot;
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
