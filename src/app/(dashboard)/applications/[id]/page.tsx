"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
    ArrowLeft, 
    Building2, 
    DollarSign, 
    FileText, 
    ShieldCheck, 
    CheckCircle2, 
    AlertCircle, 
    MessageSquare, 
    Clock, 
    Calendar,
    Briefcase,
    Gavel,
    Users,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useApplicationStore, useApplications } from "@/lib/store";
import { ApplicationStatus, ReviewAction } from "@/lib/types";

const STATUS_FLOW: ApplicationStatus[] = ["PENDING_TEAM_LEAD", "PENDING_CREDIT", "PENDING_LEGAL", "APPROVED"];

const STAGE_LABELS: Record<string, string> = {
    PENDING_TEAM_LEAD: "Team Lead Review",
    PENDING_CREDIT: "Credit Assessment",
    PENDING_LEGAL: "Legal Verification",
    APPROVED: "Final Approval",
};

const STAGE_ICONS: Record<string, any> = {
    PENDING_TEAM_LEAD: Users,
    PENDING_CREDIT: ShieldCheck,
    PENDING_LEGAL: Gavel,
    APPROVED: CheckCircle2,
};

function formatCurrency(n: number) {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);
}

function getStepState(step: ApplicationStatus, currentStatus: ApplicationStatus) {
    const currentIdx = STATUS_FLOW.indexOf(currentStatus);
    const stepIdx = STATUS_FLOW.indexOf(step);
    if (currentStatus === "APPROVED") return stepIdx <= STATUS_FLOW.length - 1 ? "done" : "upcoming";
    if (stepIdx < currentIdx) return "done";
    if (stepIdx === currentIdx) return "active";
    return "upcoming";
}

export default function ApplicationDetails() {
    useApplications();
    const params = useParams();
    const router = useRouter();
    const { applications, currentUser, updateApplicationStatus } = useApplicationStore();
    const [comment, setComment] = useState("");
    const [showComment, setShowComment] = useState(false);
    const [isActing, setIsActing] = useState(false);

    const id = params?.id as string;
    const app = applications.find(a => a.id === id);

    if (!app) {
        return (
            <div className="max-w-6xl mx-auto p-12 flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mb-6">
                    <Clock className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-semibold text-navy-deep">Application not found</h2>
                <p className="text-slate-body mt-2 max-w-sm">This application may have been removed or the ID is invalid.</p>
                <Link href="/applications/all" className="mt-8">
                    <Button variant="outline" className="h-12 px-8">Back to Pipeline</Button>
                </Link>
            </div>
        );
    }

    const isAdmin = currentUser?.role && currentUser.role !== "USER";
    const currentIdx = STATUS_FLOW.indexOf(app.status as ApplicationStatus);
    const nextStatus = currentIdx >= 0 && currentIdx < STATUS_FLOW.length - 1
        ? STATUS_FLOW[currentIdx + 1]
        : null;

    const handleAction = async (approved: boolean) => {
        if (!currentUser || !nextStatus) return;
        setIsActing(true);
        const review: ReviewAction = {
            role: currentUser.role as Exclude<typeof currentUser.role, "USER">,
            approved,
            comment: comment || undefined,
            date: new Date().toISOString(),
        };
        const newStatus: ApplicationStatus = approved
            ? (nextStatus ?? "APPROVED")
            : "NEEDS_CHANGES";
        await updateApplicationStatus(app.id, newStatus, review);
        setComment("");
        setShowComment(false);
        setIsActing(false);
    };

    const handleReject = async () => {
        if (!currentUser) return;
        setIsActing(true);
        const review: ReviewAction = {
            role: currentUser.role as Exclude<typeof currentUser.role, "USER">,
            approved: false,
            comment: comment || "Rejected",
            date: new Date().toISOString(),
        };
        await updateApplicationStatus(app.id, "REJECTED", review);
        setIsActing(false);
        router.push("/applications/all");
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Header Navigation */}
            <div className="flex items-center justify-between">
                <Link href="/applications/all" className="inline-flex items-center gap-2 text-xs font-bold text-slate-body hover:text-brand-purple transition-all uppercase tracking-[0.2em] group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Pipeline
                </Link>
                <div className="flex items-center gap-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Index: {app.id.slice(0, 12)}</p>
                </div>
            </div>

            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Badge variant={app.status === "APPROVED" ? "success" : app.status === "REJECTED" ? "error" : "info"} className="h-7 px-4 font-bold tracking-[0.1em]">
                            {app.status.replace(/_/g, " ")}
                        </Badge>
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">v2.1 Certified</span>
                    </div>
                    <h1 className="text-5xl font-light text-navy-deep tracking-tight">{app.applicantName}</h1>
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 text-slate-body font-medium">
                            <Building2 className="w-5 h-5 opacity-30" />
                            <span className="text-base">{app.rcNumber ? `RC-${app.rcNumber}` : "Private Entity"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-body font-medium">
                            <Calendar className="w-5 h-5 opacity-30" />
                            <span className="text-base">Submitted {new Date(app.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-4 w-full lg:w-auto">
                    <Button variant="outline" className="flex-1 lg:flex-none h-14 px-8 bg-white border border-slate-100 shadow-sm rounded-xl group" onClick={() => setShowComment(v => !v)}>
                        <MessageSquare className={cn("w-5 h-5 mr-3 transition-colors", showComment ? "text-brand-purple" : "text-slate-300 group-hover:text-brand-purple")} />
                        <span className="font-bold text-navy-deep">{showComment ? "Close Note" : "Add Note"}</span>
                    </Button>
                </div>
            </header>

            {showComment && (
                <Card className="p-10 bg-white rounded-2xl space-y-4 animate-in slide-in-from-top-4 duration-500 shadow-sm">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Contextual Note</label>
                    <textarea
                        className="w-full border border-slate-100 bg-slate-50/30 rounded-xl p-6 text-base text-navy-deep resize-none focus:outline-none focus:ring-4 focus:ring-brand-purple/5 transition-all font-medium"
                        rows={4}
                        placeholder="Provide reasoning for your review action..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    {/* Primary Financial Data */}
                    <Card className="p-10 bg-white rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-12 shadow-sm">
                        <div className="space-y-6">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Financial Obligation</p>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-xl bg-brand-purple/5 flex items-center justify-center text-brand-purple">
                                    <DollarSign className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-3xl font-light text-navy-deep tracking-tight">{formatCurrency(app.amount)}</p>
                                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Requested Liquidity</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Operational Context</p>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
                                    <Briefcase className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-navy-deep">{app.industry || "General Commerce"}</p>
                                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{app.tenure ? `${app.tenure} months tenure` : "TBD"}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Detailed Particulars */}
                    <Card className="p-10 bg-white rounded-2xl space-y-10 shadow-sm">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-navy-deep flex items-center gap-3 tracking-tight">
                                <FileText className="w-6 h-6 text-brand-purple opacity-40" />
                                Application Narrative
                            </h3>
                            <p className="text-base text-slate-body leading-relaxed font-medium">{app.purpose || "No narrative provided."}</p>
                        </div>

                        {app.directors && app.directors.length > 0 && (
                            <div className="pt-10 border-t border-slate-100">
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Governance & Ownership</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {app.directors.map((d, i) => (
                                        <div key={i} className="p-6 rounded-xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all group">
                                            <p className="text-base font-bold text-navy-deep group-hover:text-brand-purple transition-colors">{d.name}</p>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{d.role}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {app.documents && app.documents.length > 0 && (
                            <div className="pt-10 border-t border-slate-100">
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Verification Documents</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {app.documents.map((doc, i) => (
                                        <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center justify-between p-5 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-brand-purple/20 transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-brand-purple/5 flex items-center justify-center text-brand-purple">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-bold text-navy-deep">{doc.name}</span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-purple transition-all" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Audit Log / Reviews */}
                    {app.reviews && app.reviews.length > 0 && (
                        <div className="space-y-6">
                            <h3 className="text-xs font-bold text-slate-body uppercase tracking-[0.3em] px-2">Decision History</h3>
                            <div className="space-y-4">
                                {app.reviews.map((r, i) => (
                                    <Card key={i} className="p-8 bg-white rounded-2xl flex items-start gap-6 shadow-sm">
                                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                                            r.approved ? "bg-success-green/10 text-success-green" : "bg-amber-50 text-amber-500")}>
                                            {r.approved ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <p className="text-base font-bold text-navy-deep capitalize">{r.role.replace(/_/g, " ")}</p>
                                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{new Date(r.date).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                            </div>
                                            {r.comment && (
                                                <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-slate-200">
                                                    <p className="text-sm text-slate-body font-medium leading-relaxed italic">&ldquo;{r.comment}&rdquo;</p>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sticky Controls Panel */}
                <div className="space-y-8">
                    <Card className="p-10 bg-white rounded-2xl space-y-10 sticky top-24 shadow-sm">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-navy-deep tracking-tight">Workflow Status</h3>
                            <p className="text-sm text-slate-400">Real-time approval trajectory</p>
                        </div>
                        
                        <div className="space-y-10 relative">
                            <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-slate-100" />
                            {STATUS_FLOW.map((step, i) => {
                                const state = getStepState(step, app.status as ApplicationStatus);
                                const StepIcon = STAGE_ICONS[step] || FileText;
                                return (
                                    <div key={step} className="flex items-start gap-6 relative z-10">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-700",
                                            state === "done" ? "bg-success-green text-white shadow-lg shadow-success-green/20" :
                                                state === "active" ? "bg-brand-purple text-white ring-4 ring-brand-purple/10 animate-pulse" :
                                                    "bg-white border border-slate-100 text-slate-200"
                                        )}>
                                            <StepIcon className="w-4 h-4" />
                                        </div>
                                        <div className="pt-0.5">
                                            <p className={cn("text-sm font-bold tracking-tight", 
                                                state === "upcoming" ? "text-slate-300" : "text-navy-deep",
                                                state === "active" && "text-brand-purple"
                                            )}>
                                                {STAGE_LABELS[step]}
                                            </p>
                                            {state === "active" && (
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-ping" />
                                                    <span className="text-[10px] text-brand-purple font-bold tracking-widest uppercase">Action Required</span>
                                                </div>
                                            )}
                                            {state === "done" && <p className="text-[10px] text-success-green font-bold tracking-widest mt-1 uppercase">Verified</p>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {isAdmin && app.status !== "APPROVED" && app.status !== "REJECTED" && nextStatus && (
                            <div className="pt-10 space-y-4 border-t border-slate-100">
                                <Button
                                    className="w-full h-14 shadow-lg bg-brand-purple hover:bg-brand-purple-hover text-white text-base font-bold rounded-xl active:scale-[0.98]"
                                    onClick={() => handleAction(true)}
                                    disabled={isActing}
                                >
                                    {isActing ? "Processing..." : "Approve & Escalate"}
                                </Button>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline" className="h-12 text-xs font-bold border-slate-100 text-slate-400 rounded-lg hover:bg-slate-50"
                                        onClick={() => handleAction(false)} disabled={isActing}>
                                        Request Fix
                                    </Button>
                                    <Button variant="ghost" className="h-12 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-lg"
                                        onClick={handleReject} disabled={isActing}>
                                        Reject App
                                    </Button>
                                </div>
                            </div>
                        )}

                        {(app.status === "APPROVED" || app.status === "REJECTED") && (
                            <div className={cn("p-6 rounded-xl text-base font-bold text-center border-2",
                                app.status === "APPROVED" ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-rose-50 border-rose-100 text-rose-600")}>
                                {app.status === "APPROVED" ? "Finalized: Approved" : "Finalized: Rejected"}
                            </div>
                        )}
                    </Card>

                    <Card className="bg-slate-50/50 border border-slate-100 p-8 rounded-2xl space-y-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-brand-purple opacity-40" />
                            <p className="text-[11px] font-bold text-navy-deep uppercase tracking-[0.2em]">Compliance Check</p>
                        </div>
                        <div className="space-y-3 text-xs font-medium text-slate-400">
                            <div className="flex justify-between">
                                <span>Audit ID</span>
                                <span className="font-bold text-navy-deep">{app.id.slice(0, 10)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Policy Ver.</span>
                                <span className="font-bold text-navy-deep">2026.04.B</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
