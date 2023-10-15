//nav바 제공
"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import {
  AppstoreOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "@/redux/userSlice";

export default function LayoutProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isPrivate, setIsPrivate] = useState(false);
  const [current, setCurrent] = useState("mail");
  const user = useSelector((state: any) => state);

  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "SubMenu",
      icon: <AppstoreOutlined />,
      children: [
        {
          type: "group",
          label: "black",
          children: [
            {
              label: "desk",
              key: "black-desk",
            },
            {
              label: "kitchen",
              key: "black-kitchen",
            },
          ],
        },
        {
          type: "group",
          label: "white",
          children: [
            {
              label: "desk",
              key: "white-dest",
            },
            {
              label: "kitchen",
              key: "white-kitchen",
            },
          ],
        },
      ],
      style: {
        position: "absolute",
        left: 0,
        top: "8px",
      },
    },
    {
      label: "MIMI STORE",
      key: "title",
    },

    {
      key: "mypage",
      label: user.name,
      icon: <UserOutlined />,
      children: [
        {
          label: "heart",
          key: "heart",
          icon: <HeartOutlined />,
        },

        {
          label: "cart",
          key: "cart",
          icon: <ShoppingCartOutlined />,
          onClick: () => {},
        },
        {
          label: "profile",
          key: "profile",
          icon: <SettingOutlined />,
          onClick: () => {
            router.push("/profile");
          },
        },
        {
          label: "logout",
          key: "logut",
          icon: <LogoutOutlined />,
          onClick: async () => {
            try {
              await axios.get("/api/auth/logout");
              dispatch(userAction.reset());
              message.success("로그아웃 되었습니다");
              router.push("/auth/login");
            } catch (e: any) {
              message.error(e.response.data.message);
            }
          },
        },
      ],
      style: { position: "absolute", right: 0, top: "8px" },
    },
  ];

  const getUser = async () => {
    try {
      const response = await axios.get("/api/auth/currentuser");
      dispatch(userAction.setUser(response.data.data));
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  };

  useEffect(() => {
    const isPrivatePage =
      pathname !== "/auth/login" && pathname !== "/auth/register";
    setIsPrivate(isPrivatePage);
  }, [pathname]);

  useEffect(() => {
    if (isPrivate) getUser();
  }, [isPrivate]);

  return (
    <div>
      {isPrivate && user.name !== "" && (
        <Menu
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      )}
      {children}
    </div>
  );
}
