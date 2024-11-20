import Questions from "@/models/questModel";
import {NextRequest, NextResponse} from "next/server";
import connectToDb from "@/dbconfig/connectToDb";
import {getDataFromToken} from "@/lib/getDataFromToken";

export async function GET(request: NextRequest) {
  try {
    await connectToDb();

   const data = getDataFromToken(request) as {
       id: string
   }

   if (!data) {
       return NextResponse.json({})
   }

    const questions = await Questions.find({
      byUser: data.id,
    });

    if (!questions) {
      return NextResponse.json({
        success: false,
        msg: "No questions found",
      });
    }

    return NextResponse.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
