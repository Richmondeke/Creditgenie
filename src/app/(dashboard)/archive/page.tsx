"use client";

import React, { useState } from "react";
import { useApplicationStore, useApplications } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { Archive, Search, Filter, Building2, Calendar, ArrowRight, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { cn } from "@/lib/utils";

function formatCurrency(n: number) {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);
}

export default function ArchivePage() {
    useApplications();
    const { applications, isLoading } = useApplicationStore();
    const [search, setSearch] = useState("");

    const archivedApps = applications.filter(app => 
        (app.status === "APPROVED" || app.status === "REJECTED") &&
        (app.applicantName.toLowerCase().includes(search.toLowerCase()) || 
         app.rcNumber?.includes(search))
    );

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <header className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-[4px] bg-white border border-slate-border flex items-center justify-center text-slate-400 shadow-stripe-ambient">
                        <Archive className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-normal text-slate-400 uppercase tracking-[0.3em]">History</span>
                </div>
                <h1 className="text-5xl font-light text-navy-deep tracking-tight-large">Archive</h1>
                <p className="text-slate-body text-lg font-light leading-relaxed max-w-xl">
                    History of all approved and rejected loans.
                </p>
            </header>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-purple transition-colors" />
                    <Input 
                        placeholder="Search..." 
                        className="pl-14 h-14 bg-white border border-slate-border rounded-[4px] text-base font-normal focus:ring-1 focus:ring-brand-purple/10 transition-all shadow-stripe-ambient"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button className="h-14 px-8 bg-white rounded-[4px] flex items-center gap-3 text-sm font-normal text-navy-deep hover:bg-slate-50 transition-all border border-slate-border shadow-stripe-ambient">
                    <Filter className="w-5 h-5 text-slate-300" />
                    Filter
                </button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
                </div>
            ) : archivedApps.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {archivedApps.map((app) => (
                        <Link key={app.id} href={`/applications/${app.id}`}>
                            <Card className="p-8 hover:border-brand-purple/20 transition-all group cursor-pointer flex items-center gap-8 shadow-stripe border-slate-border rounded-[5px]">
                                <div className={cn(
                                    "w-14 h-14 rounded-[4px] border flex items-center justify-center shrink-0 shadow-stripe-ambient transition-all group-hover:scale-105",
                                    app.status === "APPROVED" ? "bg-success-green/5 text-success-green border-success-green/10" : "bg-rose-50 text-rose-500 border-rose-100"
                                )}>
                                    <Building2 className="w-7 h-7" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-xl font-normal text-navy-deep truncate tracking-tight">{app.applicantName}</h3>
                                        <Badge variant={app.status === "APPROVED" ? "success" : "error"} className="h-5 px-2 text-[9px] font-normal tracking-widest uppercase">
                                            {app.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-6 text-sm text-slate-body font-light">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 opacity-30" />
                                            {new Date(app.updatedAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-navy-deep">
                                            <DollarSign className="w-4 h-4 opacity-30 text-brand-purple" />
                                            {formatCurrency(app.amount)}
                                        </span>
                                    </div>
                                </div>

                                <div className="hidden md:flex items-center gap-2 text-[10px] font-normal text-slate-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                    View
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <Card className="p-20 flex flex-col items-center justify-center bg-white text-center rounded-[5px] shadow-stripe border-slate-border">
                    <div className="w-16 h-16 rounded-[4px] bg-white border border-slate-border flex items-center justify-center text-slate-200 mb-8 shadow-stripe-ambient">
                        <Archive className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-normal text-navy-deep tracking-tight mb-2">No history</h3>
                    <p className="text-slate-400 text-base max-w-sm mx-auto leading-relaxed font-light">
                        Approved and rejected loans will appear here.
                    </p>
                </Card>
            )}
        </div>
    );
}
