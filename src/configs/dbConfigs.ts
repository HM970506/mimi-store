import mongoose from "mongoose";

//서버라 터미널에 뜸!
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_url!); //!은 ts때문에 들어감
    console.log("db connect success");
  } catch (e) {
    console.log("db connect error", e);
  }
};
