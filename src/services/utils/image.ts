import { 
   ref, 
   uploadBytes,
   getDownloadURL, 
} from 'firebase/storage';

import { FIREBASE_STORAGE } from '../firebase';

const UploadToStorage = async (img: string, endpoint: string) => {
   try {
      const blob = await new Promise<Blob>((resolve, reject) => {
         const xhr = new XMLHttpRequest();
         xhr.onload = () => {
            resolve(xhr.response);
         }
         xhr.onerror = (e: ProgressEvent<EventTarget>) => {
            console.log(e);
            reject(new TypeError("Network request failed"));
         }
         xhr.responseType = "blob";
         xhr.open("GET", img, true);
         xhr.send(null);
      });

      const storageRef = ref(FIREBASE_STORAGE, `${ endpoint }`);
      await uploadBytes(storageRef, blob);

      return await getDownloadURL(storageRef); 
   } catch (err) {
      console.log("Error registering user:", err); // FIXME
      throw err;
   }
};

export { UploadToStorage };