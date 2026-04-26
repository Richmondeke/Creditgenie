"use client";

import React from "react";
import { useApplicationStore, useApplications } from "@/lib/store";
import { CreditLimit } from "@/components/dashboard/CreditLimit";
import {
    ArrowUpRight,
    Clock,
    CheckCircle2,
    AlertCircle,
    FileText,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Application {
    id: string;
    userId: string;
    applicantName: string;
    amount: number;
    status: string;
    createdAt: string;
}

export default function DashboardPage() {
    useApplications();
    const { currentUser, applications } = useApplicationStore();

    if (!currentUser) return null;

    const isAdmin = currentUser.role !== "USER";
    const userApplications = applications.filter((app: Application) => app.userId === currentUser.id);

    const pendingReviews = applications.filter((app: Application) => app.status === "PENDING_CREDIT" || app.status === "PENDING_TEAM_LEAD").length;
    const approvedToday = 0;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-navy-deep tracking-tight">
                        {isAdmin ? "Admin Overview" : `Welcome back, ${currentUser.name.split(" ")[0]}!`}
                    </h1>
                    <p className="text-slate-body mt-1 font-medium">
                        {isAdmin
                            ? "Monitor and manage credit applications."
                            : "Track your credit limit and application status."}
                    </p>
                </div>

                {!isAdmin && (
                    <Link href="/applications/new">
                        <button className="bg-brand-purple text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-purple/90 transition-all stripe-shadow shadow-brand-purple/20">
                            Apply for Credit
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {isAdmin ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <StatCard
                                title="Pending Reviews"
                                value={pendingReviews}
                                icon={Clock}
                                color="bg-amber-500"
                                description="Awaiting staff action"
                            />
                            <StatCard
                                title="Approved Today"
                                value={approvedToday}
                                icon={CheckCircle2}
                                color="bg-emerald-500"
                                description="New lines of credit"
                            />
                        </div>
                    ) : (
                        <CreditLimit />
                    )}

                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                        <div className="px-10 py-8 flex items-center justify-between">
                            <h3 className="font-bold text-navy-deep">
                                {isAdmin ? "Urgent Reviews" : "Recent Applications"}
                            </h3>
                            <Link href="/applications" className="text-xs font-bold text-brand-purple flex items-center gap-1 hover:underline">
                                View all <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {(isAdmin ? applications : userApplications).slice(0, 3).map((app: Application) => (
                                <ApplicationRow key={app.id} application={app} />
                            ))}
                            {(isAdmin ? applications : userApplications).length === 0 && (
                                <div className="p-12 text-center">
                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm text-slate-body font-medium">No applications found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info Area */}
                <div className="space-y-6">
                    <div className="bg-navy-deep rounded-3xl p-10 relative overflow-hidden group border border-white/10 shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-brand-purple/30 transition-all duration-700" />

                        <div className="relative z-10">
                            <div className="text-white text-lg font-bold mb-2 tracking-tight">Need Assistance?</div>
                            <p className="text-white/80 text-sm mb-6 font-medium leading-relaxed">
                                Our credit specialists are available 24/7 to guide you through the process.
                            </p>
                            <button
                                onClick={() => {
                                    const trigger = document.getElementById('support-widget-trigger');
                                    if (trigger) trigger.click();
                                }}
                                className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all duration-300 border border-white/20 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Contact Support
                            </button>
                        </div>
                    </div>

                    <div className="bg-brand-purple/[0.03] rounded-3xl p-10">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertCircle className="w-5 h-5 text-brand-purple" />
                            <h4 className="font-bold text-navy-deep">Security Insight</h4>
                        </div>
                        <p className="text-sm text-slate-body font-medium leading-relaxed">
                            Always ensure your documents are encrypted before upload. Lydraflow uses AES-256 bank-grade encryption.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color, description }: { title: string; value: string | number; icon: React.ElementType; color: string; description: string }) {
    return (
        <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-start gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-body uppercase tracking-wider">{title}</p>
                <h4 className="text-2xl font-bold text-navy-deep mt-1">{value}</h4>
                <p className="text-[10px] font-medium text-slate-body/60 mt-1">{description}</p>
            </div>
        </div>
    );
}

function ApplicationRow({ application }: { application: { id: string; status: string; applicantName: string; amount: number; createdAt: string } }) {
    const statusColors: Record<string, string> = {
        PENDING_TEAM_LEAD: "text-amber-600 bg-amber-50 border-amber-100",
        PENDING_CREDIT: "text-blue-600 bg-blue-50 border-blue-100",
        PENDING_LEGAL: "text-purple-600 bg-purple-50 border-purple-100",
        APPROVED: "text-emerald-600 bg-emerald-50 border-emerald-100",
        REJECTED: "text-rose-600 bg-rose-50 border-rose-100",
    };

    return (
        <div className="px-10 py-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-brand-purple transition-all">
                    <FileText className="w-5 h-5" />
                </div>
                <div>
                    <h5 className="text-sm font-bold text-navy-deep group-hover:text-brand-purple transition-colors">
                        {application.applicantName}
                    </h5>
                    <p className="text-[10px] font-medium text-slate-body flex items-center gap-2">
                        <span>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(application.amount)}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>{new Date(application.createdAt).toLocaleDateString()}</span>
                    </p>
                </div>
            </div>
            <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", statusColors[application.status])}>
                {application.status.replace("PENDING_", "").replace("_", " ")}
            </div>
        </div>
    );
}
