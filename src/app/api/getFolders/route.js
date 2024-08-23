import Folder from "@/models/folderModel";
import { NextResponse } from "next/server";
import connect from "@/dbconfig/connect";

export async function POST(request) {
  try {
    await connect();
    const req = await request.json();
    const { location } = req;
    const folders = await Folder.find({ location });
    if (!folders) {
      const response = NextResponse.json("sed :(");
      return response;
    }
    const response = NextResponse.json(folders);
    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
