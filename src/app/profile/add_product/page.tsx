"use client";

import React, { useState } from "react";
import ProductForm from "../component/ProductForm";

export default function AddProduct() {
  const [selectedFiles, setSelecteFiles] = useState<[]>([]);
  return (
    <div>
      <ProductForm
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelecteFiles}
      />
    </div>
  );
}
