"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FileText,
    LayoutDashboard,
    CheckCircle2,
    Settings,
    Archive,
    Menu,
    X,
    CreditCard,
    History,
    HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Applications", href: "/applications/all", icon: CreditCard },
    { name: "Reviews", href: "/reviews", icon: CheckCircle2 },
    { name: "Archive", href: "/archive", icon: Archive },
];

const secondaryItems = [
    { name: "Activity", href: "/activity", icon: History },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

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
                    <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-border">
                        <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-semibold tracking-tight text-navy-deep">Creditgenie</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8">
                        <div className="space-y-1">
                            <p className="px-3 text-[10px] font-bold text-slate-body uppercase tracking-[0.1em] mb-4">
                                Main Menu
                            </p>
                            {navItems.map((item) => {
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
                        <div className="flex items-center gap-3 p-2 rounded-stripe hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-body">
                                JD
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-navy-deep truncate">John Doe</p>
                                <p className="text-xs text-slate-body truncate italic">Admin Staff</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
