import { firebase } from "@/firebase";
import { UploadFile } from "antd";
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
      files.map(async (file: any, key: number) => {
        const storageRef = ref(
          storage,
          `products/${productName}/image_${makeId()}.png`
        );

        if (file.originFileObj)
          return uploadBytes(storageRef, file.originFileObj as Blob);
        else {
          const response = await fetch(file.url);
          const blob = await response.blob();

          return uploadBytes(storageRef, blob);
        }
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

export const editImages = async (productName: string, files: any) => {
  const storage = getStorage(firebase);

  //해당 폴더의 이미지 목록을 가져옴
  const listRef = ref(storage, `products/${productName}`);
  const beforeList = (await listAll(listRef)) || [];

  //새 이미지들을 저장함
  const imagesUrls = await getUploadedImage(productName, files);

  //기존 목록을 삭제함
  const response = await Promise.all(
    beforeList.items.map((item) => {
      const desertRef = ref(storage, `products/${productName}/${item.name}`);
      const deleteResponse = deleteObject(desertRef);
      return deleteResponse;
    })
  );

  return imagesUrls;
};

export const makeId = () => {
  const currentTime = new Date().getTime(); // 현재 시간을 밀리초로 가져옴
  const randomValue = Math.floor(Math.random() * 10000); // 0부터 9999까지의 랜덤 값 생성
  const stringId = `${currentTime}${randomValue}`; // 현재 시간과 랜덤 값으로 문자열 ID 생성
  return stringId;
};
