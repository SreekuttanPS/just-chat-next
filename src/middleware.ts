import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not set in env");
    }

    // Verify JWT
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // ✅ Attach decoded user data to request headers for downstream APIs
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", payload?.userId as string);
    requestHeaders.set("x-username", payload?.username as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err) {
    console.error("JWT Verification Failed:", err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: [
    "/api/protected/:path*",
    "/dashboard/:path*",
  ],
};
