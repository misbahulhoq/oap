import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { signAccessToken } from "@/lib/auth";

export async function POST(req: Request) {
  await dbConnect().then(() => {
    console.log("Db connected successfully");
  });

  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 },
      );
    }

    const role = user.role === "admin" ? "admin" : "user";
    const redirectTo =
      role === "admin" ? "/dashboard/admin" : "/dashboard/student";
    const accessToken = signAccessToken({
      id: String(user._id),
      email: user.email,
      role,
    });

    // set the access token in a cookie
    (await cookies()).set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({
      message: "Login successful",
      redirectTo,
      role,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
