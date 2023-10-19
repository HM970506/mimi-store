//사용자 주문, 제품, 카테고리 등의 db table 모델을 생성

import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cnt: { type: Number, required: true, default: 0 },
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

const Category =
  mongoose.models["categories"] || mongoose.model("categories", categorySchema);

export default Category;
