"use client";

import React from "react";
import { useApplicationStore, useApplications } from "@/lib/store";
import {
    FileText,
    Search,
    Filter,
    ArrowLeft,
    Plus,
    Building2,
    DollarSign,
    Calendar,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function ApplicationsPage() {
    useApplications();
    const { currentUser, applications, isLoading } = useApplicationStore();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const isAdmin = currentUser?.role && currentUser.role !== "USER";
    const filteredApps = currentUser
        ? (isAdmin ? applications : applications.filter(app => app.userId === currentUser.id))
        : [];

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-normal text-slate-body hover:text-brand-purple transition-colors mb-2 uppercase tracking-widest">
                        <ArrowLeft className="w-3 h-3" /> Overview
                    </Link>
                    <h1 className="text-4xl font-light text-navy-deep tracking-tight-large">
                        {isAdmin ? "Applications" : "My Applications"}
                    </h1>
                    <p className="text-slate-body text-base max-w-lg leading-relaxed font-light">
                        {isAdmin 
                            ? "Manage applications."
                            : "View your applications."}
                    </p>
                </div>

                {!isAdmin && (
                    <Link href="/applications/new">
                        <Button size="lg" className="h-12 px-8 shadow-stripe-ambient rounded-[4px]">
                            <Plus className="w-5 h-5 mr-2" />
                            New Loan
                        </Button>
                    </Link>
                )}
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-2 rounded-[5px] border border-slate-border shadow-stripe-ambient flex flex-col md:flex-row gap-2 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-12 pr-4 h-12 bg-slate-50 rounded-[4px] text-sm font-normal focus:ring-1 focus:ring-brand-purple/20 transition-all outline-none"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 h-12 bg-white border border-slate-border rounded-[4px] text-sm font-normal text-navy-deep hover:bg-slate-50 transition-all shadow-stripe-ambient">
                        <Filter className="w-4 h-4 text-slate-300" /> Filter
                    </button>
                    <button className="flex-1 md:flex-none px-6 h-12 bg-navy-deep text-white rounded-[4px] text-sm font-normal hover:bg-navy-dark transition-all shadow-stripe-ambient">
                        Download
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredApps.map((app) => (
                    <Link key={app.id} href={`/applications/${app.id}`}>
                        <Card className="p-0 bg-white hover:border-brand-purple/20 transition-all group overflow-hidden shadow-stripe border-slate-border rounded-[5px]">
                            <div className="flex flex-col md:flex-row md:items-center">
                                <div className="p-6 md:p-8 flex-1 flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-[4px] bg-white border border-slate-border flex items-center justify-center text-slate-300 group-hover:text-brand-purple shadow-stripe-ambient transition-all duration-300">
                                        <Building2 className="w-7 h-7" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-normal text-navy-deep truncate tracking-tight">{app.applicantName}</h3>
                                            <div className="px-2 py-0.5 rounded-full bg-slate-100 text-[9px] font-normal text-slate-400 uppercase tracking-widest">
                                                {app.id.slice(0, 8)}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <div className="flex items-center gap-1.5 text-slate-body">
                                                <DollarSign className="w-3.5 h-3.5 opacity-40" />
                                                <span className="text-xs font-normal">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(app.amount)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-body">
                                                <Calendar className="w-3.5 h-3.5 opacity-40" />
                                                <span className="text-xs font-normal">{new Date(app.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 border-t md:border-t-0 md:border-l border-slate-border bg-slate-50/10 flex items-center justify-between md:justify-end gap-10 md:w-64">
                                    <Badge variant={app.status === "APPROVED" ? "success" : app.status === "REJECTED" ? "error" : "info"} className="h-6 font-normal tracking-widest text-[10px] uppercase">
                                        {app.status.split('_').pop()}
                                    </Badge>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-border text-slate-200 group-hover:text-brand-purple group-hover:translate-x-1 transition-all duration-300 shadow-stripe-ambient">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}

                {filteredApps.length === 0 && (
                    <Card className="p-20 flex flex-col items-center justify-center bg-white text-center rounded-[5px] shadow-stripe border-slate-border">
                        <div className="w-16 h-16 bg-white border border-slate-border rounded-[4px] flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-stripe-ambient">
                            <FileText className="w-8 h-8" />
                        </div>
                        <h4 className="text-xl font-normal text-navy-deep mb-1 tracking-tight">No applications</h4>
                        <p className="text-base text-slate-400 max-w-xs mx-auto leading-relaxed font-light">
                            {isAdmin
                                ? "No applications found."
                                : "You haven't submitted any applications."}
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}

function Button({ children, size, className, ...props }: any) {
    return (
        <button
            className={cn(
                "bg-brand-purple text-white font-normal rounded-[4px] transition-all hover:bg-brand-purple-hover active:scale-[0.98] disabled:opacity-50 shadow-stripe-ambient",
                size === "lg" ? "px-8 py-3 text-sm" : "px-4 py-2 text-xs",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
