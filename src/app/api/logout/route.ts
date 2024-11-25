import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Error logging out" });
  }
}
