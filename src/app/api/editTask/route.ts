import { NextResponse } from "next/server";
import connectToDb from "@/dbconfig/connectToDb";
import Task from "@/models/taskModel";

export async function POST(request: Request) {
  try {
    await connectToDb();
    const req = await request.json();
    const { _id, status, title, subject, priority } = req;

    const task = await Task.findOneAndUpdate(
      { _id },
      { status, title, subject, priority },
      { new: true, runValidators: true }
    );

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
