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
        let query = supabase.from("events").select("*");
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
            organizationId: orgId || "org-sanef",
            refId: `SAN-EVT-0${row.id.substring(0, 4)}`,
            title: row.title,
            date: row.event_date ? row.event_date.split("T")[0] : "2026-12-01",
            location: row.location,
            type: "Upcoming",
            registrations: 45,
            status: row.status === "upcoming" ? "Published" : "Completed",
          }));
          return NextResponse.json({ success: true, events: mapped });
        }
      }
    } catch (e) {
      console.error("Error fetching events from Supabase:", e);
    }
  }

  return NextResponse.json({
    success: true,
    events: db.getEvents(orgId || undefined),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          await supabase.from("events").insert({
            organization_id:
              body.organizationId === "org-sanef"
                ? "22222222-2222-2222-2222-222222222222"
                : "11111111-1111-1111-1111-111111111111",
            title: body.title,
            description: body.description || body.title,
            event_date: new Date(body.date || Date.now()).toISOString(),
            location: body.location,
            status: "upcoming",
          });
        }
      } catch (e) {
        console.error("Error creating event in Supabase:", e);
      }
    }

    const created = db.createEvent(body);
    return NextResponse.json({ success: true, event: created });
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
            .from("events")
            .update({
              title: updates.title,
              location: updates.location,
              event_date: updates.date ? new Date(updates.date).toISOString() : undefined,
            })
            .eq("id", id);
        }
      } catch (e) {
        console.error("Error updating event in Supabase:", e);
      }
    }

    const updated = db.updateEvent(id, updates);
    return NextResponse.json({ success: true, event: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing event id" }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          await supabase.from("events").delete().eq("id", id);
        }
      } catch (e) {
        console.error("Error deleting event in Supabase:", e);
      }
    }

    const deleted = db.deleteEvent(id);
    return NextResponse.json({ success: true, deleted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
