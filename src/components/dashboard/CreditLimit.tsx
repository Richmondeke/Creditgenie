"use client";

import React from "react";
import { CreditCard, ArrowUpRight, Wallet } from "lucide-react";
import { useApplicationStore } from "@/lib/store";

export function CreditLimit() {
    const { currentUser } = useApplicationStore();

    if (!currentUser) return null;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const usedPercentage = ((currentUser.creditLimit - currentUser.availableLimit) / currentUser.creditLimit) * 100;

    return (
        <div className="bg-white rounded-2xl border border-slate-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 bg-brand-purple/10 rounded-xl flex items-center justify-center text-brand-purple shadow-inner">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold border border-emerald-100">
                        Active
                    </div>
                </div>

                <div className="space-y-1 mb-8">
                    <p className="text-xs font-bold text-slate-body uppercase tracking-wider">Available Credit Limit</p>
                    <h3 className="text-3xl font-bold text-navy-deep tracking-tight">
                        {formatCurrency(currentUser.availableLimit)}
                    </h3>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-body">Utilization</span>
                        <span className="text-navy-deep">{usedPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-brand-purple rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(139,92,246,0.3)]"
                            style={{ width: `${usedPercentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-body/50">
                        <span>Used: {formatCurrency(currentUser.creditLimit - currentUser.availableLimit)}</span>
                        <span>Limit: {formatCurrency(currentUser.creditLimit)}</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 border-t border-slate-border px-6 py-4 flex items-center justify-between group cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white border border-slate-border rounded-lg flex items-center justify-center text-slate-body group-hover:text-brand-purple transition-colors">
                        <Wallet className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-navy-deep">Request Limit Increase</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-body group-hover:text-brand-purple transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
        </div>
    );
}
