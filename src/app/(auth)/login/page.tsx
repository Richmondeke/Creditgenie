"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApplicationStore } from "@/lib/store";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithGoogle } = useApplicationStore();

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signInWithGoogle();
            router.push("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Fallback or demo login
        await new Promise(r => setTimeout(r, 1200));
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <Link href="/" className="fixed top-8 left-8 text-sm text-slate-body hover:text-navy-deep flex items-center gap-2 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back home
            </Link>

            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                    <div className="w-36 h-36 rounded-2xl shadow-xl overflow-hidden flex items-center justify-center bg-white mx-auto mb-6">
                        <img src="/images/Lydra4.png" alt="Lydraflow Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-2xl font-light text-navy-deep tracking-tight">Sign in to Lydraflow</h1>
                    <p className="text-sm text-slate-body mt-2">Enter your work credentials to access the dashboard.</p>
                </div>

                <div className="bg-white p-12 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleGoogleSignIn}
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
                                Continue with Google
                            </>
                        )}
                    </Button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-white px-3 text-slate-body/40">Or email</span></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-label uppercase tracking-widest leading-loose">Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-body/50" />
                                <Input required type="email" placeholder="name@company.com" className="pl-10 h-11" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-bold text-slate-label uppercase tracking-widest leading-loose">Password</label>
                                <Link href="#" className="text-[10px] font-bold text-brand-purple hover:underline mb-1">Forgot password?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-body/50" />
                                <Input required type="password" placeholder="••••••••" className="pl-10 h-11" />
                            </div>
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full h-11 shadow-lg shadow-brand-purple/10">
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm pt-8 border-t border-slate-100">
                        <p className="text-sm font-medium">Don&apos;t have an account? <Link href="/signup" className="font-semibold text-brand-purple hover:underline">Get started</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
