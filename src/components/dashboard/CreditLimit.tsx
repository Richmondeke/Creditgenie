"use client";

import React from "react";
import { CreditCard, ArrowUpRight, Wallet } from "lucide-react";
import { useApplicationStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function CreditLimit() {
    const { currentUser } = useApplicationStore();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const limit = currentUser?.creditLimit || 0;
    const available = currentUser?.availableLimit || 0;
    const usedPercentage = limit > 0 ? ((limit - available) / limit) * 100 : 0;

    return (
        <Card className="p-0 overflow-hidden bg-white rounded-[5px] shadow-stripe border border-slate-border group">
            <div className="p-10">
                <div className="flex items-center justify-between mb-10">
                    <div className="w-16 h-16 bg-white border border-slate-border rounded-[4px] flex items-center justify-center text-brand-purple transition-transform group-hover:scale-105 duration-500 shadow-stripe-ambient">
                        <CreditCard className="w-8 h-8" />
                    </div>
                    <Badge variant="success" className="h-7 px-4 font-normal tracking-widest text-[10px] uppercase">
                        Active
                    </Badge>
                </div>

                <div className="space-y-1 mb-12">
                    <p className="text-[11px] font-normal text-slate-label uppercase tracking-[0.2em]">Available</p>
                    <h3 className="text-5xl font-light text-navy-deep tracking-tight">
                        {formatCurrency(available)}
                    </h3>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between text-[11px] font-normal uppercase tracking-widest">
                        <span className="text-slate-label">Used</span>
                        <span className="text-navy-deep font-normal">{usedPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-border p-0">
                        <div
                            className="h-full bg-brand-purple rounded-full transition-all duration-1000 ease-out shadow-stripe-ambient"
                            style={{ width: `${usedPercentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] font-normal uppercase tracking-widest text-slate-400">
                        <span>Used: {formatCurrency(limit - available)}</span>
                        <span>Limit: {formatCurrency(limit)}</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50/50 border-t border-slate-border px-10 py-6 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors group/btn">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-white border border-slate-border rounded-[4px] flex items-center justify-center text-slate-300 group-hover/btn:text-brand-purple transition-all shadow-stripe-ambient">
                        <Wallet className="w-5 h-5" />
                    </div>
                    <span className="text-base font-normal text-navy-deep">Top up</span>
                </div>
                <ArrowUpRight className="w-6 h-6 text-slate-300 group-hover/btn:text-brand-purple transition-all group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </div>
        </Card>
    );
}
