"use client";

import React from "react";
import { History, Clock, Filter } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function ActivityPage() {
    return (
        <div className="flex-1 p-12 bg-[#f6f9fc]">
            <div className="max-w-4xl mx-auto w-full space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-light text-navy-deep mb-2">Activity</h1>
                        <p className="text-slate-body">A real-time audit log of all decisions and application movements.</p>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-body uppercase tracking-widest border border-slate-border px-3 py-2 rounded-stripe hover:bg-white transition-all bg-slate-50">
                        <Filter className="w-3 h-3" /> Filter Log
                    </button>
                </div>

                <Card className="p-20 text-center space-y-4 border-none stripe-shadow bg-white">
                    <Clock className="w-12 h-12 text-slate-border mx-auto animate-pulse" />
                    <h3 className="text-xl font-medium text-navy-deep">Initializing Activity Log</h3>
                    <p className="text-sm text-slate-body max-w-sm mx-auto">
                        Once you start processing applications, all approval actions, rejections, and comments will be logged here for compliance auditing.
                    </p>
                </Card>
            </div>
        </div>
    );
}
