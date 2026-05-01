"use client";

import React, { useMemo } from "react";
import { useApplicationStore, useApplications } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { 
    ShieldCheck, 
    Users, 
    BarChart3, 
    Settings2, 
    Lock
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default function AdminPortal() {
    useApplications();
    const { applications, isLoading } = useApplicationStore();

    const stats = useMemo(() => {
        const approvedApps = applications.filter(app => app.status === "APPROVED");
        const totalVolume = approvedApps.reduce((sum, app) => sum + (app.amount || 0), 0);
        
        const uniqueApplicants = new Set(applications.map(app => app.userId)).size;

        return [
            { 
                label: "Total Users", 
                value: uniqueApplicants || 0, 
                icon: Users, 
                trend: "Active",
                color: "bg-brand-purple"
            },
            { 
                label: "Total Loans", 
                value: new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(totalVolume), 
                icon: BarChart3, 
                trend: "Approved",
                color: "bg-success-green"
            },
        ];
    }, [applications]);

    const tools = [
        { name: "Users", desc: "Manage roles and permissions", icon: Users },
        { name: "Settings", desc: "Manage how the system works", icon: Settings2 },
        { name: "Security", desc: "Check security logs", icon: ShieldCheck },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <header className="space-y-2">
                <div className="flex items-center gap-4">
                    <h1 className="text-5xl font-light text-navy-deep tracking-tight-large">Overview</h1>
                    <Badge variant="success" className="h-7 px-4 font-normal tracking-widest text-[10px] uppercase">
                        System Online
                    </Badge>
                </div>
                <p className="text-slate-body text-lg font-light leading-relaxed max-w-xl">
                    Manage users and system settings.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-10 flex items-start gap-8 group hover:translate-y-[-2px] transition-all duration-300 shadow-stripe border-slate-border rounded-[5px]">
                        <div className={cn("w-16 h-16 rounded-[4px] flex items-center justify-center text-white shrink-0 shadow-stripe-ambient", stat.color)}>
                            <stat.icon className="w-8 h-8" />
                        </div>
                        <div className="pt-1">
                            <p className="text-[11px] font-normal text-slate-label uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                            <h4 className="text-4xl font-light text-navy-deep tracking-tight">{stat.value}</h4>
                            <p className="text-[10px] font-normal text-slate-400 mt-2 uppercase tracking-widest">{stat.trend}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tools.map((tool, i) => (
                    <Card key={i} className="p-8 hover:bg-slate-50 transition-all cursor-pointer group shadow-stripe border-slate-border rounded-[5px]">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-[4px] bg-white border border-slate-border flex items-center justify-center text-slate-300 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300 shadow-stripe-ambient">
                                <tool.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-normal text-navy-deep tracking-tight group-hover:text-brand-purple transition-colors">{tool.name}</h3>
                                <p className="text-xs font-light text-slate-body mt-0.5">{tool.desc}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
