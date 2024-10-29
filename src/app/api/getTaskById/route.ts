import connectToDb from "@/dbconfig/connectToDb";
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    connectToDb();
    const req = await request.json();
    const task = await Task.findById(req);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ msg: "An Error Occured" });
  }
}
