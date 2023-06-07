import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebaseConfig";
export const uploadImg = async (path, file, { PCB, cb, cbError }) => {
  const reference = ref(storage, path ? path : "images/" + Date.now());
  const uploadTask = uploadBytesResumable(reference, file);
  let res = await new Promise((res, rej) =>
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (PCB) PCB(progress);
      },
      (error) => {
        console.log(error);
        if (cbError) cbError();
        rej(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (cb) cb(downloadURL);
          res(downloadURL);
        });
      }
    )
  );
  return res;
};
export const checkIfItsUser = (id) =>
  JSON.parse(localStorage.getItem("userInfo"))?.user._id == id;
