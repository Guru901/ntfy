import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDb from "@/dbconfig/connectToDb";

export async function POST(request: NextRequest) {
  let token = request.cookies.get("token")?.value || "";

  if (!token) {
    return NextResponse.json({ success: false });
  }

  try {
    await connectToDb();

    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as {
      id: string;
    };
    const userId = decodedToken.id;

    const user = await User.findById(userId).select("-password");

    if (user) {
      return NextResponse.json({ success: true, user });
    }

    return NextResponse.json({ success: false });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ success: false });
  }
}
