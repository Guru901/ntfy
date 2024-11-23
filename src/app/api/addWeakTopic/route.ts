import {NextRequest, NextResponse} from "next/server";
import WeakTopic from "@/models/weakTopicModel";
import connectToDb from "@/dbconfig/connectToDb";
import {getDataFromToken} from "@/lib/getDataFromToken";
import { z } from "zod"

const bodySchema = z.object({
  weakTopic: z.string(),
  subject: z.string(),
});


export async function POST(request: NextRequest) {
  try {

    await connectToDb();

    const req = await request.json();

    if (bodySchema.safeParse(req.form).success) {
      return NextResponse.json({success: false, error: "Invalid request"});
    }

    const { weakTopic, subject } = req.form;

    const data = getDataFromToken(request) as {
      id: string;
    }

    const weakTopicDoc = await WeakTopic.create({
      name: weakTopic,
      subject: subject,
      createdBy: data.id,
    });

    await weakTopicDoc.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
