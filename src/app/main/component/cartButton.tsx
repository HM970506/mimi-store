"use client";

import { Button } from "antd";
import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";

export default function CartButton({ product }: { product: any }) {
  return (
    <Button
      type="primary"
      shape="circle"
      onClick={() => {
        console.log("click", product);
      }}
      icon={<ShoppingCartOutlined />}
    />
  );
}
