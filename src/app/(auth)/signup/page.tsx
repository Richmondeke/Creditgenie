"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, User, ShieldCheck, Mail, Lock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useApplicationStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { UserRole } from "@/lib/types";

export default function SignupPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { signUpWithEmail } = useApplicationStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) return;
        setIsLoading(true);
        setError("");
        try {
            await signUpWithEmail(name, email, password, selectedRole);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-purple/5 via-white to-slate-50/50 overflow-hidden relative">
            
            {/* Background Accents */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-purple/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-navy-deep/5 blur-[100px] rounded-full" />

            <button 
                onClick={() => selectedRole ? setSelectedRole(null) : router.push("/login")}
                className="fixed top-12 left-12 text-[10px] font-normal text-slate-400 hover:text-brand-purple flex items-center gap-2 transition-all uppercase tracking-[0.3em] group z-50"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back
            </button>

            <div className="w-full max-w-xl space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 z-10">
                <div className="text-center space-y-4">
                    <img src="/images/Lydra4.png" alt="Lydraflow Logo" className="w-20 h-20 mx-auto mb-8 object-contain" />
                    <h1 className="text-5xl font-light text-navy-deep tracking-tight-large">Create Account</h1>
                    <p className="text-slate-body text-lg font-light leading-relaxed max-w-xs mx-auto">
                        Choose your account type.
                    </p>
                </div>

                <Card className="bg-white p-16 rounded-[5px] shadow-stripe border border-slate-border relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple/10 via-brand-purple/30 to-brand-purple/10" />
                    
                    {!selectedRole ? (
                        <div className="space-y-6">
                            <button
                                onClick={() => setSelectedRole("USER")}
                                className="w-full p-8 rounded-[4px] border border-slate-border hover:border-brand-purple/30 hover:bg-slate-50/50 transition-all text-left group flex items-center justify-between shadow-stripe-ambient"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-[4px] bg-brand-purple/5 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple/10 transition-colors shadow-stripe-ambient">
                                        <Building2 className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-normal text-navy-deep tracking-tight">Borrower</h3>
                                        <p className="text-sm text-slate-400 mt-1 font-light">Sign up to apply for loans.</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-purple group-hover:translate-x-1 transition-all" />
                            </button>

                            <button
                                onClick={() => setSelectedRole("ADMIN")}
                                className="w-full p-8 rounded-[4px] border border-slate-border hover:border-brand-purple/30 hover:bg-slate-50/50 transition-all text-left group flex items-center justify-between shadow-stripe-ambient"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-[4px] bg-navy-deep/5 flex items-center justify-center text-navy-deep group-hover:bg-navy-deep/10 transition-colors shadow-stripe-ambient">
                                        <ShieldCheck className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-normal text-navy-deep tracking-tight">Admin</h3>
                                        <p className="text-sm text-slate-400 mt-1 font-light">Manage applications.</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-navy-deep group-hover:translate-x-1 transition-all" />
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid gap-6">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-normal text-slate-label uppercase tracking-[0.2em] px-2">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-purple transition-colors" />
                                        <Input required placeholder="John Doe" className="pl-14 h-14 bg-slate-50/50 border border-slate-border rounded-[4px] text-base font-normal focus:ring-2 focus:ring-brand-purple/20 transition-all shadow-stripe-ambient"
                                            value={name} onChange={e => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-normal text-slate-label uppercase tracking-[0.2em] px-2">Work Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-purple transition-colors" />
                                        <Input required type="email" placeholder="name@email.com" className="pl-14 h-14 bg-slate-50/50 border border-slate-border rounded-[4px] text-base font-normal focus:ring-2 focus:ring-brand-purple/20 transition-all shadow-stripe-ambient"
                                            value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-normal text-slate-label uppercase tracking-[0.2em] px-2">Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-purple transition-colors" />
                                        <Input required type="password" placeholder="••••••••" className="pl-14 h-14 bg-slate-50/50 border border-slate-border rounded-[4px] text-base font-normal focus:ring-2 focus:ring-brand-purple/20 transition-all shadow-stripe-ambient"
                                            value={password} onChange={e => setPassword(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-rose-50 rounded-[4px] border border-rose-100 text-xs text-rose-600 font-normal uppercase tracking-widest">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" disabled={isLoading} className="w-full h-14 shadow-stripe-ambient bg-brand-purple hover:bg-brand-purple-hover text-white text-base font-normal rounded-[4px] active:scale-[0.98]">
                                {isLoading ? "Creating..." : `Join as ${selectedRole === "USER" ? "Borrower" : "Admin"}`}
                            </Button>
                        </form>
                    )}
                </Card>

                <div className="text-center pt-8">
                    <p className="text-slate-body font-light">
                        Already have an account? <Link href="/login" className="text-brand-purple font-normal hover:underline underline-offset-4 ml-1 transition-all">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
