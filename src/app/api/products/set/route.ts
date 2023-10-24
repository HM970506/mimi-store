import { connectDB } from "@/configs/dbConfigs";
import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "@/helpers/validateJWT";
import Product from "@/models/productModel";

connectDB();

export async function POST(request: NextRequest) {
  try {
    //운영자 요청인지 확인
    const userId = await validateJWT(request);

    const reqBody = await request.json();

    const newProduct = new Product({ ...reqBody, created: userId });
    await newProduct.save();

    return NextResponse.json({ message: "제품 추가 완료" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 404 });
  }
}
