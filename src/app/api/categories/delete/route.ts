import { connectDB } from "@/configs/dbConfigs";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/categoryModel";
import { validateJWT } from "@/helpers/validateJWT";

connectDB();

export async function POST(request: NextRequest) {
  try {
    //운영자 요청인지 확인
    const userId = await validateJWT(request);

    const reqBody = await request.json();

    await Category.findByIdAndDelete(reqBody.id);

    return NextResponse.json({ message: "카테고리 삭제 완료" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 404 });
  }
}
