"use client";

import { UploadFile, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "../../component/ProductForm";
import { getUploadedImage, removeBeforeData } from "@/helpers/imageHandling";
import Loading from "@/app/loading";

function EditProduct({ params }: { params: any }) {
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<UploadFile<any>[]>([]);
  const [product, setProduct] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`/api/products/${params.producid}`);
      setProduct(response.data);
      setSelectedFiles(response.data.images || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const editProductSave = async (value: any) => {
    try {
      setLoading(true);

      await removeBeforeData(value.name);
      //수정시 aws에 올라가 있던 기존 이미지들은 전부 삭제

      const imagesUrls = await getUploadedImage(value.name, selectedFiles);
      value.images = imagesUrls;
      await axios.post(`/api/products/${params.productid}`, value);
      message.success("물품 수정 성공");
      router.push("/profile?id=1");
    } catch (e) {
      console.error(e);
      message.error("물품 수정 실패");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {product ? (
        <ProductForm
          onFinish={editProductSave}
          setSelectedFiles={setSelectedFiles}
          loading={loading}
          initValue={product}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default EditProduct;
