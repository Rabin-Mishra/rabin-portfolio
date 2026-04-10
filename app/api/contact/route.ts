import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY || "re_DBRsodjB_8tkLYQi9RCihY7QvCnMnTdY2");

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Simple in-memory rate limiting map (IP -> { count, windowStart })
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour
const MAX_REQUESTS = 3;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    
    // Rate Limiting
    const now = Date.now();
    const limitInfo = rateLimitMap.get(ip);
    
    if (limitInfo && now - limitInfo.windowStart < RATE_LIMIT_WINDOW) {
      if (limitInfo.count >= MAX_REQUESTS) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
      limitInfo.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, windowStart: now });
    }

    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "rabin@rabinmishra.com.np",
      subject: `[Portfolio Contact] ${validatedData.subject} from ${validatedData.name}`,
      reply_to: validatedData.email,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New message from your portfolio</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${validatedData.message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", details: error.errors }, { status: 400 });
    }
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
