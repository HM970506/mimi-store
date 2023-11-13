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

      const response = await axios.get(`/api/products/${params.productid}`);
      setProduct(response.data);

      const imageFiles = await Promise.all(
        response.data.images.map(async (url: string, key: number) => {
          const imageUrl = url;
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const fileName = `image_${key}`;

          const file: UploadFile<any> = {
            uid: fileName,
            name: fileName,
            status: "done", // 파일 상태를 나타내는 값입니다.
            url: imageUrl, // 파일의 다운로드 URL입니다.
            thumbUrl: imageUrl, // 필요한 경우 썸네일 URL을 지정할 수 있습니다.
            size: blob.size, // 파일 크기
            type: blob.type, // 파일 타입
          };
          return file;
        })
      );

      console.log(imageFiles);
      setSelectedFiles(imageFiles);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const editProductSave = async (value: any) => {
    try {
      setLoading(true);

      //기존 이미지 삭제
      const imageReset = await removeBeforeData(value.name);

      const imagesUrls = await getUploadedImage(value.name, selectedFiles);
      value.images = imagesUrls;
      await axios.put(`/api/products/${params.productid}`, value);
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
          selectedFiles={selectedFiles}
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
