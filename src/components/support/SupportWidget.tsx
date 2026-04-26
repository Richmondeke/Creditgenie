"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    X,
    Send,
    Bot,
    User,
    Loader2,
    Sparkles,
    MessageCircle,
    MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "model";
    parts: [{ text: string }];
}

const FAQS = [
    {
        q: "How long does approval take?",
        a: "Standard approval typically takes 24-48 business hours. Tier 1 applications are often processed same-day."
    },
    {
        q: "What documents are required?",
        a: "For all applications, we require valid CAC registration, 6 months bank statements, and director IDs."
    },
    {
        q: "Can I increase my credit limit?",
        a: "Yes! After 3 successful repayments, you can apply for a limit increase through your dashboard settings."
    },
    {
        q: "What is the maximum tenure?",
        a: "Our credit lines have a maximum tenure of 12 months, with flexible monthly repayment options."
    }
];

export function SupportWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"faq" | "ai" | "agent">("faq");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput("");

        const newMessages: Message[] = [
            ...messages,
            { role: "user", parts: [{ text: userMsg }] }
        ];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages
                }),
            });

            const data = await res.json();
            if (data.text) {
                setMessages([
                    ...newMessages,
                    { role: "model", parts: [{ text: data.text }] }
                ]);
            }
        } catch (error) {
            console.error("Chat error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[380px] h-[550px] bg-white rounded-3xl shadow-[0_24px_48px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 border border-slate-100">
                    {/* Header */}
                    <div className="bg-brand-purple p-6 text-white text-center relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg">Lydraflow Support</h3>
                        <p className="text-white/70 text-xs mt-1">We&apos;re here to help you scale</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-slate-50 p-1 mx-4 mt-4 rounded-xl">
                        {(['faq', 'ai', 'agent'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "flex-1 py-2 text-xs font-bold rounded-lg transition-all capitalize",
                                    activeTab === tab
                                        ? "bg-white text-brand-purple shadow-sm"
                                        : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                {tab === 'ai' ? 'AI Chat' : tab === 'faq' ? 'FAQs' : 'Live Agent'}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6" ref={scrollRef}>
                        {activeTab === "faq" && (
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Frequently Asked</p>
                                {FAQS.map((faq, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <p className="text-sm font-bold text-navy-deep group-hover:text-brand-purple transition-colors mb-1">{faq.q}</p>
                                        <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
                                        <div className="h-px bg-slate-50 w-full mt-4" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "ai" && (
                            <div className="space-y-4">
                                {messages.length === 0 && (
                                    <div className="text-center py-8">
                                        <div className="w-12 h-12 bg-brand-purple/5 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Sparkles className="w-6 h-6 text-brand-purple" />
                                        </div>
                                        <p className="text-sm font-bold text-navy-deep">Ask Lydraflow AI</p>
                                        <p className="text-xs text-slate-500 mt-1">Get instant answers about your credit line.</p>
                                    </div>
                                )}
                                {messages.map((msg, i) => (
                                    <div key={i} className={cn(
                                        "flex gap-3",
                                        msg.role === "user" ? "flex-row-reverse" : ""
                                    )}>
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                                            msg.role === "user" ? "bg-slate-100 text-slate-600" : "bg-brand-purple/10 text-brand-purple"
                                        )}>
                                            {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </div>
                                        <div className={cn(
                                            "p-3 rounded-2xl text-xs max-w-[80%] leading-relaxed",
                                            msg.role === "user" ? "bg-slate-50 text-slate-700" : "bg-white border border-slate-100 text-navy-deep"
                                        )}>
                                            {msg.parts[0].text}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center animate-pulse">
                                            <Bot className="w-4 h-4" />
                                        </div>
                                        <div className="p-3 rounded-2xl bg-white border border-slate-100 flex items-center gap-2">
                                            <Loader2 className="w-3 h-3 animate-spin text-brand-purple" />
                                            <span className="text-[10px] font-medium text-slate-400 italic">Thinking...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "agent" && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="w-8 h-8 text-slate-300" />
                                </div>
                                <h4 className="font-bold text-navy-deep">No Agents Online</h4>
                                <p className="text-xs text-slate-500 mt-2 px-10">All our agents are currently helping other businesses. Please use the AI chat or check back later.</p>
                            </div>
                        )}
                    </div>

                    {/* Input (only for AI/Agent) */}
                    {(activeTab === "ai" || activeTab === "agent") && (
                        <div className="p-4 border-t border-slate-50 bg-slate-50/50">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-brand-purple/20 transition-all outline-none"
                                />
                                <button
                                    onClick={handleSend}
                                    className="bg-brand-purple text-white p-2 rounded-xl hover:bg-brand-purple-hover transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110",
                    isOpen ? "bg-slate-800 rotate-90" : "bg-brand-purple animate-bounce"
                )}
                id="support-widget-trigger"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </button>
        </div>
    );
}
