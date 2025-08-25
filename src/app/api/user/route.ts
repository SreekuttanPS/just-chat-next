import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log('cookieStore: ', cookieStore);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not set in env");
    }

    // Verify JWT
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Pass user data in response body
    return NextResponse.json({
      username: payload?.username,
      name: payload?.name,
    });
  } catch (err) {
    console.error("JWT Verification Failed:", err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
