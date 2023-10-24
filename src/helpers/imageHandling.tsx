import { firebase } from "@/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const getUploadedImage = async (files: any) => {
  try {
    const storage = getStorage(firebase);

    //이미지를 업로드하고 참조를 가져옴
    const imageRefs = await Promise.all(
      files.map((file: any) => {
        const path = ref(storage, `products/${file.name}`);
        return uploadBytes(path, file);
      })
    );

    //참조에서 이미지 url 추출
    const imageUrls = await Promise.all(
      imageRefs.map((imageRef: any) => {
        getDownloadURL(imageRef.ref);
      })
    );

    return imageUrls;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
