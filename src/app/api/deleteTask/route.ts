import { NextResponse } from "next/server";
import connectToDb from "@/dbconfig/connectToDb";
import Task from "@/models/taskModel";

export async function POST(request: Request) {
  try {
    await connectToDb();
    const req = await request.json();
    const { _id } = req;

    const task = await Task.findOneAndDelete({ _id: _id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error });
  }
}
