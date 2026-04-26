"use client";

import React, { useState } from "react";
import { Search, Book, MessageSquare, Phone, ExternalLink, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function Help() {
    const [search, setSearch] = useState("");

    const faqs = [
        {
            q: "How does the 4-tier approval flow work?",
            a: "Every application starts at the Staff level for initial data entry. It then moves sequentially through Team Lead, Credit/Risk, and Legal before final approval."
        },
        {
            q: "What documents are required for CAC verification?",
            a: "You need the Certificate of Incorporation, Memorandum of Association, and the Status Report showing current directors."
        },
        {
            q: "Can I undo a rejection?",
            a: "Once an application is rejected, it is archived. You must create a new application or use the 'Request Changes' flow if parts of the application were valid."
        },
        {
            q: "How do I add a new Team Lead?",
            a: "Admins can add Team Leads via the Settings > Teams module. New users will receive an email invitation to set their password."
        }
    ];

    const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="p-8 max-w-5xl mx-auto w-full">
            <header className="mb-12 text-center max-w-2xl mx-auto">
                <HelpCircle className="w-12 h-12 text-brand-purple mx-auto mb-4 opacity-20" />
                <h1 className="text-3xl font-light text-navy-deep">How can we help?</h1>
                <p className="text-slate-body mt-2">Search our Knowledge Base or contact our technical support team.</p>
                <div className="mt-8 relative max-w-lg mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-body/50" />
                    <Input
                        className="pl-12 h-14 text-lg stripe-shadow"
                        placeholder="Search documentation..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="stripe-shadow border-none p-6 hover:translate-y-[-4px] transition-transform cursor-pointer">
                    <Book className="w-6 h-6 text-brand-purple mb-4" />
                    <h3 className="font-medium text-navy-deep mb-2">Guides & Manuals</h3>
                    <p className="text-xs text-slate-body leading-relaxed">Step-by-step instructions for every module in Creditgenie.</p>
                    <div className="mt-4 flex items-center text-brand-purple text-xs font-bold gap-1">
                        Browse Guides <ExternalLink className="w-3 h-3" />
                    </div>
                </Card>
                <Card className="stripe-shadow border-none p-6 hover:translate-y-[-4px] transition-transform cursor-pointer">
                    <MessageSquare className="w-6 h-6 text-brand-purple mb-4" />
                    <h3 className="font-medium text-navy-deep mb-2">Internal Chat</h3>
                    <p className="text-xs text-slate-body leading-relaxed">Connect with the compliance team via Slack integration.</p>
                    <div className="mt-4 flex items-center text-brand-purple text-xs font-bold gap-1">
                        Open Slack <ExternalLink className="w-3 h-3" />
                    </div>
                </Card>
                <Card className="stripe-shadow border-none p-6 hover:translate-y-[-4px] transition-transform cursor-pointer">
                    <Phone className="w-6 h-6 text-brand-purple mb-4" />
                    <h3 className="font-medium text-navy-deep mb-2">Technical Support</h3>
                    <p className="text-xs text-slate-body leading-relaxed">Available 24/7 for critical platform issues and bug reports.</p>
                    <div className="mt-4 flex items-center text-brand-purple text-xs font-bold gap-1">
                        Contact Us <ExternalLink className="w-3 h-3" />
                    </div>
                </Card>
            </div>

            <section>
                <h2 className="text-[10px] font-bold text-slate-body uppercase tracking-[0.2em] mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {filteredFaqs.map((faq, i) => (
                        <Card key={i} className="stripe-shadow border-none border-l-2 border-l-brand-purple/20">
                            <CardHeader className="py-4 cursor-pointer hover:bg-slate-50 transition-colors">
                                <CardTitle className="text-sm font-medium text-navy-deep">{faq.q}</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-6">
                                <p className="text-xs text-slate-body leading-relaxed">{faq.a}</p>
                            </CardContent>
                        </Card>
                    ))}
                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-12 text-slate-body font-light">No results found for "{search}"</div>
                    )}
                </div>
            </section>
        </div>
    );
}
