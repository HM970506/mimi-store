import ThemeProvider from "@/providers/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import LayoutProvider from "@/providers/LayoutProvider";
import StoreProvider from "@/providers/StoreProvider";

//layout.tsx는 모든 페이지의 래퍼이고 부모 컴포넌트.

//head에 들어가는 metadata를 여기서 정의 가능.
//따로 미들웨어를 사용해야 하던 next12와 달리 편해진듯..?
export const metadata: Metadata = {
  title: "MIMI STORE",
  description: "next13 ecommerce store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
