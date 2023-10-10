"use client";

import React from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";

interface RegisterFormType {
  name: string;
  password: string;
  email: string;
}

//회원가입과 같이 사용자 interaction이 있는 곳은 csr로!
//ssr은 사용자와 intercation할 수 없다.
//거기다 왜인지..form.item이 next13에서 에러가 난다. form 태그 고유의 현상인가? 아니면 해당 컴포넌트의 문제인가?
function Register() {
  const onRegister = (value: RegisterFormType) => {
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
        <h1>Register</h1>
        <Form onFinish={onRegister}>
          <Form.Item name="name">
            <Input placeholder={"Name"} />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder={"Email"} />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder={"Password"} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-center align-middle">
          <Link href="/auth/login">
            <Button type="link">Already have an accounts</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
