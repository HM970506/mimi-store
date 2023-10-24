import { connectDB } from "@/configs/dbConfigs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Category from "@/models/categoryModel";
import { validateJWT } from "@/helpers/validateJWT";

connectDB();

export async function POST(request: NextRequest) {
  try {
    //운영자 요청인지 확인
    const userId = await validateJWT(request);

    const reqBody = await request.json();

    const categoryExists = await Category.findOne({ name: reqBody.name });
    if (categoryExists) throw new Error("존재하는 카테고리입니다");

    const newCategory = new Category({ ...reqBody, created: userId });
    await newCategory.save();

    return NextResponse.json({ message: "카테고리 추가 완료" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 404 });
  }
}
