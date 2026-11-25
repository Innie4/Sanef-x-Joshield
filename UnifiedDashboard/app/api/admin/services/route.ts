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
        let query = supabase.from("services").select("*");
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
            code: `JS-${row.category === "security" ? "SEC" : row.category === "consultancy" ? "CON" : "TRN"}-0${row.id.substring(0, 2)}`,
            pillar:
              row.category === "security"
                ? "Security Services"
                : row.category === "consultancy"
                ? "Consultancy"
                : "Training",
            name: row.title,
            slaStandard: "Standard Shift Protocol",
            activeClients: 8,
            status: row.is_active ? "Published" : "Draft",
          }));
          return NextResponse.json({ success: true, services: mapped });
        }
      }
    } catch (e) {
      console.error("Error fetching services from Supabase:", e);
    }
  }

  return NextResponse.json({
    success: true,
    services: db.getServices(orgId || undefined),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          await supabase.from("services").insert({
            organization_id: "11111111-1111-1111-1111-111111111111", // JossyShield
            category:
              body.pillar === "Consultancy"
                ? "consultancy"
                : body.pillar === "Training"
                ? "training"
                : "security",
            title: body.name,
            description: body.slaStandard || body.name,
            scope: body.scope || body.name,
            is_active: true,
          });
        }
      } catch (e) {
        console.error("Error creating service in Supabase:", e);
      }
    }

    const created = db.createService(body);
    return NextResponse.json({ success: true, service: created });
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
            .from("services")
            .update({
              title: updates.name,
              category:
                updates.pillar === "Consultancy"
                  ? "consultancy"
                  : updates.pillar === "Training"
                  ? "training"
                  : "security",
              description: updates.slaStandard,
            })
            .eq("id", id);
        }
      } catch (e) {
        console.error("Error updating service in Supabase:", e);
      }
    }

    const updated = db.updateService(id, updates);
    return NextResponse.json({ success: true, service: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing service id" }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          await supabase.from("services").delete().eq("id", id);
        }
      } catch (e) {
        console.error("Error deleting service in Supabase:", e);
      }
    }

    const deleted = db.deleteService(id);
    return NextResponse.json({ success: true, deleted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
