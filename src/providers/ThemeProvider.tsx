import React, { ReactNode } from "react";
import { ConfigProvider } from "antd";

//ThemeProvider 는 테마 공급자
//ConfigProvider 는 antd의 테마
function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <div>
      <ConfigProvider theme={{ token: { colorPrimary: "#000" } }}>
        {children}
      </ConfigProvider>
    </div>
  );
}

export default ThemeProvider;
