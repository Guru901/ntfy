import connectToDb from "@/dbconfig/connectToDb";
import { getDataFromToken } from "@/lib/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDb();

    const { id } = getDataFromToken(request) as { id: string };

    const req = await request.json();

    const { wantQuesCount } = req;

    const user = await User.findByIdAndUpdate(id, {
      wantQuesCount,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error,
    });
  }
}
