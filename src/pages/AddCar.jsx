import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddCar = () => {
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(false);
  const [brandError, setBrandError] = useState(false);

  const [openSnack, setOpenSnack] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setBrandError(false);
    if (brand == "") {
      setBrandError(true);
    }

    if (brand) {
      console.log(brand, color, price, available);
      setOpenSnack(true);
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
    <>
      <form onSubmit={handleSubmit}>
        <h2>Input new car info</h2>
        <FormControlLabel
          control={
            <Switch
              value={available}
              onChange={() => setAvailable(!available)}
            />
          }
          label="Available"
        />
        <TextField
          label="Brand"
          onChange={(e) => setBrand(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          value={brand}
          error={brandError}
        />
        <TextField
          label="Color"
          onChange={(e) => setColor(e.target.value)}
          variant="outlined"
          color="secondary"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          value={color}
        />
        <TextField
          label="Price"
          onChange={(e) => setPrice(e.target.value)}
          variant="outlined"
          color="secondary"
          type="number"
          sx={{ mb: 3 }}
          fullWidth
          value={price}
        />
        <Button variant="outlined" color="secondary" type="submit">
          Add to the car list
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={openSnack}
          autoHideDuration={5000}
          onClose={handleCloseSnack}
          message="Successfully adding new car"
          action={action}
        />
      </form>
      <small>
        <Link to="/cars">Back to car list</Link>
      </small>
    </>
  );
};

export default AddCar;
