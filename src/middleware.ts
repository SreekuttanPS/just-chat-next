import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export function middleware(req: NextRequest) {
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
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // ✅ Attach decoded user data to request headers for downstream APIs
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.userId);
    requestHeaders.set("x-username", decoded.username);

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

// Tell Next.js which routes need protection
export const config = {
  matcher: [
    "/api/protected/:path*", // example protected routes
    "/dashboard/:path*",
  ],
};
