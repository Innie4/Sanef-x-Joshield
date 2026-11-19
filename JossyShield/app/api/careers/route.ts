import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const applicantId = `JS-CAND-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({
      success: true,
      applicantId,
      pipelineStatus: "new",
      message: "Application recorded in JossyShield talent pipeline.",
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
