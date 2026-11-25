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

        const { data, error } = await supabase
          .from("marketplace_requests")
          .select("*")
          .eq("organization_id", orgUuid)
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          const mapped = data.map((row: any) => ({
            id: row.id,
            organizationId: orgId,
            referenceNumber: row.reference_number,
            serviceType: row.service_type,
            clientName: row.client_name,
            organization: row.company_name || "",
            email: row.email,
            phone: row.phone,
            location: row.location,
            status:
              row.status === "new"
                ? "New"
                : row.status === "in_review"
                ? "In Review"
                : row.status === "contacted"
                ? "Contacted"
                : row.status === "quoted"
                ? "Quoted"
                : "Closed",
            details: row.details_json || {},
            receivedDate: new Date(row.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            assignedOfficer: "Duty Commander (Operations)",
            internalNotes: row.internal_notes
              ? [
                  {
                    id: "n1",
                    author: "Ops",
                    timestamp: new Date(row.updated_at || row.created_at).toLocaleDateString(),
                    text: row.internal_notes,
                  },
                ]
              : [],
          }));
          return NextResponse.json({ success: true, requests: mapped });
        }
      }
    } catch (e) {
      console.error("Error fetching marketplace requests from Supabase:", e);
    }
  }

  return NextResponse.json({
    success: true,
    requests: db.getMarketplaceRequests(orgId),
  });
}

export async function PATCH(req: Request) {
  try {
    const { id, status, note } = await req.json();

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseAdmin();
        if (supabase) {
          await supabase
            .from("marketplace_requests")
            .update({
              status: status ? status.toLowerCase().replace(/ /g, "_") : "new",
              internal_notes: note,
              updated_at: new Date().toISOString(),
            })
            .eq("id", id);
        }
      } catch (e) {
        console.error("Error updating marketplace request in Supabase:", e);
      }
    }

    const updated = db.updateMarketplaceRequestStatus(id, status, note);
    return NextResponse.json({
      success: true,
      request: updated,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
