"use client";

import React from "react";
import { HelpCircle, Book, MessageSquare, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function HelpPage() {
    const links = [
        { title: "Documentation", icon: Book, href: "#" },
        { title: "Support Chat", icon: MessageSquare, href: "#" },
        { title: "API Reference", icon: ExternalLink, href: "#" },
    ];

    return (
        <div className="flex-1 p-12 bg-[#f6f9fc]">
            <div className="max-w-4xl mx-auto w-full space-y-12">
                <div className="text-center space-y-4">
                    <HelpCircle className="w-12 h-12 text-brand-purple mx-auto" />
                    <h1 className="text-3xl font-light text-navy-deep">How can we help?</h1>
                    <p className="text-slate-body max-w-lg mx-auto">
                        Find answers to common questions about the approval workflow, compliance requirements, and platform features.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {links.map((l) => (
                        <Card key={l.title} className="p-6 text-center border-none stripe-shadow bg-white hover:border-brand-purple transition-all cursor-pointer group">
                            <l.icon className="w-6 h-6 text-slate-body mx-auto mb-4 group-hover:text-brand-purple transition-colors" />
                            <h3 className="font-medium text-navy-deep">{l.title}</h3>
                        </Card>
                    ))}
                </div>

                <Card className="p-8 border-none stripe-shadow bg-white space-y-4">
                    <h3 className="text-lg font-medium text-navy-deep">Quick FAQ</h3>
                    <div className="space-y-4 divide-y divide-slate-border">
                        <div className="pt-4">
                            <p className="font-medium text-sm text-navy-deep mb-1">How long does the 4-tier approval take?</p>
                            <p className="text-xs text-slate-body">Typically 2-3 business days depending on Legal compliance queue depth.</p>
                        </div>
                        <div className="pt-4">
                            <p className="font-medium text-sm text-navy-deep mb-1">Can I bypass the Team Lead stage?</p>
                            <p className="text-xs text-slate-body">No. All loan applications must pass through the predefined chain for audit purposes.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
