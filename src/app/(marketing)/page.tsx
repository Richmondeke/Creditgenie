"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, PlayCircle, Building2, Layers, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="bg-white min-h-screen text-slate-800">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-16 h-16 md:w-24 md:h-24 overflow-hidden flex items-center justify-center flex-shrink-0">
                            <img src="/images/Lydra4.png" alt="Lydraflow Logo" className="w-full h-full object-contain" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-6">
                        <Link href="/login" className="text-sm font-medium text-slate-500 hover:text-navy-deep transition-colors whitespace-nowrap">Sign in</Link>
                        <Link href="/signup">
                            <Button size="sm" className="hidden xs:inline-flex">Get Started</Button>
                            <Button size="sm" className="xs:hidden">Join</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <section className="pt-40 pb-0 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16 items-center text-center">
                    <div className="max-w-3xl flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/5 border border-brand-purple/10 rounded-full text-brand-purple text-xs font-bold uppercase tracking-widest mb-8">
                            <Zap className="w-3 h-3" />
                            Join early access
                        </div>
                        <h1 className="text-5xl md:text-6xl font-light text-navy-deep leading-tight tracking-tight mb-8">
                            The operating system for <span className="text-brand-purple font-normal">loan automation.</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl">
                            Transform your manual loan processes into an automated approval engine. Lydraflow provides the infrastructure for 4-tier approvals, KYB verification, and automated risk scoring—all in one premium platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/signup">
                                <Button size="lg" className="h-12 px-8 text-md shadow-lg shadow-brand-purple/20">
                                    Get Started
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Button variant="ghost" size="lg" className="h-12 px-8 text-md text-slate-500">
                                <PlayCircle className="w-5 h-5 mr-3 text-brand-purple" />
                                Watch Demo
                            </Button>
                        </div>
                    </div>
                    <div className="relative z-10 self-end max-w-5xl mx-auto">
                        {/* Hero Image / GIF */}
                        <img
                            src="/images/KYC.gif"
                            alt="Lydraflow Interface"
                            className="w-full h-auto scale-95 origin-bottom translate-y-2 animate-in fade-in slide-in-from-bottom-8 duration-1000"
                        />
                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-purple/10 rounded-full blur-3xl opacity-30" />
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-purple/10 rounded-full blur-3xl opacity-30" />
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                        {[
                            { title: "Smart KYB", desc: "Instant CAC lookup and director verification for all applications using RC Numbers.", icon: Building2 },
                            { title: "Tiered Approvals", desc: "4-tier workflow from Staff entry to Legal sign-off with persistent audit logs.", icon: ShieldCheck },
                            { title: "API First", desc: "Easily integrate with your existing fintech stack and automate internal notifications.", icon: Layers },
                        ].map((benefit, i) => (
                            <div key={i} className="space-y-4">
                                <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-brand-purple mx-auto md:mx-0 shadow-sm transition-transform hover:scale-110">
                                    <benefit.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-navy-deep">{benefit.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-32 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-light text-navy-deep mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-500">Everything you need to know about the Lydraflow platform.</p>
                    </div>
                    <div className="space-y-4">
                        {[
                            {
                                q: "What is Lydraflow?",
                                a: "Lydraflow is a loan automation operating system designed to streamline your lending processes, from application to disbursement."
                            },
                            {
                                q: "How does the 4-tier approval work?",
                                a: "Our system allows for sequential sign-offs across Staff, Manager, Credit Risk, and Legal departments, ensuring every loan meets your internal compliance standards."
                            },
                            {
                                q: "Can I integrate with my existing CRM?",
                                a: "Yes, Lydraflow is built with an API-first mindset, allowing seamless integration with Salesforce, HubSpot, and other popular fintech tools."
                            },
                            {
                                q: "Is my data secure?",
                                a: "Absolutely. We use bank-grade encryption and persistent audit logs to ensure your data and processes remain secure and compliant."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                                >
                                    <span className="text-lg font-medium text-navy-deep">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-8 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-light text-navy-deep mb-8 max-w-2xl mx-auto leading-tight">
                        Ready to Automate your <span className="text-brand-purple font-normal underline decoration-brand-purple/20 underline-offset-8">lending process?</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/signup">
                            <Button size="lg" className="h-14 px-12 text-lg shadow-xl shadow-brand-purple/20">Get Started Now</Button>
                        </Link>
                        <Button variant="ghost" size="lg" className="h-14 px-10 text-lg text-slate-500">Contact Sales</Button>
                    </div>
                </div>
            </section >

            {/* Footer */}
            <footer className="py-12 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center">
                        <div className="w-18 h-18 rounded flex items-center justify-center overflow-hidden bg-white">
                            <img src="/images/Lydra4.png" alt="Lydraflow" className="w-full h-full object-contain" />
                        </div>
                    </div>
                    <div className="flex gap-8 text-sm text-slate-400">
                        <Link href="#" className="hover:text-navy-deep transition-colors">Documentation</Link>
                        <Link href="#" className="hover:text-navy-deep transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-navy-deep transition-colors">Terms of Service</Link>
                    </div>
                    <p className="text-xs text-slate-400">© 2026 Lydraflow Technologies Ltd.</p>
                </div>
            </footer>
        </div >
    );
}
