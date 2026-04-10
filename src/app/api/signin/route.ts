import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dbConnect from "@/lib/db";
import User from "@/lib/models/User";

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

    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
    );

    // set the access token in a cookie
    (await cookies()).set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    });

    if (user.role === "admin") {
      return NextResponse.json({
        message: "Login successful",
        redirectTo: "/dashboard/admin",
      });
    } else {
      return NextResponse.json({
        message: "Login successful",
        redirectTo: "/dashboard/student",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
