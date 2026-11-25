import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const seq = Math.floor(1000 + Math.random() * 8999);
    const applicantId = `JS-APP-2026-${seq}`;

    return NextResponse.json({
      success: true,
      applicantId,
      pipelineStatus: "New Application",
      message: "Application logged in Josie Shield recruitment pipeline.",
      data: {
        ...body,
        applicantId,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to submit application" },
      { status: 500 }
    );
  }
}
