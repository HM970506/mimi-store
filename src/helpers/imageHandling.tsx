import { firebase } from "@/firebase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

export const removeBeforeData = async (productName: string) => {
  const storage = getStorage(firebase);

  //해당 폴더의 이미지 목록을 가져옴
  const listRef = ref(storage, `products/${productName}`);
  const imageList = (await listAll(listRef)) || [];

  //가져온 모든 이미지 목록을 삭제함
  const response = await Promise.all(
    imageList.items.map((item) => {
      const desertRef = ref(storage, `products/${productName}/${item.name}`);
      const deleteResponse = deleteObject(desertRef);
      return deleteResponse;
    })
  );
  return response;
};

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
