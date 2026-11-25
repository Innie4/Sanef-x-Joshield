import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("contact_submissions").insert({
          organization_id: "22222222-2222-2222-2222-222222222222", // SANEF
          name: body.name || body.fullName || "Community Member",
          email: body.email,
          phone: body.phone || null,
          subject: body.programme || body.subject || "Community Outreach",
          message: body.message || "",
          status: "new",
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry delivered to SANEF Community Secretariat.",
      data: {
        ...body,
        receivedAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
