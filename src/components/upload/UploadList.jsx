import { useEffect, useState } from "react";
import { storage } from "../../utils/firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
  listAll,
} from "firebase/storage";
import { List, ListItem } from "@mui/material";

const UploadList = () => {
  const [imageList, setImageList] = useState(false);
  const imageRef = ref(storage, "images/");

  const fetchImages = async () => {
    const result = await listAll(imageRef);
    setImageList(result.items);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <List>
      {imageList
        ? imageList.map((item, idx) => (
            <ListItem key={idx}>{item.name}</ListItem>
          ))
        : null}
    </List>
  );
};

export default UploadList;
