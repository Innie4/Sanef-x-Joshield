import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const seq = Math.floor(1000 + Math.random() * 8999);
    const referenceNumber = `JS-REQ-2026-${seq}`;

    return NextResponse.json({
      success: true,
      referenceNumber,
      status: "New",
      message: "Service request recorded in Josie Shield operations queue.",
      data: {
        ...body,
        referenceNumber,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process service request" },
      { status: 500 }
    );
  }
}
