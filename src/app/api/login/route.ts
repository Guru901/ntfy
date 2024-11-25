import connectToDb from "@/dbconfig/connectToDb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(request: Request) {
  try {
    await connectToDb();

    const req = await request.json();

    if (!bodySchema.safeParse(req).success) {
      return NextResponse.json({ success: false, error: "Invalid request" });
    }

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
        secure: true,
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
