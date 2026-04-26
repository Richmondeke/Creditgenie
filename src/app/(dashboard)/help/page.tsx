"use client";

import React from "react";
import { HelpCircle, Search, Mail, MessageSquare, Book, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function HelpPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500">
            <header className="text-center space-y-4">
                <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple mx-auto animate-bounce">
                    <HelpCircle className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-light text-navy-deep tracking-tight">How can we help?</h1>
                <p className="text-slate-body max-w-lg mx-auto">Browse our documentation or get in touch with our team for personalized support.</p>

                <div className="max-w-xl mx-auto relative mt-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-body/50" />
                    <Input placeholder="Search help articles..." className="pl-12 h-14 bg-white shadow-xl shadow-slate-200/50 rounded-2xl border-none text-lg" />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: "Platform Basics", desc: "Learn how to use the dashboard and manage applications.", icon: Book },
                    { title: "Role-Based Access", desc: "Understand approval tiers and user permissions.", icon: ArrowRight },
                    { title: "KYB Integration", desc: "Details on CAC lookups and automated verification.", icon: Search },
                    { title: "Notifications", desc: "Managing app alerts and real-time status updates.", icon: ArrowRight },
                ].map((guide, i) => (
                    <Card key={i} className="stripe-shadow border-none p-6 bg-white hover:translate-y-[-4px] transition-all cursor-pointer group">
                        <guide.icon className="w-5 h-5 text-brand-purple mb-4" />
                        <h3 className="text-lg font-semibold text-navy-deep group-hover:text-brand-purple transition-colors">{guide.title}</h3>
                        <p className="text-sm text-slate-body mt-2 leading-relaxed">{guide.desc}</p>
                    </Card>
                ))}
            </div>

            <Card className="bg-navy-deep text-white p-10 border-none rounded-3xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/20 blur-[100px] rounded-full" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Still need assistance?</h2>
                        <p className="text-white/60">Our support engineers are available Monday to Friday, 9AM—6PM WAT.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-brand-purple rounded-xl font-bold text-sm shadow-lg shadow-brand-purple/20">
                            <MessageSquare className="w-4 h-4" />
                            Live Chat
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors">
                            <Mail className="w-4 h-4" />
                            Email Us
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
