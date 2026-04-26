"use client";

import React from "react";
import { useApplicationStore, useApplications } from "@/lib/store";
import {
    FileText,
    Search,
    Filter,
    ChevronRight,
    ArrowLeft,
    Plus
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ApplicationsPage() {
    useApplications(); // Initialize Firestore real-time sync
    const { currentUser, applications, isLoading } = useApplicationStore();

    if (isLoading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple"></div>
            </div>
        );
    }

    if (!currentUser) return null;

    const isAdmin = currentUser.role !== "USER";
    const filteredApps = isAdmin
        ? applications
        : applications.filter(app => app.userId === currentUser.id);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link href="/dashboard" className="text-xs font-bold text-slate-body flex items-center gap-1 hover:text-brand-purple transition-colors mb-2">
                        <ArrowLeft className="w-3 h-3" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-navy-deep tracking-tight">
                        {isAdmin ? "All Applications" : "My Applications"}
                    </h1>
                </div>

                {!isAdmin && (
                    <Link href="/applications/new">
                        <button className="bg-brand-purple text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-purple/90 transition-all stripe-shadow">
                            New Application
                            <Plus className="w-4 h-4" />
                        </button>
                    </Link>
                )}
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by ID or applicant name..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-border rounded-xl text-sm font-medium hover:bg-slate-50 transition-all">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 bg-navy-deep text-white rounded-xl text-sm font-semibold hover:bg-navy-deep/90 transition-all">
                        Export CSV
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl border border-slate-border shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 px-6 py-3 bg-slate-50 border-b border-slate-border text-[10px] font-bold uppercase tracking-widest text-slate-body">
                    <div className="col-span-12 md:col-span-5">Applicant / ID</div>
                    <div className="hidden md:block col-span-2">Amount</div>
                    <div className="hidden md:block col-span-2">Date</div>
                    <div className="hidden md:block col-span-2">Status</div>
                    <div className="hidden md:block col-span-1"></div>
                </div>
                <div className="divide-y divide-slate-100">
                    {filteredApps.map((app) => (
                        <ApplicationListItem key={app.id} application={app} />
                    ))}
                    {filteredApps.length === 0 && (
                        <div className="p-20 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <FileText className="w-8 h-8" />
                            </div>
                            <h4 className="text-lg font-bold text-navy-deep mb-1">No applications found</h4>
                            <p className="text-sm text-slate-body max-w-xs mx-auto">
                                {isAdmin
                                    ? "There are no credit applications in the system yet."
                                    : "You haven&apos;t submitted any credit applications yet. Get started by clicking the button above."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

interface Application {
    id: string;
    applicantName: string;
    amount: number;
    createdAt: string;
    status: string;
}

function ApplicationListItem({ application }: { application: Application }) {
    const statusColors: Record<string, string> = {
        PENDING_TEAM_LEAD: "text-amber-600 bg-amber-50 border-amber-100",
        PENDING_CREDIT: "text-blue-600 bg-blue-50 border-blue-100",
        PENDING_LEGAL: "text-purple-600 bg-purple-50 border-purple-100",
        APPROVED: "text-emerald-600 bg-emerald-50 border-emerald-100",
        REJECTED: "text-rose-600 bg-rose-50 border-rose-100",
    };

    return (
        <Link href={`/applications/${application.id}`}>
            <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-slate-50 transition-all group cursor-pointer">
                <div className="col-span-12 md:col-span-5 flex items-center gap-4 mb-2 md:mb-0">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-brand-purple transition-all border border-transparent group-hover:border-slate-border">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <h5 className="text-sm font-bold text-navy-deep group-hover:text-brand-purple transition-colors mb-0.5">
                            {application.applicantName}
                        </h5>
                        <p className="text-[10px] font-medium text-slate-body/60 uppercase tracking-wider">
                            ID: {application.id.toUpperCase()}
                        </p>
                    </div>
                </div>
                <div className="col-span-4 md:col-span-2 text-sm font-bold text-navy-deep">
                    {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(application.amount)}
                </div>
                <div className="col-span-4 md:col-span-2 text-xs font-semibold text-slate-body">
                    {new Date(application.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="col-span-4 md:col-span-2">
                    <span className={cn("inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border", statusColors[application.status])}>
                        {application.status.split('_').pop()}
                    </span>
                </div>
                <div className="hidden md:flex col-span-1 justify-end">
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-purple group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </Link>
    );
}
