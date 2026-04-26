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
        // Mock CAC lookup
        await new Promise(r => setTimeout(r, 1500));
        setCompanyData({
            name: "Nexus Innovations Ltd",
            address: "12 Admiralty Way, Lekki Phase 1, Lagos",
            directors: [
                { name: "Bolanle Peters", role: "MD" },
                { name: "Chidi Okafor", role: "Director" }
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
            <Link href="/applications/all" className="flex items-center gap-2 text-sm text-slate-body hover:text-navy-deep transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Applications
            </Link>

            <header>
                <h1 className="text-3xl font-light text-navy-deep">New Loan Application</h1>
                <p className="text-slate-body mt-2">Enter the RC Number to autofill company data from the CAC database.</p>
            </header>

            <div className="grid grid-cols-1 gap-8">
                <Card className="stripe-shadow border-none p-8 bg-white">
                    <div className="max-w-md space-y-4">
                        <label className="text-[10px] font-bold text-slate-label uppercase tracking-widest">CAC RC Number</label>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-body/50" />
                                <Input
                                    placeholder="e.g. RC-123456"
                                    className="pl-10 h-12"
                                    value={rcNumber}
                                    onChange={e => setRcNumber(e.target.value)}
                                />
                            </div>
                            <Button onClick={handleSearch} disabled={isSearching} className="h-12 px-6">
                                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Lookup"}
                            </Button>
                        </div>
                    </div>

                    {companyData && (
                        <div className="mt-8 pt-8 border-t border-slate-50 animate-in fade-in slide-in-from-top-2 duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="px-3 py-1 bg-success-green/10 text-success-green text-[10px] font-bold rounded-full uppercase tracking-widest whitespace-nowrap">Verified Entity</div>
                                <span className="text-sm font-semibold text-navy-deep">{companyData.name}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold text-slate-label uppercase tracking-widest">Registered Address</p>
                                    <p className="text-sm text-slate-body leading-relaxed">{companyData.address}</p>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold text-slate-label uppercase tracking-widest">Directors</p>
                                    <div className="flex flex-wrap gap-2">
                                        {companyData.directors.map((d: { name: string }) => (
                                            <span key={d.name} className="px-2 py-1 bg-slate-100 rounded text-[10px] font-medium text-navy-deep">{d.name}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>

                <Card className={cn("stripe-shadow border-none p-8 bg-white transition-opacity duration-500", !companyData && "opacity-50 pointer-events-none")}>
                    <h3 className="text-lg font-semibold text-navy-deep mb-8">Loan Particulars</h3>
                    <form className="space-y-6 max-w-xl" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-label uppercase tracking-widest">Requested Amount (NGN)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-body/50" />
                                    <Input
                                        required
                                        placeholder="2,500,000"
                                        className="pl-10"
                                        value={amount}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-label uppercase tracking-widest">Loan Tenure (Months)</label>
                                <Input
                                    required
                                    placeholder="12"
                                    value={tenure}
                                    onChange={e => setTenure(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-label uppercase tracking-widest">Purpose of Loan</label>
                            <textarea
                                required
                                className="w-full min-h-[100px] bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all font-inter"
                                placeholder="Briefly describe the use of funds..."
                                value={purpose}
                                onChange={e => setPurpose(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="h-12 px-10 shadow-lg shadow-brand-purple/20"
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Submit for Review
                            </Button>
                            <Button variant="ghost" type="button" className="h-12 px-6 text-slate-body">Save Draft</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
