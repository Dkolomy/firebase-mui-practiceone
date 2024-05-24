import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";

const Upload = () => {
  const [image, setImage] = useState({});

  const handleFileUpload = (event) => {
    event.preventDefault();
    console.log(image);
    // const file = event.target.files[0];
    // const formData = new FormData();
    // formData.append("file", file);
    // axios.post('/upload', formData)
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(error => {
    //   console.error(error);
    // });
  };

  const handleChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
    }
  };

  return (
    <form onSubmit={handleFileUpload}>
      <FormControl>
        <TextField type="file" onChange={handleChange} />
        <Button variant="contained" color="secondary" type="submit">
          Upload
        </Button>
      </FormControl>
    </form>
  );
};

export default Upload;
