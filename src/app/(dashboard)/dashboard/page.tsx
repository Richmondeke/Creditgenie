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
    ArrowRight,
    Zap,
    TrendingUp,
    ShieldCheck,
    Building2,
    DollarSign,
    Calendar
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Application {
    id: string;
    userId: string;
    applicantName: string;
    amount: number;
    status: string;
    createdAt: string;
    updatedAt?: string;
}

export default function DashboardPage() {
    useApplications();
    const { currentUser, applications } = useApplicationStore();

    const isAdmin = currentUser?.role && currentUser.role !== "USER";
    const userApplications = currentUser 
        ? applications.filter((app: Application) => app.userId === currentUser.id)
        : [];

    const pendingReviews = applications.filter((app: Application) => 
        app.status === "PENDING_TEAM_LEAD" || 
        app.status === "PENDING_CREDIT" || 
        app.status === "PENDING_LEGAL"
    ).length;
    
    const approvedToday = applications.filter((app: Application) => 
        app.status === "APPROVED" && 
        new Date(app.updatedAt || app.createdAt).toDateString() === new Date().toDateString()
    ).length;

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-2">
                    <h1 className="text-5xl font-light text-navy-deep tracking-tight-large">
                        {currentUser ? `Welcome, ${currentUser.name.split(" ")[0]}` : "Welcome"}
                    </h1>
                    <p className="text-slate-body text-lg font-light leading-relaxed max-w-xl">
                        {!currentUser
                            ? "Manage your loans."
                            : isAdmin
                                ? "Manage your applications."
                                : "View your applications."}
                    </p>
                </div>

                {(!isAdmin && currentUser) && (
                    <Link href="/applications/new">
                        <button className="bg-brand-purple text-white px-8 py-4 rounded-[4px] font-normal flex items-center gap-2 hover:bg-brand-purple-hover transition-all shadow-stripe-ambient group active:scale-[0.98]">
                            New Loan
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {isAdmin ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <StatCard
                                title="Pending"
                                value={pendingReviews}
                                icon={Clock}
                                color="bg-amber-500"
                                description="Awaiting review"
                            />
                            <StatCard
                                title="Approved"
                                value={approvedToday}
                                icon={TrendingUp}
                                color="bg-emerald-500"
                                description="Loans approved today"
                            />
                        </div>
                    ) : (
                        <CreditLimit />
                    )}

                    <Card className="shadow-stripe overflow-hidden border-slate-border rounded-[5px]">
                        <div className="px-10 py-10 flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-normal text-navy-deep tracking-tight">
                                    {isAdmin ? "Applications" : "Recent Activity"}
                                </h3>
                                <p className="text-sm text-slate-body font-light">Live</p>
                            </div>
                            <Link href="/applications/all" className="p-3 rounded-full bg-slate-50 text-brand-purple hover:bg-brand-purple hover:text-white transition-all shadow-stripe-ambient">
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {(isAdmin ? applications : userApplications).slice(0, 3).map((app: Application) => (
                                <ApplicationRow key={app.id} application={app} />
                            ))}
                            {(isAdmin ? applications : userApplications).length === 0 && (
                                <div className="p-20 text-center">
                                    <div className="w-16 h-16 bg-white border border-slate-border rounded-[4px] flex items-center justify-center mx-auto mb-6 text-slate-200">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <p className="text-lg font-normal text-slate-400">No applications found.</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="bg-navy-deep p-10 relative overflow-hidden group shadow-stripe-elevated rounded-[5px] border-none">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-purple/20 rounded-full -mr-24 -mt-24 blur-[80px] group-hover:bg-brand-purple/30 transition-all duration-700" />
                        <div className="relative z-10 space-y-6">
                            <div className="w-14 h-14 rounded-[4px] bg-white/10 flex items-center justify-center text-white border border-white/10">
                                <Zap className="w-7 h-7" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-light text-white mb-2 tracking-tight">Support</h4>
                                <p className="text-white/60 text-base font-light leading-relaxed">
                                    Contact us if you have any questions.
                                </p>
                            </div>
                            <button className="w-full bg-white text-navy-deep font-normal py-4 rounded-[4px] hover:bg-slate-100 transition-all shadow-stripe active:scale-[0.98]">
                                Contact Support
                            </button>
                        </div>
                    </Card>

                    <Card className="bg-brand-purple/[0.01] border border-dashed border-brand-purple/10 p-10 rounded-[5px] shadow-stripe-ambient">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-[4px] bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-normal text-navy-deep tracking-tight">Secure</h4>
                        </div>
                        <p className="text-sm text-slate-body font-light leading-relaxed">
                            Your account is secure.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color, description }: any) {
    return (
        <Card className="p-8 flex items-start gap-6 group hover:translate-y-[-2px] transition-all duration-300 shadow-stripe border-slate-border rounded-[5px]">
            <div className={cn("w-14 h-14 rounded-[4px] flex items-center justify-center text-white shrink-0 shadow-stripe-ambient", color)}>
                <Icon className="w-7 h-7" />
            </div>
            <div className="pt-1">
                <p className="text-[11px] font-normal text-slate-label uppercase tracking-[0.2em] mb-2">{title}</p>
                <h4 className="text-4xl font-light text-navy-deep tracking-tight">{value}</h4>
                <p className="text-xs font-light text-slate-body mt-2">{description}</p>
            </div>
        </Card>
    );
}

function ApplicationRow({ application }: any) {
    return (
        <Link href={`/applications/${application.id}`} className="block">
            <div className="px-10 py-8 flex items-center justify-between hover:bg-slate-50/80 transition-all group cursor-pointer">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white border border-slate-border rounded-[4px] flex items-center justify-center text-slate-300 group-hover:text-brand-purple shadow-stripe-ambient transition-all duration-500">
                        <Building2 className="w-7 h-7" />
                    </div>
                    <div>
                        <h5 className="text-lg font-normal text-navy-deep group-hover:text-brand-purple transition-colors tracking-tight">
                            {application.applicantName}
                        </h5>
                        <p className="text-xs font-normal text-slate-body/60 flex items-center gap-2 mt-1 uppercase tracking-widest">
                            <span>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(application.amount)}</span>
                            <span className="w-1 h-1 bg-slate-200 rounded-full" />
                            <span>{new Date(application.createdAt).toLocaleDateString()}</span>
                        </p>
                    </div>
                </div>
                <Badge variant="info" className="h-7 px-4 font-normal tracking-widest text-[10px] uppercase">
                    {application.status.split('_').pop()}
                </Badge>
            </div>
        </Link>
    );
}
