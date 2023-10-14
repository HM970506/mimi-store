//사용자 주문, 제품, 카테고리 등의 db table 모델을 생성

import mongoose, { mongo } from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    deliveryAddresses: { type: Array, default: [], required: false },
    isActive: { type: Boolean, default: true, required: false }, //결제방법
    isAdmin: { type: Boolean, default: false, required: false },
  },
  {
    timestamps: true,
  }
);

export default  mongoose.models["users"] || mongoose.model("users", userSchema));
