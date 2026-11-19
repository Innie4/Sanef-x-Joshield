import { NextResponse } from "next/server";
import { db } from "@/lib/data-store";

export async function GET() {
  return NextResponse.json({
    success: true,
    projects: db.getSANEFProjects(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const created = db.createSANEFProject(body);
    return NextResponse.json({
      success: true,
      project: created,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
