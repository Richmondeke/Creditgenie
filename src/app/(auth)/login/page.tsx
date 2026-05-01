"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Mail, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useApplicationStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signInWithGoogle, signInWithEmail, currentUser, authLoading } = useApplicationStore();

    useEffect(() => {
        if (!authLoading && currentUser) {
            router.replace("/dashboard");
        }
    }, [currentUser, authLoading, router]);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError("");
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Login failed:", error);
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await signInWithEmail(email, password);
        } catch (err: unknown) {
            const code = (err as { code?: string }).code;
            if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
                setError("Invalid email or password.");
            } else if (code === "auth/too-many-requests") {
                setError("Too many attempts. Please try again later.");
            } else {
                setError("Sign in failed. Please try again.");
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand-purple/5 via-white to-slate-50/50 overflow-hidden relative">
            
            {/* Background Accents */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-purple/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-navy-deep/5 blur-[100px] rounded-full" />

            <Link href="/" className="fixed top-12 left-12 text-[10px] font-normal text-slate-400 hover:text-brand-purple flex items-center gap-2 transition-all uppercase tracking-[0.3em] group z-50">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back
            </Link>

            <div className="w-full max-w-xl space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 z-10">
                <div className="text-center space-y-4">
                    <img src="/images/Lydra4.png" alt="Lydraflow Logo" className="w-20 h-20 mx-auto mb-8 object-contain" />
                    <h1 className="text-5xl font-light text-navy-deep tracking-tight-large">Log in</h1>
                    <p className="text-slate-body text-lg font-light leading-relaxed max-w-xs mx-auto">
                        Sign in to your account.
                    </p>
                </div>

                <Card className="bg-white p-16 rounded-[5px] shadow-stripe border border-slate-border relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple/10 via-brand-purple/30 to-brand-purple/10" />
                    
                    <div className="space-y-10">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full h-14 rounded-[4px] flex items-center justify-center gap-4 bg-white border border-slate-border shadow-stripe-ambient hover:bg-slate-50 transition-all active:scale-[0.98] font-normal text-navy-deep"
                        >
                            {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-brand-purple" /> : (
                                <>
                                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94L5.84 14.1z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                    </svg>
                                    Sign in with Google
                                </>
                            )}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-border"></div></div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.4em] font-normal text-slate-300"><span className="bg-white px-6">Or</span></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid gap-6">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-normal text-slate-label uppercase tracking-[0.2em] px-2">Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-purple transition-colors" />
                                        <Input required type="email" placeholder="name@email.com" className="pl-14 h-14 bg-slate-50/50 border border-slate-border rounded-[4px] text-base font-normal focus:ring-2 focus:ring-brand-purple/20 transition-all shadow-stripe-ambient"
                                            value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center px-2">
                                        <label className="text-[11px] font-normal text-slate-label uppercase tracking-[0.2em]">Password</label>
                                        <Link href="#" className="text-[10px] font-normal text-brand-purple hover:underline underline-offset-4 tracking-widest uppercase">Forgot?</Link>
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-purple transition-colors" />
                                        <Input required type="password" placeholder="••••••••" className="pl-14 h-14 bg-slate-50/50 border border-slate-border rounded-[4px] text-base font-normal focus:ring-2 focus:ring-brand-purple/20 transition-all shadow-stripe-ambient"
                                            value={password} onChange={e => setPassword(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            
                            {error && (
                                <div className="p-4 bg-rose-50 rounded-[4px] border border-rose-100 flex items-center gap-3">
                                    <Zap className="w-4 h-4 text-rose-500" />
                                    <p className="text-xs text-rose-600 font-normal uppercase tracking-widest">{error}</p>
                                </div>
                            )}

                            <Button type="submit" disabled={isLoading} className="w-full h-14 shadow-stripe-ambient bg-brand-purple hover:bg-brand-purple-hover text-white text-base font-normal rounded-[4px] active:scale-[0.98]">
                                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Log in"}
                            </Button>
                        </form>
                    </div>
                </Card>

                <div className="text-center pt-8">
                    <p className="text-slate-body font-light">
                        Don't have an account? <Link href="/signup" className="text-brand-purple font-normal hover:underline underline-offset-4 ml-1 transition-all">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
