import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const referenceId = `SANEF-DON-${Math.floor(10000 + Math.random() * 90000)}`;

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        // Record contact or donor ledger record
        await supabase.from("contact_submissions").insert({
          organization_id: "22222222-2222-2222-2222-222222222222", // SANEF
          name: body.donorName || "Supporter",
          email: body.email || "donor@pledge.local",
          phone: body.phone || null,
          subject: `Donation Pledge [${referenceId}]: ${body.campaign || "Community Infrastructure"} (${body.amount || "$50"})`,
          message: `Pledge Reference: ${referenceId}. Method: ${body.paymentMethod || "Bank Transfer"}. Notes: ${body.notes || "None"}`,
          status: "new",
        });
      }
    }

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Donation pledge logged successfully.",
      data: {
        ...body,
        referenceId,
        loggedAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to record donation" },
      { status: 500 }
    );
  }
}
