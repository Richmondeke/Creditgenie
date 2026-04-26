"use client";

import React, { useState } from "react";
import { Users, ShieldCheck, Mail, ChevronRight, UserPlus, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type Role = "STAFF" | "TEAM_LEAD" | "CREDIT" | "LEGAL" | "ADMIN";

interface PlatformUser {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: "active" | "invited";
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<PlatformUser[]>([
        { id: "1", name: "John Doe", email: "john@creditgenie.ng", role: "TEAM_LEAD", status: "active" },
        { id: "2", name: "Sarah Alabi", email: "sarah@creditgenie.ng", role: "CREDIT", status: "active" },
        { id: "3", name: "Tunde Ednut", email: "tunde@creditgenie.ng", role: "STAFF", status: "active" },
        { id: "4", name: "Legal Pro", email: "legal@creditgenie.ng", role: "LEGAL", status: "invited" },
    ]);

    const updateRole = (id: string, role: Role) => {
        setUsers(users.map(u => u.id === id ? { ...u, role } : u));
    };

    const getRoleColor = (role: Role) => {
        switch (role) {
            case "ADMIN": return "bg-red-500";
            case "LEGAL": return "bg-navy-deep";
            case "CREDIT": return "bg-brand-purple";
            case "TEAM_LEAD": return "bg-success-green";
            default: return "bg-slate-body";
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto w-full">
            <header className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-light text-navy-deep">User Management</h1>
                    <p className="text-slate-body mt-2">Manage team roles and approval tier authorizations.</p>
                </div>
                <Button className="shadow-lg shadow-brand-purple/10">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Member
                </Button>
            </header>

            <div className="grid grid-cols-1 gap-8">
                {/* Tier Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: "Approval Leads", count: 12, icon: ShieldCheck, color: "text-success-green" },
                        { label: "Credit Analysts", count: 8, icon: ShieldAlert, color: "text-brand-purple" },
                        { label: "Legal Counsel", count: 3, icon: Users, color: "text-navy-deep" },
                        { label: "Platform Admins", count: 2, icon: ShieldCheck, color: "text-red-500" },
                    ].map((stat, i) => (
                        <Card key={i} className="stripe-shadow border-none p-6">
                            <stat.icon className={cn("w-6 h-6 mb-4", stat.color)} />
                            <p className="text-2xl font-semibold text-navy-deep">{stat.count}</p>
                            <p className="text-xs text-slate-body font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                        </Card>
                    ))}
                </div>

                {/* User Table */}
                <Card className="stripe-shadow border-none overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-border">
                                    <th className="px-8 py-4 text-[10px] font-bold text-slate-label uppercase tracking-widest">User Details</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-slate-label uppercase tracking-widest">Platform Role</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-slate-label uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-slate-label uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-all">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm", getRoleColor(user.role))}>
                                                    {user.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-navy-deep">{user.name}</p>
                                                    <p className="text-xs text-slate-body">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <select
                                                className="bg-transparent text-xs font-semibold text-navy-deep focus:outline-none cursor-pointer border border-slate-200 rounded px-2 py-1 hover:border-brand-purple transition-colors"
                                                value={user.role}
                                                onChange={(e) => updateRole(user.id, e.target.value as Role)}
                                            >
                                                <option value="STAFF">Staff</option>
                                                <option value="TEAM_LEAD">Team Lead</option>
                                                <option value="CREDIT">Credit Analyst</option>
                                                <option value="LEGAL">Legal Counsel</option>
                                                <option value="ADMIN">Administrator</option>
                                            </select>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Badge variant={user.status === "active" ? "success" : "info"}>
                                                {user.status === "active" ? (
                                                    <span className="flex items-center gap-1"><CheckCircle2 className="w-2 h-2" /> Active</span>
                                                ) : "Invited"}
                                            </Badge>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <Button variant="ghost" size="sm" className="text-brand-purple hover:bg-brand-purple/5">Edit Permissions</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
