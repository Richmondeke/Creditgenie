"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Search, Building2, UserCircle2, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useApplications } from "@/lib/store";
import { cn } from "@/lib/utils";

// Mock KYB Data
const MOCK_COMPANIES: Record<string, any> = {
    "RC123456": {
        name: "TechNova Solutions Ltd",
        address: "15 Admiralty Way, Lekki Phase 1, Lagos",
        directors: [
            { name: "Chinedu Okechukwu", role: "Managing Director" },
            { name: "Sarah Alabi", role: "Technical Director" }
        ]
    },
    "RC789012": {
        name: "GreenField Agriculture Co.",
        address: "Km 12, Ibadan-Ife Expressway, Oyo State",
        directors: [
            { name: "Baba Tunde", role: "Chairman" },
            { name: "Olumide Johnson", role: "COO" }
        ]
    }
};

export default function NewApplication() {
    const router = useRouter();
    const { addApplication } = useApplications();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLookingUp, setIsLookingUp] = useState(false);
    const [lookupSuccess, setLookupSuccess] = useState(false);

    const [form, setForm] = useState({
        applicantName: "",
        rcNumber: "",
        companyAddress: "",
        amount: "",
        purpose: "",
        directors: [] as Array<{ name: string; role: string }>,
    });

    const handleLookup = async () => {
        if (!form.rcNumber) return;
        setIsLookingUp(true);
        setLookupSuccess(false);

        // Simulate API delay
        await new Promise(r => setTimeout(r, 1500));

        const company = MOCK_COMPANIES[form.rcNumber.toUpperCase()];
        if (company) {
            setForm({
                ...form,
                applicantName: company.name,
                companyAddress: company.address,
                directors: company.directors
            });
            setLookupSuccess(true);
        } else {
            alert("Company details not found for this RC Number. You can still fill the form manually.");
        }
        setIsLookingUp(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 1000));

        addApplication({
            applicantName: form.applicantName,
            rcNumber: form.rcNumber,
            companyAddress: form.companyAddress,
            directors: form.directors,
            amount: parseFloat(form.amount),
            purpose: form.purpose,
            documents: [{ name: "CAC Certificate.pdf", url: "#" }, { name: "Board Resolution.pdf", url: "#" }],
        });

        router.push("/");
    };

    return (
        <div className="p-8 max-w-3xl mx-auto w-full">
            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-8 -ml-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Button>

            <div className="space-y-6">
                {/* Smart Lookup Box */}
                <Card className="border-none stripe-shadow bg-brand-purple text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                    <CardContent className="p-8 relative z-10">
                        <h3 className="text-xl font-light mb-2 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-300" />
                            Smart Company Lookup
                        </h3>
                        <p className="text-white/70 text-sm mb-6">Enter a Nigerian RC Number to instantly fetch company and director records.</p>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                                <input
                                    type="text"
                                    placeholder="e.g. RC123456"
                                    className="w-full bg-white/10 border border-white/20 rounded-stripe h-11 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-mono uppercase tracking-wider"
                                    value={form.rcNumber}
                                    onChange={e => setForm({ ...form, rcNumber: e.target.value })}
                                    onKeyDown={e => e.key === 'Enter' && handleLookup()}
                                />
                            </div>
                            <Button
                                onClick={handleLookup}
                                disabled={isLookingUp}
                                className="bg-white text-brand-purple hover:bg-slate-50 border-none shadow-xl h-11 px-8 font-semibold"
                            >
                                {isLookingUp ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Details"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="stripe-shadow border-none">
                    <CardHeader className="border-b border-slate-border pb-6">
                        <CardTitle className="text-2xl font-light">Application Details</CardTitle>
                        <p className="text-slate-body text-sm font-light">Review and complete the loan request information.</p>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-8 py-8">
                            {/* Basic Details */}
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-bold text-slate-body uppercase tracking-[0.2em]">Company Profile</h4>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-label uppercase tracking-wider">Registered Company Name</label>
                                        <Input
                                            required
                                            placeholder="e.g. Acme Africa Ltd"
                                            value={form.applicantName}
                                            onChange={e => setForm({ ...form, applicantName: e.target.value })}
                                            className={cn(lookupSuccess && "border-success-green bg-success-green/[0.02]")}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-label uppercase tracking-wider">Loan Amount ($)</label>
                                        <Input
                                            required
                                            type="number"
                                            placeholder="0.00"
                                            value={form.amount}
                                            onChange={e => setForm({ ...form, amount: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-label uppercase tracking-wider">Official Address</label>
                                    <Input
                                        placeholder="Headquarters location"
                                        value={form.companyAddress}
                                        onChange={e => setForm({ ...form, companyAddress: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Directors Section */}
                            {form.directors.length > 0 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <h4 className="text-[10px] font-bold text-slate-body uppercase tracking-[0.2em] flex items-center gap-2">
                                        <UserCircle2 className="w-3 h-3" />
                                        Verified Directors
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {form.directors.map((d, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 bg-[#f8fafc] border border-slate-border rounded-stripe">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-body">
                                                    {d.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-navy-deep">{d.name}</p>
                                                    <p className="text-[10px] text-slate-body uppercase tracking-wider">{d.role}</p>
                                                </div>
                                                <CheckCircle2 className="w-4 h-4 text-success-green ml-auto" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-label uppercase tracking-wider">Purpose of Loan</label>
                                <textarea
                                    required
                                    className="flex min-h-[100px] w-full rounded-stripe border border-slate-border bg-white px-3 py-2 text-sm text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/20 transition-all shadow-sm"
                                    placeholder="Detail the reason for this loan request..."
                                    value={form.purpose}
                                    onChange={e => setForm({ ...form, purpose: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-label uppercase tracking-wider">Mandatory Uploads</label>
                                <div className="border-2 border-dashed border-slate-border rounded-stripe p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <Upload className="w-6 h-6 text-slate-body mx-auto mb-3 group-hover:text-brand-purple transition-all" />
                                    <p className="text-sm font-medium text-navy-deep">Drop CAC documents here</p>
                                    <p className="text-xs text-slate-body mt-1">Maximum file size: 5MB</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-[#f8fafc] border-t border-slate-border flex justify-end gap-3 py-4 rounded-b-stripe">
                            <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Proceed to Review"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
