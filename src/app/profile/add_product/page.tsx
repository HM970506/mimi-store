"use client";

import React, { useState } from "react";
import ProductForm from "../component/ProductForm";
import axios from "axios";
import { UploadFile, message } from "antd";
import { useRouter } from "next/navigation";
import { getUploadedImage } from "@/helpers/imageHandling";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<UploadFile<any>[]>([]);
  const router = useRouter();

  const addProduct = async (value: any) => {
    try {
      setLoading(true);
      const imagesUrls = await getUploadedImage(value.name, selectedFiles);

      value.images = imagesUrls;
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
      <ProductForm
        onFinish={addProduct}
        setSelectedFiles={setSelectedFiles}
        loading={loading}
      />
    </div>
  );
}
