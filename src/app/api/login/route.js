import connect from "@/dbconfig/connect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    connect();
    const req = await request.json();
    const { email, password } = req.form;
    const user = await User.findOne({
      email: email,
    });
    console.log(user);
    if (!user) {
      return Response.json({ success: false, msg: "User doesn't exists" });
    }

    if (user.password === password) {
      const tokenData = {
        id: user._id,
      };

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET);

      const response = NextResponse.json({
        success: true,
        user: user,
      });

      response.cookies.set("token", token, {
        httpOnly: true,
      });

      return response;
    }

    const response = NextResponse.json({
      success: false,
      msg: "Wrong Credentials",
    });
    return response;
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      msg: "an error occurred",
    });
  }
}
