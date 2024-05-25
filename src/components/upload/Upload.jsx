import { useState } from "react";
import {
  Button,
  FormControl,
  TextField,
  IconButton,
  Snackbar,
  LinearProgress,
  Divider,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { storage } from "../../utils/firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";

const Upload = () => {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState({});
  const [imageLink, setImageLink] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  // https://www.youtube.com/watch?v=YOAeBSCkArA
  const handleFileUpload = (event) => {
    event.preventDefault();
    if (image == null) return;
    let uuid = crypto.randomUUID() + ".";
    const imageRef = ref(storage, `images/${uuid + image.name}`);
    const metadata = {
      contentType: image.type,
    };

    uploadBytes(imageRef, image, metadata)
      .then(() => {
        setSnackMessage("File uploaded successfully");
      })
      .catch((error) => {
        setSnackMessage(error.code);
        console.log(error);
      });
    setOpenSnack(true);
  };

  const handleFileUploadTask = (event) => {
    event.preventDefault();
    if (image == null) return;
    let uuid = crypto.randomUUID() + ".";
    const imageRef = ref(storage, `images/${uuid + image.name}`);
    const metadata = {
      contentType: image.type,
      customMetadata: {
        dkolomyData: "Dmitry Kolomyitsev",
      },
    };

    const uploadTask = uploadBytesResumable(imageRef, image, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress1 =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress1);
        console.log("Upload is " + progress1 + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        // https://firebase.google.com/docs/storage/web/handle-errors
        setSnackMessage(error.code);
        setOpenSnack(true);
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageLink(downloadURL);
          console.log("File available at", downloadURL);
        });
        //setProgress(0);

        getMetadata(imageRef, image)
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error.code);
          });

        setSnackMessage("File uploaded successfully");
        setOpenSnack(true);
      }
    );
  };

  const handleChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
    }
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        area-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    // <form onSubmit={handleFileUpload}>
    <form onSubmit={handleFileUploadTask}>
      <FormControl>
        <TextField type="file" onChange={handleChange} />
        <Button variant="contained" color="secondary" type="submit">
          Upload File
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={openSnack}
          autoHideDuration={5000}
          onClose={handleCloseSnack}
          message={snackMessage}
          action={action}
        />
      </FormControl>
      <Divider textAlign="center">Progress</Divider>
      <LinearProgress variant="determinate" value={progress} />
      {imageLink && (
        <Link target="_blank" href={imageLink}>
          {image.name}
        </Link>
      )}
    </form>
  );
};

export default Upload;
