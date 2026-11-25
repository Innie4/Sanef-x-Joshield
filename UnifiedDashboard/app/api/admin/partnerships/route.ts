import { NextResponse } from "next/server";
import { db } from "@/lib/data-store";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data } = await supabase.from("partnerships").select("*");
        if (data && data.length > 0) {
          const mapped = data.map((row: any) => ({
            id: row.id,
            organizationId: "org-sanef",
            partnerName: row.name,
            partnershipPeriod: row.partnership_period || "2026 – Present",
            partnershipType: row.partnership_type || "Technical Partner",
            jointProjects: [row.profile_summary || "Community Safety Project"],
            contributions: row.contributions_summary || "Operational coordination.",
            outcomes: "Under active execution.",
            status: "Active",
            evidenceCount: 3,
          }));
          return NextResponse.json({ success: true, partnerships: mapped });
        }
      }
    } catch (e) {
      console.error("Error fetching partnerships from Supabase:", e);
    }
  }

  return NextResponse.json({
    success: true,
    partnerships: db.getSANEFPartnerships(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          await supabase.from("partnerships").insert({
            organization_id: "22222222-2222-2222-2222-222222222222",
            name: body.partnerName,
            partnership_type: body.partnershipType,
            partnership_period: body.partnershipPeriod,
            profile_summary: body.contributions,
            contributions_summary: body.contributions,
          });
        }
      } catch (e) {
        console.error("Error creating partnership in Supabase:", e);
      }
    }

    const created = db.createSANEFPartnership(body);
    return NextResponse.json({ success: true, partnership: created });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, ...updates } = await req.json();

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          await supabase
            .from("partnerships")
            .update({
              name: updates.partnerName,
              partnership_type: updates.partnershipType,
              partnership_period: updates.partnershipPeriod,
              contributions_summary: updates.contributions,
            })
            .eq("id", id);
        }
      } catch (e) {
        console.error("Error updating partnership in Supabase:", e);
      }
    }

    const updated = db.updateSANEFPartnership(id, updates);
    return NextResponse.json({ success: true, partnership: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing partner id" }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          await supabase.from("partnerships").delete().eq("id", id);
        }
      } catch (e) {
        console.error("Error deleting partnership in Supabase:", e);
      }
    }

    const deleted = db.deleteSANEFPartnership(id);
    return NextResponse.json({ success: true, deleted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
