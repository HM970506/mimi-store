//서버사이드 컴포넌트

import axios from "axios";
import React, { useEffect, useState } from "react";
import { cookies } from "next/headers";

//서버에서 데이터 주고받기
//클라이언트에서는 자동으로 쿠키 넣어주지만, 서버에서는 브라우저에 직접 접근이 불가능하므로 수동으로 넣어야 한다
async function getProducts() {
  try {
    const cookiStore = cookies();
    const token = cookiStore.get("token")?.value;

    //env에 도메인 정의. 이후 배포된 도메인으로 해당 env를 교체해주면 됨
    const endPoint = `${process.env.domain}/api/products/get`;

    const response = await axios.post(endPoint, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    return response.data.data || [];
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export default async function MainList() {
  const products = await getProducts();
  return (
    <div className="flex flex-wrap m-10">
      {products.map((product: any, key: number) => {
        return (
          <div
            className="bg-bg-element1 rounded-lg shadow-md transition duration-250 ease-in
             transform hover:shadow-lg hover:-translate-y-px m-4 overflow-hidden flex flex-col
             w-80 h-80 "
            // style={{ width: "300px", height: "300px" }}
            key={`product_${key}`}
          >
            <div className="flex justify-center align-middle h-4/5">
              <img
                src={product.images[0]}
                alt="product image"
                className="object-contain w-60"
              />
            </div>
            <p className="m-5"> {product.name}</p>
          </div>
        );
      })}
    </div>
  );
}
