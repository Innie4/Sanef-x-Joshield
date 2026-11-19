import { NextResponse } from "next/server";
import { db } from "@/lib/data-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("organizationId") || "org-jossyshield";
  return NextResponse.json({
    success: true,
    applications: db.getJobApplications(orgId),
  });
}

export async function PATCH(req: Request) {
  try {
    const { id, pipelineStatus, feedback, score, talentPoolAvailability } = await req.json();
    if (talentPoolAvailability) {
      const updated = db.updateTalentPoolAvailability(id, talentPoolAvailability);
      return NextResponse.json({ success: true, application: updated });
    }
    const updated = db.updateApplicationStatus(id, pipelineStatus, feedback, score);
    return NextResponse.json({ success: true, application: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
