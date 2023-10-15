import { LoadingOutlined } from "@ant-design/icons";

//미들웨어와 비슷하지만, 미들웨어는 요청이 전송된 후 실행되고 로딩은 페이지 렌더링 전 실행된다!
export default function Loading() {
  return (
    <div className="w-screen h-screen bg-zinc-600 flex justify-center align-middle">
      <LoadingOutlined style={{ color: "white", fontSize: "100px" }} />
    </div>
  );
}
