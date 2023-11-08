import mongoose from "mongoose";

//
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_mongo_url!); //!은 ts때문에 들어감
    console.log("db connect success");
  } catch (e) {
    console.log("db connect error", e);
  }
};
