import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export async function GET() {
  const session = await auth();
  const role = session?.user.role;

  if (role === UserRole.ADMIN) return new NextResponse(null, { status: 200 });
  return new NextResponse(null, { status: 403 });
}
