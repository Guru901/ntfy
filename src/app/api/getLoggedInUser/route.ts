import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDb from "@/dbconfig/connectToDb";
import {getDataFromToken} from "@/lib/getDataFromToken";

export async function GET(request: NextRequest) {

  const data = getDataFromToken(request) as {
    id: string
  }

  if (!data) {
    return NextResponse.json({ success: false });
  }

  try {
    await connectToDb();

    const userId = data.id;

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
