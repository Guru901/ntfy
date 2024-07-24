import connect from "@/dbconfig/connect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();

    const { email, username, password } = req.form;
    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        msg: "Email already exists",
      });
    }

    existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        msg: "Username already taken",
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

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET);

    const response = NextResponse.json({
      success: true,
    });

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Something went wrong" },
      error.message
    );
  }
}
