"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ReviewsPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#f6f9fc]">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto stripe-shadow">
                    <ShieldCheck className="w-10 h-10 text-success-green" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-light text-navy-deep">Pending Reviews</h1>
                    <p className="text-slate-body text-sm leading-relaxed">
                        Items appearing here require your signature or technical verification.
                    </p>
                </div>
                <Card className="p-12 border-none stripe-shadow bg-white space-y-4">
                    <Sparkles className="w-12 h-12 text-brand-purple/20 mx-auto" />
                    <p className="text-lg font-medium text-navy-deep">Inbox Zero</p>
                    <p className="text-sm text-slate-body">You've cleared all pending tasks for your tier. Sit back or check the archive for past records.</p>
                    <Button variant="outline" className="w-full">
                        Refresh Queue
                    </Button>
                </Card>
            </div>
        </div>
    );
}
