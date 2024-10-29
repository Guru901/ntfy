import Folder from "@/models/folderModel";
import { NextResponse } from "next/server";
import connectToDb from "@/dbconfig/connectToDb";

export async function POST(request: Request) {
  try {
    await connectToDb();
    const req = await request.json();
    const { location } = req;
    const folders = await Folder.find({ location });
    if (!folders) {
      return NextResponse.json({
        success: false,
        error: "No folders found",
      });
    }
    return NextResponse.json(folders);
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
