"use client";

import React from "react";
import Link from "next/link";
import { Plus, Clock, CheckCircle2, FileText, ChevronRight, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { useApplications } from "@/lib/store";
import { ApplicationStatus } from "@/lib/types";

export default function Dashboard() {
  const { applications, isLoading } = useApplications();

  const getStatusVariant = (status: ApplicationStatus) => {
    switch (status) {
      case "APPROVED": return "success";
      case "REJECTED": return "error";
      case "DRAFT": return "neutral";
      case "PENDING_TEAM_LEAD":
      case "PENDING_CREDIT":
      case "PENDING_LEGAL":
        return "info";
      default: return "neutral";
    }
  };

  const getStatusLabel = (status: ApplicationStatus) => {
    return status.replace(/_/g, " ");
  };

  const stats = [
    { label: "Total Applications", value: applications.length, icon: FileText, color: "text-brand-purple" },
    { label: "Pending Review", value: applications.filter(a => a.status.startsWith("PENDING")).length, icon: Clock, color: "text-amber-500" },
    { label: "Approved Loans", value: applications.filter(a => a.status === "APPROVED").length, icon: CheckCircle2, color: "text-success-green" },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Header Placeholder / Search */}
      <div className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-border sticky top-0 z-10">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-body" />
          <Input className="pl-10 h-9 bg-slate-50 border-none" placeholder="Search applications..." />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5 text-slate-body" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          <Link href="/applications/new">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Loan
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2">Loan Overview</h1>
          <p className="text-slate-body">Monitor and manage all incoming loan applications across the 4-tier chain.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} elegant={false} className="ambient-shadow border-none">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-body mb-1">{stat.label}</p>
                  <p className="text-3xl font-light text-navy-deep">{stat.value}</p>
                </div>
                <div className={`${stat.color} bg-current/10 p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Applications Table */}
        <Card className="overflow-hidden border-none stripe-shadow">
          <div className="px-6 py-4 border-b border-slate-border bg-white flex justify-between items-center">
            <h2 className="text-lg font-medium text-navy-deep">Active Applications</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Export</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f8fafc] text-xs font-semibold text-slate-body uppercase tracking-wider">
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4">Current Stage</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-border">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4 h-16 bg-slate-50/50"></td>
                      <td className="px-6 py-4 h-16 bg-slate-50/50"></td>
                      <td className="px-6 py-4 h-16 bg-slate-50/50"></td>
                      <td className="px-6 py-4 h-16 bg-slate-50/50"></td>
                      <td className="px-6 py-4 h-16 bg-slate-50/50"></td>
                    </tr>
                  ))
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-body font-light italic">
                      No loan applications detected in the system.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-medium text-navy-deep">{app.applicantName}</div>
                        <div className="text-xs text-slate-body">{app.purpose}</div>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-navy-deep tabular-nums">
                        ${app.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={getStatusVariant(app.status)}>
                          {getStatusLabel(app.status)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-body">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/applications/${app.id}`}>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            Details <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
