import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const seq = Math.floor(1000 + Math.random() * 8999);
    const referenceNumber = `JS-REQ-2026-${seq}`;

    // If Supabase is configured, persist to database
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("marketplace_requests").insert({
          organization_id: "11111111-1111-1111-1111-111111111111", // JossyShield tenant
          reference_number: referenceNumber,
          service_type: body.serviceType || body.service || "Commercial Security",
          client_name: body.fullName || body.name || body.organisation || "Client Requisition",
          company_name: body.organisation || body.company || null,
          email: body.email || "client@request.local",
          phone: body.phone || "N/A",
          location: body.location || "Lagos, Nigeria",
          details_json: body,
          status: "new",
        });
      }
    }

    return NextResponse.json({
      success: true,
      referenceNumber,
      status: "New",
      message: "Service request recorded in Josie Shield operations queue.",
      data: {
        ...body,
        referenceNumber,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process service request" },
      { status: 500 }
    );
  }
}
