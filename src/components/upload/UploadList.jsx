import { useEffect, useState } from "react";
import { storage } from "../../utils/firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  deleteObject,
  getDownloadURL,
  getMetadata,
  listAll,
} from "firebase/storage";
import { Button, IconButton, Link, List, ListItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UploadList = () => {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openContent, setOpenContent] = useState(false);
  const imageRef = ref(storage, "images/");

  const fetchImages = async () => {
    setLoading(true);
    const result = await listAll(imageRef);
    let imagesArray = [];
    result.items.forEach((itemRef) => {
      getDownloadURL(itemRef).then((url) => {
        imagesArray.push({
          name: itemRef.name,
          url: url,
        });
      });
    });
    setImageList(imagesArray);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (name) => {
    const imageRef = ref(storage, "images/" + name);
    deleteObject(imageRef)
      .then(() => {
        console.log(name + " successfully deleted");
      })
      .catch((error) => {
        console.log(error);
      });
    await fetchImages();
    setOpenContent(false);
  };

  return (
    <>
      <List>
        {openContent &&
          imageList.map((item, idx) => (
            <ListItem key={idx}>
              <Link target="_blank" color="inherit" href={item.url}>
                {item.name}
              </Link>
              <IconButton
                onClick={() => handleDelete(item.name)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
      </List>
      {loading && <div>loading...</div>}
      {!loading && (
        <Button
          onClick={() => setOpenContent(!openContent)}
          variant="outlined"
          color="secondary"
        >
          {openContent ? "Hide Content" : "Show Content"}
        </Button>
      )}
    </>
  );
};

export default UploadList;
