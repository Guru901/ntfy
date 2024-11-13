import connectToDb from "@/dbconfig/connectToDb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    connectToDb();

    const req = await request.json();

    const { email, password } = req;

    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return NextResponse.json({ success: false, msg: "User doesn't exists" });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);


    if (isPasswordCorrect) {
      const tokenData = {
        id: user._id,
      };

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET as string);

      const response = NextResponse.json({
        success: true,
        user: user,
      });

      response.cookies.set("token", token, {
        httpOnly: true,
      });

      return response;
    }

    return NextResponse.json({
      success: false,
      msg: "Wrong Credentials",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      msg: "an error occurred",
    });
  }
}
