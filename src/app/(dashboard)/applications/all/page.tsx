"use client";

import React from "react";
import { CreditCard, Inbox, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function AllApplications() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#f6f9fc]">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto stripe-shadow">
                    <CreditCard className="w-10 h-10 text-brand-purple" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-light text-navy-deep">All Applications</h1>
                    <p className="text-slate-body text-sm leading-relaxed">
                        This module will list every application in the system. Use filters to narrow down by branch, amount, or tenure.
                    </p>
                </div>
                <Card className="p-8 border-dashed border-2 border-slate-border bg-white/50 space-y-4">
                    <Inbox className="w-12 h-12 text-slate-border mx-auto" />
                    <p className="text-sm text-slate-body italic">Advanced filtering and bulk export coming soon.</p>
                    <Link href="/applications/new" className="block">
                        <Button className="w-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Create First Loan
                        </Button>
                    </Link>
                </Card>
            </div>
        </div>
    );
}
