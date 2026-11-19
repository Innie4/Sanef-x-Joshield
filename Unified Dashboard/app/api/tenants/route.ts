import { NextResponse } from "next/server";
import { ORGANIZATIONS, CURRENT_USER } from "@/lib/data-store";

export async function GET() {
  return NextResponse.json({
    success: true,
    user: CURRENT_USER,
    organizations: ORGANIZATIONS,
  });
}
