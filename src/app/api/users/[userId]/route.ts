//api 관련 제목은 반드시 route.ts여야 하며
//호출 url에 맞춰 디렉토리 경로를 맞춰야 함!
//이제 여기에 api를 작성하면, /api/users 로 액세스 가능!

//payload란? 목적이 되는 순수한 데이터.
//get은 브라우저에서 api호출을 확인할 수 있으나 payload를 얻지 못하고,
//post는 포스트맨에서만 호출을 확인할 수 있으나 payload를 얻을 수 있다.

import { connectDB } from "@/configs/dbConfigs";
import { NextRequest, NextResponse } from "next/server";

interface ParamsType {
  userId: string;
}
//db사용할 때마다 연결
connectDB();
export const GET = async (
  request: NextRequest,
  { params }: { params: ParamsType }
) => {
  const userId = params.userId;
  return NextResponse.json({
    success: true,
    data: [{ id: userId, name: "test" }],
  });
};
