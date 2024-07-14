import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbconfig/connect";
import Task from "@/models/taskModel";

export async function POST(request) {
  try {
    console.log("here");
    const req = await request.json();
    const { _id, status, title, subject, priority } = req;
    console.log(req);
    console.log(_id);

    const task = await Task.findOneAndUpdate(
      { _id }, // Find task by _id
      { status, title, subject, priority }, // Update fields
      { new: true, runValidators: true } // Return updated document
    );

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
