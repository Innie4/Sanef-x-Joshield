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
        let query = supabase.from("testimonials").select("*");
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
            organizationId: orgId || "org-jossyshield",
            refId: `JS-TST-0${row.id.substring(0, 2)}`,
            clientName: row.client_name,
            organisation: row.client_title || "Commercial Client",
            category: "Security Services",
            quote: row.quote,
            approvedDate: "2026-11-20",
            status: row.is_approved ? "Approved" : "Pending Review",
          }));
          return NextResponse.json({ success: true, testimonials: mapped });
        }
      }
    } catch (e) {
      console.error("Error fetching testimonials from Supabase:", e);
    }
  }

  return NextResponse.json({
    success: true,
    testimonials: db.getTestimonials(orgId || undefined),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          await supabase.from("testimonials").insert({
            organization_id: "11111111-1111-1111-1111-111111111111", // JossyShield
            client_name: body.clientName,
            client_title: body.organisation,
            quote: body.quote,
            rating: 5,
            is_approved: true,
          });
        }
      } catch (e) {
        console.error("Error creating testimonial in Supabase:", e);
      }
    }

    const created = db.createTestimonial(body);
    return NextResponse.json({ success: true, testimonial: created });
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
            .from("testimonials")
            .update({
              client_name: updates.clientName,
              client_title: updates.organisation,
              quote: updates.quote,
            })
            .eq("id", id);
        }
      } catch (e) {
        console.error("Error updating testimonial in Supabase:", e);
      }
    }

    const updated = db.updateTestimonial(id, updates);
    return NextResponse.json({ success: true, testimonial: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing testimonial id" }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          await supabase.from("testimonials").delete().eq("id", id);
        }
      } catch (e) {
        console.error("Error deleting testimonial in Supabase:", e);
      }
    }

    const deleted = db.deleteTestimonial(id);
    return NextResponse.json({ success: true, deleted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
