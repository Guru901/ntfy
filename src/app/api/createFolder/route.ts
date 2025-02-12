import { NextRequest, NextResponse } from "next/server";
import Folder from "@/models/folderModel";
import connectToDb from "@/dbconfig/connectToDb";
import { getDataFromToken } from "@/lib/getDataFromToken";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string(),
  location: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    await connectToDb();
    const req = await request.json();

    if (!bodySchema.safeParse(req).success) {
      return NextResponse.json({ success: false, error: "Invalid request" });
    }

    const { name, location } = req;

    const data = getDataFromToken(request) as {
      id: string;
    };

    const existingFolder = await Folder.find({ name });

    for (const folder of existingFolder) {
      if (folder.location === location) {
        return NextResponse.json({ success: false, error: "Change the name" });
      }
    }

    const newFolder = await Folder.create({
      createdBy: data.id,
      location,
      name,
    });

    return NextResponse.json(newFolder);
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
