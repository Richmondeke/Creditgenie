"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    CheckCircle2,
    Settings,
    Archive,
    Menu,
    X,
    CreditCard,
    History,
    HelpCircle,
    ShieldCheck,
    PlusCircle,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { useApplicationStore } from "@/lib/store";

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, logout } = useApplicationStore();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    const isAdmin = currentUser?.role && currentUser.role !== "USER";

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard, show: true },
        { name: "Applications", href: "/applications/all", icon: CreditCard, show: true },
        { name: "New", href: "/applications/new", icon: PlusCircle, show: !isAdmin },
        { name: "Reviews", href: "/reviews", icon: CheckCircle2, show: isAdmin },
        { name: "Archive", href: "/archive", icon: Archive, show: isAdmin },
        { name: "Admin", href: "/admin", icon: ShieldCheck, show: isAdmin },
    ];

    const secondaryItems = [
        { name: "Activity", href: "/activity", icon: History },
        { name: "Settings", href: "/settings", icon: Settings },
        { name: "Help", href: "/help", icon: HelpCircle },
    ];

    const filteredNavItems = navItems.filter(item => item.show);

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-white shadow-stripe border border-slate-border rounded-[4px]"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </div>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-navy-deep/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Content */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="h-20 flex items-center px-6 border-b border-slate-border/50">
                        <img src="/images/Lydra4.png" alt="Lydraflow Logo" className="w-20 h-20 object-contain" />
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-8">
                        <div className="space-y-1">
                            <p className="px-4 text-[10px] font-normal text-slate-400 uppercase tracking-[0.2em] mb-4">
                                Menu
                            </p>
                            {filteredNavItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-2 rounded-[4px] transition-all duration-200 group",
                                            isActive
                                                ? "bg-brand-purple/5 text-brand-purple font-normal"
                                                : "text-slate-body hover:bg-slate-50 hover:text-navy-deep font-normal"
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "w-4 h-4 transition-colors",
                                            isActive ? "text-brand-purple" : "text-slate-400 group-hover:text-navy-deep"
                                        )} />
                                        <span className="text-sm">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="space-y-1">
                            <p className="px-4 text-[10px] font-normal text-slate-400 uppercase tracking-[0.2em] mb-4">
                                Other
                            </p>
                            {secondaryItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-2 rounded-[4px] transition-all duration-200 group",
                                            isActive
                                                ? "bg-brand-purple/5 text-brand-purple font-normal"
                                                : "text-slate-body hover:bg-slate-50 hover:text-navy-deep font-normal"
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "w-4 h-4 transition-colors",
                                            isActive ? "text-brand-purple" : "text-slate-400 group-hover:text-navy-deep"
                                        )} />
                                        <span className="text-sm">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-slate-border/50 bg-slate-50/30">
                        <div className="flex items-center gap-3 p-3 rounded-[5px] bg-white border border-slate-border/50 group relative shadow-stripe">
                            <div className="w-8 h-8 rounded-[4px] bg-brand-purple/10 flex items-center justify-center text-xs font-normal text-brand-purple border border-brand-purple/10">
                                {currentUser?.name?.split(' ').map(n => n[0]).join('') || '??'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-normal text-navy-deep truncate tracking-tight">{currentUser?.name || 'Unknown User'}</p>
                                <p className="text-[10px] font-normal text-slate-400 uppercase tracking-widest truncate">{currentUser?.role?.toLowerCase() || 'No Role'}</p>
                            </div>
                            {currentUser && (
                                <button
                                    onClick={handleLogout}
                                    className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-[4px] transition-all"
                                    title="Log out"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
