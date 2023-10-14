"use client";

import { requiredRule } from "@/app/message/validations";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface LoginType {
  name: string;
  password: string;
  email: string;
}

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogin = async (value: LoginType) => {
    //여기도 나중에 분리
    try {
      setLoading(true);
      await axios.post("/api/auth/login", value);
      message.success("로그인 성공");
      router.push("/");
    } catch (e) {
      console.error(e);
      message.error("로그인 실패");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center align-top">
      <div
        className="relative top-10 text-center 
  flex flex-col w-1/2
  mobile:w-1/4
  "
      >
        <h1>Login</h1>
        <Form onFinish={onLogin}>
          <Form.Item name="email" rules={requiredRule("email")}>
            <Input placeholder={"Email"} />
          </Form.Item>
          <Form.Item name="password" rules={requiredRule("password")}>
            <Input.Password placeholder={"Password"} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-center align-middle">
          <Link href="/auth/register">
            <Button type="link">Don't have account</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
