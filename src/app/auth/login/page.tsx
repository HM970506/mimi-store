"use client";

import { requiredRule } from "@/app/message/validations";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import React from "react";
interface LoginType {
  name: string;
  password: string;
  email: string;
}

function Login() {
  const onLogin = (value: LoginType) => {
    console.log(value);
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
            <Button type="primary" htmlType="submit">
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
