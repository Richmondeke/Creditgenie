"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    CheckCircle2,
    ShieldCheck,
    Scale,
    FileCheck,
    FileText,
    Check,
    AlertCircle,
    Building2,
    MapPin,
    Users
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useApplications } from "@/lib/store";
import { ApplicationStatus } from "@/lib/types";

export default function ApplicationDetails() {
    const params = useParams();
    const router = useRouter();
    const { applications, updateApplicationStatus, isLoading } = useApplications();
    const appId = params.id as string;
    const application = applications.find(a => a.id === appId);

    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

    if (isLoading) return null;
    if (!application) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <AlertCircle className="w-12 h-12 text-slate-border mb-4" />
                <h2 className="text-xl font-medium text-navy-deep">Application Not Found</h2>
                <p className="text-slate-body mb-6 text-center">The loan application you are looking for does not exist.</p>
                <Button onClick={() => router.push("/")}>Dashboard</Button>
            </div>
        );
    }

    const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleAction = (tier: "TEAM_LEAD" | "CREDIT" | "LEGAL", action: "APPROVE" | "REJECT" | "CHANGES") => {
        let nextStatus: ApplicationStatus = application.status;
        let comment = "";

        if (action === "APPROVE") {
            if (tier === "TEAM_LEAD") nextStatus = "PENDING_CREDIT";
            else if (tier === "CREDIT") nextStatus = "PENDING_LEGAL";
            else if (tier === "LEGAL") nextStatus = "APPROVED";
            comment = `The ${tier.replace('_', ' ').toLowerCase()} has verified all documentation and approved this stage.`;
            showNotification(`${tier} Approved successfully`, 'success');
        } else if (action === "REJECT") {
            nextStatus = "REJECTED";
            comment = `The ${tier.replace('_', ' ').toLowerCase()} has rejected this application due to compliance/risk concerns.`;
            showNotification(`${tier} Rejected the application`, 'error');
        } else if (action === "CHANGES") {
            nextStatus = "NEEDS_CHANGES";
            comment = `The ${tier.replace('_', ' ').toLowerCase()} has requested further clarification or additional documents.`;
            showNotification(`Changes requested by ${tier}`, 'info');
        }

        updateApplicationStatus(appId, nextStatus, {
            role: tier,
            approved: action === "APPROVE",
            date: new Date().toISOString(),
            comment,
        });
    };

    const getStatusStep = () => {
        switch (application.status) {
            case "PENDING_TEAM_LEAD": return 1;
            case "PENDING_CREDIT": return 2;
            case "PENDING_LEGAL": return 3;
            case "APPROVED": return 4;
            default: return 0;
        }
    };

    const steps = [
        { label: "Submission", role: "STAFF", icon: FileText },
        { label: "Team Lead", role: "TEAM_LEAD", icon: ShieldCheck },
        { label: "Credit/Risk", role: "CREDIT", icon: FileCheck },
        { label: "Legal", role: "LEGAL", icon: Scale },
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto w-full">
            <Button
                variant="ghost"
                onClick={() => router.push("/")}
                className="mb-8 -ml-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Header Card */}
                    <Card className="stripe-shadow border-none overflow-hidden bg-white">
                        <div className="p-8 border-b border-slate-border">
                            <div className="flex justify-between items-start mb-8">
                                <div className="space-y-1">
                                    <h1 className="text-3xl font-light text-navy-deep">{application.applicantName}</h1>
                                    <div className="flex items-center gap-2 text-xs font-mono text-slate-body">
                                        <Building2 className="w-3 h-3" />
                                        {application.rcNumber || "No RC Number"}
                                    </div>
                                </div>
                                <Badge variant={application.status === "APPROVED" ? "success" : "info"}>
                                    {application.status.replace(/_/g, " ")}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-body uppercase tracking-[0.15em] mb-2">Loan Amount</p>
                                    <p className="text-2xl font-semibold text-brand-purple tabular-nums">${application.amount.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-body uppercase tracking-[0.15em] mb-2">Requested On</p>
                                    <p className="text-lg text-navy-deep">{new Date(application.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-body uppercase tracking-[0.15em] mb-2">Internal Ref</p>
                                    <p className="text-lg text-navy-deep font-mono">#{application.id.toUpperCase()}</p>
                                </div>
                            </div>
                        </div>

                        {application.companyAddress && (
                            <div className="px-8 py-4 border-b border-slate-border flex items-center gap-2 text-sm text-slate-body">
                                <MapPin className="w-4 h-4" />
                                {application.companyAddress}
                            </div>
                        )}

                        <div className="p-8">
                            <h3 className="text-[10px] font-bold text-slate-body uppercase tracking-[0.15em] mb-4">Loan Purpose</h3>
                            <p className="text-slate-body leading-relaxed text-sm bg-slate-50 p-4 rounded-stripe border border-slate-border">
                                {application.purpose}
                            </p>
                        </div>
                    </Card>

                    {/* Directors Card */}
                    {application.directors && application.directors.length > 0 && (
                        <Card className="stripe-shadow border-none p-8 bg-white">
                            <h3 className="text-[10px] font-bold text-slate-body uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                                <Users className="w-3 h-3" /> Registered Directors
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {application.directors.map((d, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 border border-slate-border rounded-xl bg-slate-50/30">
                                        <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple font-bold">
                                            {d.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-navy-deep">{d.name}</p>
                                            <p className="text-[10px] text-slate-body uppercase tracking-wider">{d.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* Audit Log */}
                    <Card className="stripe-shadow border-none p-8 bg-white">
                        <h3 className="text-lg font-medium text-navy-deep mb-8 font-light">Approval Audit Trail</h3>
                        <div className="space-y-8 relative before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-border">
                            {application.reviews.length === 0 ? (
                                <div className="flex gap-4 items-center">
                                    <div className="w-4 h-4 rounded-full border-2 border-slate-border bg-white z-10" />
                                    <p className="text-slate-body text-sm italic">New submission. No reviews recorded yet.</p>
                                </div>
                            ) : (
                                application.reviews.map((review, i) => (
                                    <div key={i} className="flex gap-6 relative">
                                        <div className="w-5 h-5 rounded-full bg-success-green flex items-center justify-center flex-shrink-0 z-10 shadow-sm border-2 border-white">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <div>
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-sm font-bold text-navy-deep">{review.role.replace(/_/g, ' ')} Approval</span>
                                                <span className="text-[10px] text-slate-body">{new Date(review.date).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-sm text-slate-body italic">"{review.comment}"</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="stripe-shadow border-none p-6 bg-white">
                        <h3 className="text-[10px] font-bold text-slate-body uppercase tracking-[0.2em] mb-8">Process Tracker</h3>
                        <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-border">
                            {steps.map((step, i) => {
                                const isActive = getStatusStep() === i;
                                const isCompleted = getStatusStep() > i;
                                return (
                                    <div key={i} className="relative flex items-start gap-4 z-10">
                                        <div className={cn(
                                            "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                                            isCompleted ? "bg-success-green text-white shadow-md scale-110" :
                                                isActive ? "bg-brand-purple text-white ring-4 ring-brand-purple/10" :
                                                    "bg-white border-2 border-slate-border text-slate-border"
                                        )}>
                                            {isCompleted ? <Check className="w-3 h-3" /> : <step.icon className="w-3 h-3" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className={cn(
                                                "text-xs font-bold uppercase tracking-wider",
                                                isActive || isCompleted ? 'text-navy-deep' : 'text-slate-border'
                                            )}>
                                                {step.label}
                                            </p>
                                            {isActive && (
                                                <div className="mt-4 space-y-2">
                                                    <Button size="sm" className="w-full text-xs" onClick={() => handleAction(step.role as any, "APPROVE")}>
                                                        Approve Decision
                                                    </Button>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Button variant="outline" size="sm" className="w-full text-[10px] py-1 h-auto" onClick={() => handleAction(step.role as any, "CHANGES")}>
                                                            Request Changes
                                                        </Button>
                                                        <Button variant="outline" size="sm" className="w-full text-[10px] py-1 h-auto text-red-500 border-red-100 hover:bg-red-50" onClick={() => handleAction(step.role as any, "REJECT")}>
                                                            Reject Loan
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
