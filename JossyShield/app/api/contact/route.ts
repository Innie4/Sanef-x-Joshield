import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("contact_submissions").insert({
          organization_id: "11111111-1111-1111-1111-111111111111", // JossyShield
          name: body.name || body.fullName || "Visitor",
          email: body.email,
          phone: body.phone || null,
          subject: body.service || body.subject || "Security Inquiries",
          message: body.message || "",
          status: "new",
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message received by JossyShield operations dispatch.",
      data: {
        ...body,
        receivedAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to submit contact message" },
      { status: 500 }
    );
  }
}
