"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Mail, Lock, User, Sparkles, Building2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApplicationStore } from "@/lib/store";
import { UserRole } from "@/lib/types";

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const { signInWithGoogle } = useApplicationStore();

    const handleGoogleSignUp = async () => {
        if (!selectedRole) return;
        setIsLoading(true);
        try {
            await signInWithGoogle(selectedRole);
            router.push("/dashboard");
        } catch (error) {
            console.error("Signup failed:", error);
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) return;
        setIsLoading(true);
        // Fallback or demo signup
        await new Promise(r => setTimeout(r, 1200));
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white to-slate-50">
            <Link href="/" className="fixed top-8 left-8 text-sm text-slate-body hover:text-navy-deep flex items-center gap-2 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back home
            </Link>

            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                    <div className="w-36 h-36 rounded-2xl shadow-xl overflow-hidden flex items-center justify-center bg-white mx-auto mb-6">
                        <img src="/images/Lydra4.png" alt="Lydraflow Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-2xl font-light text-navy-deep tracking-tight">Create your account</h1>
                    <p className="text-sm text-slate-body mt-2">The operating system for modern loan automation.</p>
                </div>

                <div className="bg-white p-12 rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)]">
                    {!selectedRole ? (
                        <div className="space-y-6 animate-in fade-in scale-in-95 duration-300">
                            <div className="text-center space-y-2 mb-8">
                                <h2 className="text-lg font-medium text-navy-deep">Choose your account type</h2>
                                <p className="text-sm text-slate-body">Select the role that best describes you.</p>
                            </div>

                            <div className="grid gap-4">
                                <button
                                    onClick={() => setSelectedRole("USER")}
                                    className="group relative flex flex-col items-start p-5 rounded-2xl border-2 border-slate-100 hover:border-brand-purple hover:bg-brand-purple/[0.02] transition-all text-left"
                                >
                                    <div className="w-10 h-10 bg-brand-purple/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <Building2 className="w-5 h-5 text-brand-purple" />
                                    </div>
                                    <h3 className="font-semibold text-navy-deep">Business Owner</h3>
                                    <p className="text-xs text-slate-body mt-1">Apply for credit and manage your business lending.</p>
                                </button>

                                <button
                                    onClick={() => setSelectedRole("STAFF")}
                                    className="group relative flex flex-col items-start p-5 rounded-2xl border-2 border-slate-100 hover:border-navy-deep hover:bg-navy-deep/[0.02] transition-all text-left"
                                >
                                    <div className="w-10 h-10 bg-navy-deep/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <ShieldCheck className="w-5 h-5 text-navy-deep" />
                                    </div>
                                    <h3 className="font-semibold text-navy-deep">Lydraflow Admin</h3>
                                    <p className="text-xs text-slate-body mt-1">Review applications and manage platform operations.</p>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center justify-between mb-2">
                                <button
                                    onClick={() => setSelectedRole(null)}
                                    className="text-[10px] font-bold text-slate-body hover:text-brand-purple uppercase tracking-widest flex items-center gap-1"
                                >
                                    <ArrowLeft className="w-3 h-3" /> Change Role
                                </button>
                                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-bold text-navy-deep uppercase tracking-widest">
                                        {selectedRole === "USER" ? "Business Owner" : "Admin Account"}
                                    </span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleGoogleSignUp}
                                disabled={isLoading}
                                className="w-full h-11 mb-6 flex items-center justify-center gap-3 border-slate-200"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                    <>
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="currentColor" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94L5.84 14.1z" />
                                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                        </svg>
                                        Sign up with Google
                                    </>
                                )}
                            </Button>

                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-white px-3 text-slate-body/40">Or email</span></div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-label uppercase tracking-widest leading-loose">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-body/50" />
                                        <Input required placeholder="John Doe" className="pl-10 h-11" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-label uppercase tracking-widest leading-loose">Work Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-body/50" />
                                        <Input required type="email" placeholder="name@company.com" className="pl-10 h-11" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-label uppercase tracking-widest leading-loose">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-body/50" />
                                        <Input required type="password" placeholder="••••••••" className="pl-10 h-11" />
                                    </div>
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full h-11 shadow-lg shadow-brand-purple/10">
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Get started"}
                                </Button>
                            </form>
                        </div>
                    )}

                    <div className="mt-8 text-center text-sm pt-8 border-t border-slate-100 font-medium">
                        <span className="text-slate-body">Already have an account? </span>
                        <Link href="/login" className="font-semibold text-brand-purple hover:underline">Sign in</Link>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 text-slate-400">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-border rounded-full text-[10px] font-bold uppercase tracking-widest">
                        <Sparkles className="w-3 h-3 text-brand-purple" />
                        Corporate Access
                    </div>
                </div>
            </div>
        </div>
    );
}
