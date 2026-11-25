import { NextResponse } from "next/server";
import { db } from "@/lib/data-store";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("organizationId") || "org-josieshield";

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const orgUuid =
          orgId === "org-sanef"
            ? "22222222-2222-2222-2222-222222222222"
            : "11111111-1111-1111-1111-111111111111";

        const { data } = await supabase
          .from("job_applications")
          .select("*")
          .eq("organization_id", orgUuid)
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          const mapped = data.map((row: any) => ({
            id: row.id,
            organizationId: orgId,
            referenceCode: `APP-${row.id.substring(0, 8).toUpperCase()}`,
            applicantName: row.applicant_name,
            email: row.email,
            phone: row.phone,
            role: "Security Officer / Field Operative",
            sourceType: "General Talent Pool",
            location: "Lagos Command",
            experienceYears: row.experience_years,
            qualifications: "Verified NSCDC / Field Security",
            availability: "Immediate",
            cvFileName: `${row.applicant_name.replace(/\s+/g, "_")}_CV.pdf`,
            cvFileSize: "1.2 MB",
            cvSummary: row.notes || "Standard verified recruitment application.",
            stage:
              row.pipeline_status === "new"
                ? "New Application"
                : row.pipeline_status === "under_review"
                ? "Under Review"
                : row.pipeline_status === "approved"
                ? "Approved / Qualified"
                : row.pipeline_status === "talent_pool"
                ? "Talent Pool"
                : "Under Review",
            assignedReviewer: "Duty Commander",
            appliedDate: new Date(row.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            skills: ["VHF Radio Dispatch", "Access Control", "First Aid"],
            interviews: [],
            restrictedNotes: row.notes
              ? [
                  {
                    id: "n1",
                    author: "Vetting Unit",
                    timestamp: new Date(row.created_at).toLocaleDateString(),
                    text: row.notes,
                  },
                ]
              : [],
            inTalentPool: row.pipeline_status === "talent_pool",
          }));

          return NextResponse.json({
            success: true,
            applications: mapped,
            talentPool: db.getTalentPool(orgId),
          });
        }
      }
    } catch (e) {
      console.error("Error fetching recruitment from Supabase:", e);
    }
  }

  return NextResponse.json({
    success: true,
    applications: db.getJobApplications(orgId),
    talentPool: db.getTalentPool(orgId),
  });
}

export async function PATCH(req: Request) {
  try {
    const { id, stage, note, talentPoolAvailability } = await req.json();

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          if (stage) {
            await supabase
              .from("job_applications")
              .update({
                pipeline_status: stage.toLowerCase().replace(/[\s\/]+/g, "_"),
                notes: note,
                updated_at: new Date().toISOString(),
              })
              .eq("id", id);
          }
        }
      } catch (e) {
        console.error("Error updating recruitment in Supabase:", e);
      }
    }

    if (talentPoolAvailability) {
      const updated = db.updateTalentPoolAvailability(id, talentPoolAvailability);
      return NextResponse.json({ success: true, profile: updated });
    }
    const updated = db.updateApplicationStatus(id, stage, note);
    return NextResponse.json({ success: true, application: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
