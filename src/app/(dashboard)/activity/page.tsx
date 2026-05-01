"use client";

import React from "react";
import { Clock, CheckCircle2, AlertCircle, FileText, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useActivityFeed, ActivityEvent } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";

function getEventMeta(event: ActivityEvent): { icon: React.ElementType; color: string; label: string; bg: string } {
    switch (event.type) {
        case "APPLICATION_SUBMITTED":
            return { icon: FileText, color: "text-brand-purple", bg: "bg-brand-purple/5", label: "initiated a new pipeline" };
        case "STATUS_CHANGED":
            if (event.approved === true)
                return { icon: CheckCircle2, color: "text-success-green", bg: "bg-success-green/5", label: `authorized — ${(event.meta || "").replace(/_/g, " ")}` };
            if (event.approved === false)
                return { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50", label: `requested modifications — ${(event.meta || "").replace(/_/g, " ")}` };
            return { icon: ShieldCheck, color: "text-navy-deep", bg: "bg-slate-50", label: `transitioned status to ${(event.meta || "").replace(/_/g, " ")}` };
        default:
            return { icon: Zap, color: "text-slate-400", bg: "bg-slate-50", label: event.type };
    }
}

export default function ActivityPage() {
    const { events, isLoading } = useActivityFeed();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                            <Clock className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.3em]">System Audit Logs</span>
                    </div>
                    <h1 className="text-5xl font-light text-navy-deep tracking-tight">Activity Feed</h1>
                    <p className="text-slate-body text-lg font-medium leading-relaxed max-w-xl">
                        A real-time, immutable ledger of all operations across the Lydraflow infrastructure.
                    </p>
                </div>
                <div className="bg-white px-6 py-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Live Updates</p>
                    <div className="flex items-center gap-2 text-success-green">
                        <span className="w-2 h-2 bg-success-green rounded-full animate-ping" />
                        <span className="text-sm font-bold tracking-tight">Connected to Core</span>
                    </div>
                </div>
            </header>

            <Card className="overflow-hidden bg-white shadow-sm">
                <div className="divide-y divide-slate-50">
                    {events.map((event) => {
                        const { icon: Icon, color, bg, label } = getEventMeta(event);
                        return (
                            <div key={event.id} className="p-8 flex items-start gap-6 hover:bg-slate-50/50 transition-all duration-300 group">
                                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-md", bg, color)}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <div className="flex-1 min-w-0 pt-1">
                                    <div className="flex items-center justify-between gap-4 mb-2">
                                        <div className="flex items-center gap-3">
                                            <p className="text-lg font-bold text-navy-deep capitalize tracking-tight">
                                                {(event.actor || "Automated Agent").replace(/_/g, " ")}
                                            </p>
                                            <Badge variant="neutral" className="h-5 px-2 text-[9px] font-bold tracking-widest">TRACE ID: {event.id.slice(0, 8)}</Badge>
                                        </div>
                                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                                            {new Date(event.createdAt).toLocaleString([], {
                                                month: "short", day: "numeric",
                                                hour: "2-digit", minute: "2-digit"
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-base text-slate-body leading-relaxed font-medium">
                                        <span className="text-navy-deep font-semibold">{label}</span>
                                        {event.detail ? (
                                            <span className="ml-1.5 px-2 py-0.5 bg-slate-50 rounded-lg border border-slate-100 text-brand-purple">
                                                {event.detail}
                                            </span>
                                        ) : ""}
                                    </p>
                                </div>
                                <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-100 text-slate-200 hover:text-brand-purple transition-all">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {events.length === 0 && (
                        <div className="p-24 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200 mx-auto mb-6">
                                <Clock className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold text-navy-deep mb-2">Immutable ledger empty</h4>
                            <p className="text-slate-400 text-base max-w-sm mx-auto leading-relaxed">
                                Transactional events will appear here as authorization requests are processed.
                            </p>
                        </div>
                    )}
                </div>
            </Card>
            
            <div className="flex justify-center pt-8">
                <button className="text-xs font-bold text-slate-300 uppercase tracking-[0.3em] hover:text-brand-purple transition-colors">
                    Load Archive logs
                </button>
            </div>
        </div>
    );
}
