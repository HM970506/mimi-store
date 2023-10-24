"use client";

import React, { useState } from "react";
import ProductForm from "../component/ProductForm";
import axios from "axios";
import { message } from "antd";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const addProduct = async (value: any) => {
    try {
      setLoading(true);
      value.images = []; //임시값
      console.log(value);
      await axios.post("/api/products/set", value);
      message.success("물품 추가 성공");
      router.push("/profile?id=1");
    } catch (e) {
      console.error(e);
      message.error("물품 추가 실패");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <ProductForm onFinish={addProduct} loading={loading} />
    </div>
  );
}
