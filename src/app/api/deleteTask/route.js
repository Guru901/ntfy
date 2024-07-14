import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbconfig/connect";
import Task from "@/models/taskModel";

export async function POST(request) {
  connect();
  const req = await request.json();
  const { _id } = req;

  const task = await Task.findOneAndDelete({ _id: _id });

  const response = NextResponse.json({ success: true });
  return response;
}
