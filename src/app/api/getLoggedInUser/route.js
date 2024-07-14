import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connect from "@/dbconfig/connect";

export async function POST(request) {
  const token = request.cookies.get("token")?.value || "";

  if (!token) {
    const response = NextResponse.json({ success: false });
    return response;
  }

  try {
    connect();

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;

    const user = await User.findById(userId).select("-password");

    if (user) {
      const response = NextResponse.json(user);
      return response;
    }

    const response = NextResponse.json({ success: false });

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    const response = NextResponse.json({ success: false });

    return response;
  }
}
