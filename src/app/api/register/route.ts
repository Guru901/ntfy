import connectToDb from "@/dbconfig/connectToDb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    connectToDb();

    const req = await request.json();

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
