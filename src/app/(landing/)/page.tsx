"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Zap, Building2, Layers, ChevronRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function LandingPage() {
    return (
        <div className="bg-white min-h-screen selection:bg-brand-purple/5">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center text-white font-bold">C</div>
                        <span className="text-xl font-semibold text-navy-deep tracking-tight">Creditgenie</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-body">
                        <Link href="#" className="hover:text-brand-purple transition-colors">Products</Link>
                        <Link href="#" className="hover:text-brand-purple transition-colors">Solutions</Link>
                        <Link href="#" className="hover:text-brand-purple transition-colors">Customers</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-sm font-medium text-slate-body hover:text-navy-deep">Sign in</Link>
                        <Link href="/dashboard">
                            <Button size="sm" className="shadow-violet-200">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                {/* Animated Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none opacity-40">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[80%] bg-gradient-to-br from-brand-purple/30 to-transparent blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[60%] bg-gradient-to-bl from-blue-400/20 to-transparent blur-[100px] rounded-full animate-pulse delay-700" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/5 border border-brand-purple/10 rounded-full text-brand-purple text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <Zap className="w-3 h-3" />
                            Now powered by AI Risk Analysis
                        </div>
                        <h1 className="text-6xl md:text-7xl font-light text-navy-deep leading-[1.05] tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            The operating system for <span className="text-brand-purple font-normal">modern lending.</span>
                        </h1>
                        <p className="text-xl text-slate-body leading-relaxed mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
                            Transform your manual loan processes into a high-velocity approval engine. Creditgenie provides the infra for 4-tier approvals, KYB verification, and automated risk scoring—all in one place.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <Link href="/dashboard">
                                <Button size="lg" className="h-14 px-10 text-lg shadow-xl shadow-brand-purple/20">
                                    Start Building
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Button variant="ghost" size="lg" className="h-14 px-8 text-lg text-slate-body hover:text-navy-deep">
                                <PlayCircle className="w-5 h-5 mr-3 text-brand-purple" />
                                Watch Demo
                            </Button>
                        </div>
                    </div>

                    {/* Floating UI Elements (Clone of top fintech aesthetics) */}
                    <div className="mt-20 relative animate-in fade-in zoom-in duration-1000 scale-95 origin-top">
                        <div className="absolute -top-12 -left-12 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl opacity-50" />
                        <div className="relative bg-white border border-slate-100 rounded-2xl shadow-[0_30px_60px_-12px_rgba(50,50,93,0.25),0_18px_36px_-18px_rgba(0,0,0,0.3)] overflow-hidden">
                            <div className="h-12 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/20" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400/20" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/20" />
                                </div>
                                <div className="mx-auto w-48 h-6 bg-white border border-slate-100 rounded-md shadow-sm flex items-center justify-center">
                                    <span className="text-[10px] text-slate-body font-mono">creditgenie.guava.earth</span>
                                </div>
                            </div>
                            <div className="p-8 grid grid-cols-3 gap-8 h-[400px]">
                                <div className="space-y-4">
                                    <div className="h-8 w-32 bg-slate-100 rounded-lg animate-pulse" />
                                    <div className="h-4 w-full bg-slate-50 rounded animate-pulse" />
                                    <div className="h-4 w-5/6 bg-slate-50 rounded animate-pulse" />
                                    <div className="h-24 w-full border border-slate-100 rounded-xl bg-slate-50/50" />
                                </div>
                                <div className="col-span-2 bg-[#f8fafc] rounded-xl border border-slate-100 p-6">
                                    <div className="flex justify-between items-center mb-10">
                                        <div className="h-10 w-48 bg-white border border-slate-100 rounded-lg shadow-sm" />
                                        <div className="h-6 w-20 bg-success-green/10 text-success-green text-[10px] font-bold rounded-full flex items-center justify-center">ACTIVE</div>
                                    </div>
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="h-12 bg-white border border-slate-100 rounded-lg shadow-sm" />
                                            <div className="h-12 bg-white border border-slate-100 rounded-lg shadow-sm" />
                                        </div>
                                        <div className="h-32 bg-white border border-slate-100 rounded-lg shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-20 border-t border-slate-100 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-[10px] font-bold text-slate-body uppercase tracking-[0.25em] mb-12">Trusted by fast-growing Nigerian startups</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center opacity-40 grayscale contrast-125">
                        <div className="text-xl font-bold italic tracking-tighter">PAYSTACK</div>
                        <div className="text-xl font-bold italic tracking-tighter">MONO</div>
                        <div className="text-xl font-bold italic tracking-tighter">FLUTTERWAVE</div>
                        <div className="text-xl font-bold italic tracking-tighter">KUDA</div>
                        <div className="text-xl font-bold italic tracking-tighter">BAMBOO</div>
                    </div>
                </div>
            </section>

            {/* Features Grid - Mercury & Brex Style */}
            <section className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div>
                            <div className="w-12 h-12 bg-brand-purple/10 rounded-xl flex items-center justify-center text-brand-purple mb-8">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h2 className="text-4xl font-light text-navy-deep leading-tight mb-6">
                                4-Tier Approvals. <br />
                                <span className="text-slate-body">Zero Compromises.</span>
                            </h2>
                            <p className="text-lg text-slate-body leading-relaxed mb-10">
                                Configure complex workflows with ease. From Staff entry to Legal sign-off, every step is tracked with persistent audit logs and instant notifications.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Hierarchical review sequence",
                                    "Conditional logic for risk tiers",
                                    "Digital signatures & audit logs",
                                    "Automated notification triggers"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-navy-deep">
                                        <CheckCircle2 className="w-5 h-5 text-brand-purple" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-6 pt-12">
                                <Card className="stripe-shadow border-none p-6 bg-slate-50">
                                    <Building2 className="w-6 h-6 text-brand-purple mb-4" />
                                    <h4 className="font-semibold text-navy-deep mb-2">Smart KYB</h4>
                                    <p className="text-xs text-slate-body">Instant CAC lookup and director verification.</p>
                                </Card>
                                <Card className="stripe-shadow border-none p-6 bg-slate-900 text-white">
                                    <Zap className="w-6 h-6 text-brand-purple mb-4" />
                                    <h4 className="font-semibold mb-2">Real-time</h4>
                                    <p className="text-xs text-white/60">Live status updates across the entire team.</p>
                                </Card>
                            </div>
                            <div className="space-y-6">
                                <Card className="stripe-shadow border-none p-6 bg-white ring-1 ring-slate-100">
                                    <Layers className="w-6 h-6 text-brand-purple mb-4" />
                                    <h4 className="font-semibold text-navy-deep mb-2">Multi-tenant</h4>
                                    <p className="text-xs text-slate-body">Scale across multiple brands and sub-entities.</p>
                                </Card>
                                <Card className="stripe-shadow border-none p-6 bg-slate-50">
                                    <ChevronRight className="w-6 h-6 text-brand-purple mb-4" />
                                    <h4 className="font-semibold text-navy-deep mb-2">API First</h4>
                                    <p className="text-xs text-slate-body">Integrate with your existing finance stack.</p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Footer - Stripe Style */}
            <section className="py-24 bg-navy-deep relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple rounded-full blur-[120px] -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400 rounded-full blur-[100px] -ml-32 -mb-32" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-8">Ready to modernize your lending?</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/dashboard">
                            <Button size="lg" className="h-14 px-12 text-lg bg-white text-navy-deep hover:bg-slate-50">
                                Get Started Now
                            </Button>
                        </Link>
                        <Button variant="ghost" size="lg" className="h-14 px-10 text-lg text-white hover:bg-white/10 border-white/20">
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-brand-purple rounded flex items-center justify-center text-white font-bold text-xs uppercase">C</div>
                        <span className="text-lg font-semibold text-navy-deep">Creditgenie</span>
                    </div>
                    <div className="flex gap-8 text-sm text-slate-body">
                        <Link href="#" className="hover:text-navy-deep transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-navy-deep transition-colors">LinkedIn</Link>
                        <Link href="#" className="hover:text-navy-deep transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-navy-deep transition-colors">Terms</Link>
                    </div>
                    <p className="text-xs text-slate-body">© 2026 Creditgenie Technologies Ltd. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
