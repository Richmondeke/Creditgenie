"use client";

import React from "react";
import { Archive, History, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function ArchivePage() {
    return (
        <div className="flex-1 flex flex-col p-12 bg-[#f6f9fc]">
            <div className="max-w-4xl mx-auto w-full space-y-12">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-light text-navy-deep">Archive</h1>
                        <p className="text-slate-body text-sm italic">Access historical loan data and closed application cycles.</p>
                    </div>
                    <div className="w-64">
                        <Input icon={<Search className="w-4 h-4" />} placeholder="Search archive..." className="bg-white border-slate-border" />
                    </div>
                </div>

                <Card className="p-20 text-center space-y-6 border-none stripe-shadow bg-white">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-border">
                        <Archive className="w-8 h-8 text-slate-body" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-medium text-navy-deep">No Archived Records</h3>
                        <p className="text-slate-body text-sm max-w-sm mx-auto">
                            Applications move here once they are fully disbursed or rejected and archived by the compliance team.
                        </p>
                    </div>
                    <div className="pt-4">
                        <button className="text-xs font-bold text-brand-purple uppercase tracking-widest hover:underline transition-all">
                            Learn about data retention
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
