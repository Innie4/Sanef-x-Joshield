import { NextResponse } from "next/server";
import { db } from "@/lib/data-store";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("organizationId");

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        let query = supabase.from("jobs").select("*");
        if (orgId) {
          const orgUuid =
            orgId === "org-sanef"
              ? "22222222-2222-2222-2222-222222222222"
              : "11111111-1111-1111-1111-111111111111";
          query = query.eq("organization_id", orgUuid);
        }
        const { data } = await query;
        if (data && data.length > 0) {
          const mapped = data.map((row: any) => ({
            id: row.id,
            organizationId: orgId || "org-josieshield",
            refId: `JS-VAC-0${row.id.substring(0, 2)}`,
            title: row.title,
            department: "Field Security Operations",
            location: row.location,
            type: "Full-Time",
            deadline: row.deadline ? row.deadline.split("T")[0] : "2026-12-31",
            applicantsCount: 5,
            status: row.status === "open" ? "Open" : "Closed",
          }));
          return NextResponse.json({ success: true, vacancies: mapped });
        }
      }
    } catch (e) {
      console.error("Error fetching jobs from Supabase:", e);
    }
  }

  return NextResponse.json({
    success: true,
    vacancies: db.getVacancies(orgId || undefined),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          await supabase.from("jobs").insert({
            organization_id: "11111111-1111-1111-1111-111111111111", // JossyShield
            title: body.title,
            role_description: body.department || body.title,
            requirements: "Verified qualifications and clear vetting records.",
            location: body.location || "Lagos",
            deadline: body.deadline ? new Date(body.deadline).toISOString() : null,
            status: "open",
          });
        }
      } catch (e) {
        console.error("Error creating job in Supabase:", e);
      }
    }

    const created = db.createVacancy(body);
    return NextResponse.json({ success: true, vacancy: created });
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
            .from("jobs")
            .update({
              title: updates.title,
              location: updates.location,
              deadline: updates.deadline ? new Date(updates.deadline).toISOString() : undefined,
            })
            .eq("id", id);
        }
      } catch (e) {
        console.error("Error updating job in Supabase:", e);
      }
    }

    const updated = db.updateVacancy(id, updates);
    return NextResponse.json({ success: true, vacancy: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing job id" }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          await supabase.from("jobs").delete().eq("id", id);
        }
      } catch (e) {
        console.error("Error deleting job in Supabase:", e);
      }
    }

    const deleted = db.deleteVacancy(id);
    return NextResponse.json({ success: true, deleted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
