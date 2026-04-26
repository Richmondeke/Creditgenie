"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, logout } = useApplicationStore();

    const isAdmin = currentUser?.role && currentUser.role !== "USER";

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, show: true },
        { name: "My Applications", href: "/applications/all", icon: CreditCard, show: true },
        { name: "New Application", href: "/applications/new", icon: PlusCircle, show: !isAdmin },
        { name: "Reviews", href: "/reviews", icon: CheckCircle2, show: isAdmin },
        { name: "Archive", href: "/archive", icon: Archive, show: isAdmin },
        { name: "Admin Portal", href: "/admin", icon: ShieldCheck, show: isAdmin },
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
                    className="bg-white stripe-shadow border border-slate-border"
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
                    <div className="h-24 flex items-center justify-center px-6 border-b border-slate-border">
                        <div className="w-24 h-24 overflow-hidden flex items-center justify-center flex-shrink-0">
                            <img src="/images/Lydra4.png" alt="Lydraflow Logo" className="w-full h-full object-contain" />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8">
                        <div className="space-y-1">
                            <p className="px-3 text-[10px] font-bold text-slate-body uppercase tracking-[0.1em] mb-4">
                                {isAdmin ? "Internal Menu" : "My Menu"}
                            </p>
                            {filteredNavItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-stripe transition-all duration-200 group",
                                            isActive
                                                ? "bg-brand-purple/5 text-brand-purple font-medium"
                                                : "text-slate-body hover:bg-slate-50 hover:text-navy-deep"
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "w-4 h-4 transition-colors",
                                            isActive ? "text-brand-purple" : "text-slate-body group-hover:text-navy-deep"
                                        )} />
                                        <span className="text-sm">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="space-y-1">
                            <p className="px-3 text-[10px] font-bold text-slate-body uppercase tracking-[0.1em] mb-4">
                                System
                            </p>
                            {secondaryItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-stripe transition-all duration-200 group",
                                            isActive
                                                ? "bg-brand-purple/5 text-brand-purple font-medium"
                                                : "text-slate-body hover:bg-slate-50 hover:text-navy-deep"
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "w-4 h-4 transition-colors",
                                            isActive ? "text-brand-purple" : "text-slate-body group-hover:text-navy-deep"
                                        )} />
                                        <span className="text-sm">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-slate-border">
                        <div className="flex items-center gap-3 p-2 rounded-stripe group relative">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-body">
                                {currentUser?.name?.split(' ').map(n => n[0]).join('') || '??'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-navy-deep truncate">{currentUser?.name || 'Unknown User'}</p>
                                <p className="text-xs text-slate-body truncate italic capitalize">{currentUser?.role?.toLowerCase() || 'No Role'}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 text-slate-body hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                title="Log out"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
