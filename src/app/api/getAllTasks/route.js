import connect from "@/dbconfig/connect";
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connect();
    const req = await request.json();
    const { id } = req;
    const tasks = await Task.find({ byUser: id });
    const response = NextResponse.json(tasks);
    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
