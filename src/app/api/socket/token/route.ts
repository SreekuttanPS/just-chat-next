import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;
const SOCKET_JWT_SECRET = process.env.SOCKET_JWT_SECRET!;

export async function GET() {
  try {
    // 1. Read cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2. Verify main JWT
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      username: string;
    };

    // 3. Issue short-lived socket token
    const socketToken = jwt.sign(
      {
        userId: decoded.userId,
        username: decoded.username,
      },
      SOCKET_JWT_SECRET,
      { expiresIn: "5m" }
    );

    // 4. Return to frontend
    return NextResponse.json({ socketToken });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
