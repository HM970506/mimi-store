import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "로그아웃했습니다" });

  response.cookies.delete("token");

  return response;
}
