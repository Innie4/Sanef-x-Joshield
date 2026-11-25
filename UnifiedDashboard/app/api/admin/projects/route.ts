import { NextResponse } from "next/server";
import { db } from "@/lib/data-store";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data } = await supabase
          .from("projects")
          .select("*")
          .order("project_date", { ascending: false });

        if (data && data.length > 0) {
          const mapped = data.map((row: any) => ({
            id: row.id,
            title: row.title,
            summary: row.summary,
            location: row.location,
            category: row.category,
            projectDate: row.project_date,
            status: row.status,
            photosCount: row.evidence_data?.photosCount || 4,
            pdfReportsCount: row.evidence_data?.pdfReportsCount || 1,
            partnersCount: row.evidence_data?.partnersCount || 2,
          }));
          return NextResponse.json({ success: true, projects: mapped });
        }
      }
    } catch (e) {
      console.error("Error fetching projects from Supabase:", e);
    }
  }

  return NextResponse.json({
    success: true,
    projects: db.getSANEFProjects(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          await supabase.from("projects").insert({
            organization_id: "22222222-2222-2222-2222-222222222222", // SANEF
            title: body.title,
            summary: body.summary,
            detailed_description: body.summary,
            category: body.category || "Transit Security",
            location: body.location || "Lagos, Nigeria",
            project_date: new Date().toISOString().split("T")[0],
            status: "published",
            is_featured: true,
            evidence_data: {
              photosCount: 4,
              pdfReportsCount: 1,
              partnersCount: 2,
            },
          });
        }
      } catch (e) {
        console.error("Error creating project in Supabase:", e);
      }
    }

    const created = db.createSANEFProject(body);
    return NextResponse.json({
      success: true,
      project: created,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
