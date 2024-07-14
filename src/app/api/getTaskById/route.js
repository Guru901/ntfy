import connect from "@/dbconfig/connect";
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();
    const req = await request.json();
    const task = await Task.findById(req);
    const response = NextResponse.json(task);
    return response;
  } catch (error) {
    const response = NextResponse.json({ msg: "An Error Occured" });
    return response;
  }
}
