import Folder from "@/models/folderModel";
import { NextResponse } from "next/server";
import connectToDb from "@/dbconfig/connectToDb";
import { z } from "zod";

const bodySchema = z.object({
  location: z.string(),
});

export async function POST(request: Request) {
  try {
    await connectToDb();
    const req = await request.json();

    if (!bodySchema.safeParse(req).success) {
      return NextResponse.json({ success: false, error: "Invalid request" });
    }

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
