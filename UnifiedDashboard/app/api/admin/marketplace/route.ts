import { NextResponse } from "next/server";
import { db } from "@/lib/data-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("organizationId") || "org-josieshield";
  return NextResponse.json({
    success: true,
    requests: db.getMarketplaceRequests(orgId),
  });
}

export async function PATCH(req: Request) {
  try {
    const { id, status, note } = await req.json();
    const updated = db.updateMarketplaceRequestStatus(id, status, note);
    return NextResponse.json({
      success: true,
      request: updated,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
