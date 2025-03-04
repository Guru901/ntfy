import connectToDb from "@/dbconfig/connectToDb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string(),
});

export async function POST(request: Request) {
  try {
    await connectToDb();

    const req = await request.json();

    if (!bodySchema.safeParse(req).success) {
      return NextResponse.json({ success: false, error: "Invalid request" });
    }

    const { email, username, password } = req;
    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: "Email already exists",
      });
    }

    existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: "Username already taken",
      });
    }

    const newUser = await User.create({
      username: username,
      password: password,
      email: email,
      topic: "temp",
    });

    await newUser.save();

    const tokenData = {
      id: newUser.id,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET as string);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    const response = NextResponse.json({
      success: true,
      user: newUser,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      expires,
    });

    newUser.password = "";

    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
