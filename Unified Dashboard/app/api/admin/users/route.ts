import { NextResponse } from "next/server";
import { CURRENT_USER } from "@/lib/data-store";

export async function GET() {
  const users = [
    {
      id: CURRENT_USER.id,
      name: `${CURRENT_USER.firstName} ${CURRENT_USER.lastName}`,
      email: CURRENT_USER.email,
      roles: {
        jossyshield: "Super Admin",
        sanef: "Super Admin",
      },
      status: "active",
    },
    {
      id: "usr-recruiter-1",
      name: "Evelyn Alabi",
      email: "e.alabi@jossyshield.com",
      roles: {
        jossyshield: "Recruitment Director",
        sanef: null,
      },
      status: "active",
    },
    {
      id: "usr-editor-1",
      name: "Fatima Bello",
      email: "fatima.bello@sanefoundation.org",
      roles: {
        jossyshield: null,
        sanef: "Evidence & Research Manager",
      },
      status: "active",
    },
  ];

  return NextResponse.json({
    success: true,
    users,
  });
}
