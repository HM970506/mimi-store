import { connectDB } from "@/configs/dbConfigs";
import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "@/helpers/validateJWT";
import Product from "@/models/productModel";

connectDB();

export async function PUT(
  request: NextRequest,
  { params }: { params: { productid: string } }
) {
  try {
    //운영자 요청인지 확인
    const userId = await validateJWT(request);

    const reqBody = await request.json();

    await Product.findByIdAndUpdate(params.productid, reqBody);

    return NextResponse.json({ message: "물품 수정 완료" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { productid: string } }
) {
  try {
    //운영자 요청인지 확인
    const userId = await validateJWT(request);

    await Product.findByIdAndDelete(params.productid);

    return NextResponse.json({ message: "물품 삭제 완료" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
