import connectToDb from "@/dbconfig/connectToDb";
import Folder from "@/models/folderModel";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  pathName: z.string(),
});

export async function POST(request: Request) {
  try {
    await connectToDb();

    const req = await request.json();

    if (!bodySchema.safeParse(req).success) {
      return NextResponse.json({ success: false, error: "Invalid request" });
    }

    const { pathName } = req;

    const folder = await Folder.findById(pathName);

    if (!folder) {
      return NextResponse.json({
        message: "Folder not found",
        status: 404,
      });
    }
    return NextResponse.json(folder.files);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
