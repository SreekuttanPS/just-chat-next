import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username) {
      return NextResponse.json(
        { username: "Username is required" },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { password: "Password is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { username: "User doesn't exist, Please check the username!" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { password: "Invalid username or password!" },
        { status: 401 }
      );
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const res = NextResponse.json(
      {
        message: "Logged in successfully",
        data: { username: user.username, name: user.name },
      },
      { status: 200 }
    );
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 1, // 7 days
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ password: "Server error" }, { status: 500 });
  }
}
