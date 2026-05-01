"use client";

import React, { useState } from "react";
import { ArrowLeft, Building2, Loader2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useApplicationStore } from "@/lib/store";

export default function NewApplication() {
    const router = useRouter();
    const [isSearching, setIsSearching] = useState(false);
    const [rcNumber, setRcNumber] = useState("");
    const [companyData, setCompanyData] = useState<{ name: string; address: string; directors: { name: string; role: string }[] } | null>(null);
    const { addApplication } = useApplicationStore();
    const [amount, setAmount] = useState("");
    const [tenure, setTenure] = useState("");
    const [purpose, setPurpose] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSearch = async () => {
        if (!rcNumber) return;
        setIsSearching(true);
        // Simulate real API lookup delay
        await new Promise(r => setTimeout(r, 1000));
        setCompanyData({
            name: `Company registered as ${rcNumber}`,
            address: "Verified registration address",
            directors: [
                { name: "Primary Director", role: "MD" },
            ]
        });
        setIsSearching(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!companyData || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await addApplication({
                applicantName: companyData.name,
                rcNumber: rcNumber,
                companyAddress: companyData.address,
                directors: companyData.directors,
                amount: Number(amount.replace(/,/g, "")),
                tenure: Number(tenure),
                purpose: purpose,
                industry: "Technology", // Mock fetched industry
                documents: [], // Handle uploads separately if needed
            });
            router.push("/applications/all");
        } catch (error) {
            console.error("Submission error:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Link href="/applications/all" className="flex items-center gap-2 text-sm text-slate-body hover:text-navy-deep transition-colors font-normal">
                <ArrowLeft className="w-4 h-4" />
                Back to Applications
            </Link>

            <header className="space-y-2">
                <h1 className="text-4xl font-light text-navy-deep tracking-tight-large">New Application</h1>
                <p className="text-slate-body text-base max-w-lg leading-relaxed font-light">Enter your RC Number to verify your business and start your application.</p>
            </header>

            <div className="grid grid-cols-1 gap-8">
                <Card className="p-8 bg-white shadow-stripe border-slate-border rounded-[5px]">
                    <div className="max-w-md space-y-4">
                        <label className="text-[10px] font-normal text-slate-label uppercase tracking-widest">Business RC Number</label>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                <Input
                                    placeholder="e.g. RC-123456"
                                    className="pl-10 h-12 rounded-[4px] bg-white border border-slate-border shadow-stripe-ambient font-normal"
                                    value={rcNumber}
                                    onChange={e => setRcNumber(e.target.value)}
                                />
                            </div>
                            <Button onClick={handleSearch} disabled={isSearching} className="h-12 px-6 rounded-[4px] shadow-stripe-ambient font-normal">
                                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
                            </Button>
                        </div>
                    </div>

                    {companyData && (
                        <div className="mt-8 pt-8 border-t border-slate-border animate-in fade-in slide-in-from-top-2 duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="px-3 py-1 bg-success-green/10 text-success-green text-[10px] font-normal rounded-full uppercase tracking-widest whitespace-nowrap">Verified</div>
                                <span className="text-sm font-normal text-navy-deep">{companyData.name}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-normal text-slate-label uppercase tracking-widest">Address</p>
                                    <p className="text-sm text-slate-body leading-relaxed font-light">{companyData.address}</p>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[10px] font-normal text-slate-label uppercase tracking-widest">Directors</p>
                                    <div className="flex flex-wrap gap-2">
                                        {companyData.directors.map((d: { name: string }) => (
                                            <span key={d.name} className="px-3 py-1 bg-white border border-slate-border rounded-[4px] text-[10px] font-normal text-navy-deep uppercase tracking-wider shadow-stripe-ambient">{d.name}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>

                <Card className={cn("p-8 bg-white transition-all duration-500 shadow-stripe border-slate-border rounded-[5px]", !companyData && "opacity-40 grayscale pointer-events-none")}>
                    <h3 className="text-xl font-normal text-navy-deep mb-8 tracking-tight">Loan Details</h3>
                    <form className="space-y-6 max-w-xl" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-normal text-slate-label uppercase tracking-widest">Amount (NGN)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                    <Input
                                        required
                                        placeholder="2,500,000"
                                        className="pl-10 rounded-[4px] h-12 bg-white border border-slate-border shadow-stripe-ambient font-normal"
                                        value={amount}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-normal text-slate-label uppercase tracking-widest">Tenure (Months)</label>
                                <Input
                                    required
                                    placeholder="12"
                                    className="rounded-[4px] h-12 bg-white border border-slate-border shadow-stripe-ambient font-normal"
                                    value={tenure}
                                    onChange={e => setTenure(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-normal text-slate-label uppercase tracking-widest">Why do you need this loan?</label>
                            <textarea
                                required
                                className="w-full min-h-[120px] bg-white border border-slate-border rounded-[4px] p-4 text-sm text-navy-deep focus:outline-none focus:ring-1 focus:ring-brand-purple/20 transition-all font-normal shadow-stripe-ambient"
                                placeholder="Tell us more..."
                                value={purpose}
                                onChange={e => setPurpose(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="h-12 px-10 shadow-stripe-ambient rounded-[4px] font-normal"
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Submit
                            </Button>
                            <Button variant="ghost" type="button" className="h-12 px-6 text-slate-body font-normal hover:bg-slate-50 rounded-[4px]">Save</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
