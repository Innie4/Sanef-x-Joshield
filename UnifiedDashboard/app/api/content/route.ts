import { NextResponse } from "next/server";
import { db } from "@/lib/data-store";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const org = searchParams.get("org");

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    // 1. If Supabase is configured, read directly from database
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        if (type === "projects") {
          const { data } = await supabase.from("projects").select("*").order("project_date", { ascending: false });
          if (data && data.length > 0) {
            return NextResponse.json({ success: true, data }, { headers: corsHeaders });
          }
        } else if (type === "partnerships") {
          const { data } = await supabase.from("partnerships").select("*");
          if (data && data.length > 0) {
            return NextResponse.json({ success: true, data }, { headers: corsHeaders });
          }
        } else if (type === "events") {
          const { data } = await supabase.from("events").select("*").order("event_date", { ascending: true });
          if (data && data.length > 0) {
            return NextResponse.json({ success: true, data }, { headers: corsHeaders });
          }
        } else if (type === "services") {
          const { data } = await supabase.from("services").select("*").eq("is_active", true);
          if (data && data.length > 0) {
            return NextResponse.json({ success: true, data }, { headers: corsHeaders });
          }
        } else if (type === "vacancies" || type === "jobs") {
          const { data } = await supabase.from("jobs").select("*").eq("status", "open");
          if (data && data.length > 0) {
            return NextResponse.json({ success: true, data }, { headers: corsHeaders });
          }
        } else if (type === "testimonials") {
          const { data } = await supabase.from("testimonials").select("*").eq("is_approved", true);
          if (data && data.length > 0) {
            return NextResponse.json({ success: true, data }, { headers: corsHeaders });
          }
        }
      }
    }

    // 2. Fall back to live in-memory repository
    if (type === "projects") {
      return NextResponse.json({ success: true, data: db.getSANEFProjects() }, { headers: corsHeaders });
    }
    if (type === "partnerships") {
      return NextResponse.json({ success: true, data: db.getSANEFPartnerships() }, { headers: corsHeaders });
    }
    if (type === "events") {
      return NextResponse.json({ success: true, data: db.getEvents(org || undefined) }, { headers: corsHeaders });
    }
    if (type === "services") {
      return NextResponse.json({ success: true, data: db.getServices(org || undefined) }, { headers: corsHeaders });
    }
    if (type === "vacancies" || type === "jobs") {
      return NextResponse.json({ success: true, data: db.getVacancies(org || undefined) }, { headers: corsHeaders });
    }
    if (type === "testimonials") {
      return NextResponse.json({ success: true, data: db.getTestimonials(org || undefined) }, { headers: corsHeaders });
    }

    return NextResponse.json({ success: false, error: "Invalid type parameter" }, { status: 400, headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500, headers: corsHeaders });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
