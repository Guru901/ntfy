import connectToDb from "@/dbconfig/connectToDb";
import { getDataFromToken } from "@/lib/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  topic: z.string().min(1),
  fields: z
    .array(
      z.object({
        value: z.string().min(1),
        label: z.string().min(1),
      })
    )
    .min(1),
  saveImages: z.boolean(),
  trackQuestions: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    await connectToDb();

    const data = getDataFromToken(request) as {
      id: string;
    };

    if (!data) {
      return NextResponse.json({ error: "Unauthorized" });
    }

    const req = await request.json();

    const validatedBody = bodySchema.safeParse(req);

    if (!validatedBody.success) {
      return NextResponse.json({ error: "Invalid request" });
    }

    const { fields, saveImages, trackQuestions, topic } = validatedBody.data;

    const user = await User.findOneAndUpdate(
      { _id: data.id },
      {
        $set: {
          topic,
          whatToTrack: fields,
          wantImages: saveImages,
          wantQuesCount: trackQuestions,
        },
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: `Customize route error ${error}` });
  }
}
