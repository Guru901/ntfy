import connectToDb from "@/dbconfig/connectToDb";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function GET(request: NextRequest) {
  try {
    await connectToDb();

    const id = request.nextUrl.searchParams.get("userId");

    const tasks = await Task.find({ byUser: id });

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
