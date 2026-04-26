"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApplications } from "@/lib/store"; // Reusing store for mock auth for now

export default function AuthPage() {
    const router = useRouter();
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({ email: "", password: "", name: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate Auth
        await new Promise(r => setTimeout(r, 1500));
        router.push("/dashboard");
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-gradient-to-br from-white to-slate-100">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm text-slate-body hover:text-navy-deep transition-all">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </Link>

            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-brand-purple rounded-xl flex items-center justify-center text-white font-bold mx-auto mb-4 stripe-shadow">C</div>
                    <h1 className="text-2xl font-light text-navy-deep tracking-tight">
                        {mode === "login" ? "Welcome back" : "Create your account"}
                    </h1>
                    <p className="text-slate-body text-sm mt-2">The operating system for modern lending.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-[0_30px_60px_-12px_rgba(50,50,93,0.1),0_18px_36px_-18px_rgba(0,0,0,0.1)] border border-white">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {mode === "signup" && (
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-label uppercase tracking-widest leading-loose">Full Name</label>
                                <Input
                                    required
                                    placeholder="e.g. John Doe"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                        )}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-label uppercase tracking-widest leading-loose">Work Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-body/50" />
                                <Input
                                    required
                                    type="email"
                                    className="pl-10"
                                    placeholder="name@company.com"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-bold text-slate-label uppercase tracking-widest leading-loose">Password</label>
                                {mode === "login" && (
                                    <Link href="#" className="text-[10px] text-brand-purple font-bold hover:underline mb-1">Forgot password?</Link>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-body/50" />
                                <Input
                                    required
                                    type="password"
                                    className="pl-10"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button type="submit" disabled={isLoading} className="w-full h-11 shadow-lg shadow-brand-purple/20">
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : mode === "login" ? "Sign in" : "Get started"}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-border text-center">
                        <p className="text-sm text-slate-body">
                            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                                className="ml-1 font-semibold text-brand-purple hover:underline"
                            >
                                {mode === "login" ? "Sign up" : "Sign in"}
                            </button>
                        </p>
                    </div>
                </div>

                {mode === "signup" && (
                    <div className="mt-8 flex items-center gap-3 justify-center text-slate-body">
                        <div className="px-3 py-1 bg-white border border-slate-border rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="w-3 h-3 text-brand-purple" />
                            Enterprise Access Only
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
