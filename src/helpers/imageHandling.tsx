import { firebase } from "@/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const getUploadedImage = async (productName: string, files: any) => {
  try {
    //이미지를 업로드하고 참조를 가져옴
    const storage = getStorage(firebase);
    const imageRefs = await Promise.all(
      files.map((file: any) => {
        const storageRef = ref(storage, `products/${productName}/${file.name}`);
        return uploadBytes(storageRef, file);
      })
    );

    //참조에서 이미지 url 추출
    const imageUrls = await Promise.all(
      imageRefs.map((imageRef: any) => {
        return getDownloadURL(imageRef.ref);
      })
    );

    return imageUrls;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
