import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const referenceId = `SANEF-DON-${Math.floor(10000 + Math.random() * 90000)}`;

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Donation pledge logged successfully.",
      data: {
        ...body,
        referenceId,
        loggedAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to record donation" },
      { status: 500 }
    );
  }
}
