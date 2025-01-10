import connectToDb from "@/dbconfig/connectToDb";
import { getDataFromToken } from "@/lib/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDb();
    const { id } = getDataFromToken(request) as { id: string };

    const req = await request.json();

    const { fields } = req;

    await User.findByIdAndUpdate(id, {
      whatToTrack: fields,
    });

    return NextResponse.json({
      success: true,
      data: { fields: fields },
    });
  } catch (error) {
    console.error("Error updating user fields:", error);
    return NextResponse.json({ success: false });
  }
}
