import { connectDB } from "@/configs/dbConfigs";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/categoryModel";
import { validateJWT } from "@/helpers/validateJWT";

connectDB();

export async function PUT(
  request: NextRequest,
  { params }: { params: { categoryid: string } }
) {
  try {
    //운영자 요청인지 확인
    const userId = await validateJWT(request);

    const reqBody = await request.json();

    console.log(reqBody);

    await Category.findByIdAndUpdate(params.categoryid, reqBody);

    return NextResponse.json({ message: "카테고리 수정 완료" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { categoryid: string } }
) {
  try {
    //운영자 요청인지 확인
    const userId = await validateJWT(request);

    await Category.findByIdAndDelete(params.categoryid);

    return NextResponse.json({ message: "카테고리 삭제 완료" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
