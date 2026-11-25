import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const seq = Math.floor(1000 + Math.random() * 8999);
    const applicantId = `JS-APP-2026-${seq}`;

    // If Supabase is configured, persist to database
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("job_applications").insert({
          organization_id: "11111111-1111-1111-1111-111111111111", // JossyShield tenant
          applicant_name: body.fullName || body.name || "Candidate",
          email: body.email || "applicant@local.domain",
          phone: body.phone || "N/A",
          experience_years: parseInt(body.experience) || 1,
          pipeline_status: "new",
          notes: `Applied for: ${body.role || "General Guard Pool"}. Qualifications: ${body.qualifications || "Standard"}. Availability: ${body.availability || "Immediate"}`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      applicantId,
      pipelineStatus: "New Application",
      message: "Application logged in JossyShield recruitment pipeline.",
      data: {
        ...body,
        applicantId,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to submit application" },
      { status: 500 }
    );
  }
}
