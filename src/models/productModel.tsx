//사용자 주문, 제품, 카테고리 등의 db table 모델을 생성

import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      require: true,
    },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, required: true, default: 100 },
    images: { type: Array, reqiure: true, default: [] },
    created: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//새로 만들어질 경우 기존 모델 삭제
if (mongoose.models && mongoose.models["products"])
  delete mongoose.models["products"];

const Product =
  mongoose.models["products"] || mongoose.model("products", productSchema);

export default Product;
