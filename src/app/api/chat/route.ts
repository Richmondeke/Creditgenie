import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Chat error:", error);
        return NextResponse.json({ error: "Failed to get response from AI" }, { status: 500 });
    }
}
