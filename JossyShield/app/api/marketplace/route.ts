import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const referenceNumber = `JS-REQ-${Math.floor(10000 + Math.random() * 90000)}`;

    // In a live system, this inserts into PostgreSQL database
    // Returning reference ID and status confirmation
    return NextResponse.json({
      success: true,
      referenceNumber,
      status: "new",
      message: "Marketplace service request recorded successfully.",
      data: {
        ...body,
        referenceNumber,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
