import connectToDb from "@/dbconfig/connectToDb";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/getDataFromToken";

export async function GET(request: NextRequest) {
  try {
    await connectToDb();

    const data = getDataFromToken(request) as {
      id: string;
    };

    if (!data) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    const tasks = await Task.find({ byUser: data.id });

    return NextResponse.json(
      {
        success: true,
        tasks,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
