import { NextResponse } from "next/server";
import { db } from "@/lib/data-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("organizationId") || "org-josieshield";
  return NextResponse.json({
    success: true,
    applications: db.getJobApplications(orgId),
    talentPool: db.getTalentPool(orgId),
  });
}

export async function PATCH(req: Request) {
  try {
    const { id, stage, note, talentPoolAvailability } = await req.json();
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
