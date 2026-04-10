import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { verifyAccessToken } from "@/lib/auth";

function resolveAllowedPath(role: "admin" | "user") {
  return role === "admin" ? "/dashboard/admin" : "/dashboard/student";
}

function canAccessDashboardPath(
  role: "admin" | "user",
  pathname: string,
) {
  if (!pathname.startsWith("/dashboard")) {
    return true;
  }

  if (role === "admin") {
    return !pathname.startsWith("/dashboard/student");
  }

  return (
    !pathname.startsWith("/dashboard/admin") &&
    !pathname.startsWith("/dashboard/new-exam")
  );
}

export async function GET(req: Request) {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) {
    return NextResponse.json(
      { authenticated: false, redirectTo: "/" },
      { status: 401 },
    );
  }

  try {
    const payload = verifyAccessToken(token);
    const pathname = new URL(req.url).searchParams.get("pathname") || "";
    const allowedPath = resolveAllowedPath(payload.role);
    const isAllowedPath = canAccessDashboardPath(payload.role, pathname);

    if (!isAllowedPath) {
      return NextResponse.json(
        { authenticated: false, redirectTo: allowedPath },
        { status: 403 },
      );
    }

    return NextResponse.json({
      authenticated: true,
      redirectTo: allowedPath,
      user: payload,
    });
  } catch {
    (await cookies()).delete("accessToken");

    return NextResponse.json(
      { authenticated: false, redirectTo: "/" },
      { status: 401 },
    );
  }
}
