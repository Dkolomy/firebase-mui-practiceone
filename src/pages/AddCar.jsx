import { useEffect, useState } from "react";
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
import { create, update, srvTimestamp, findOne } from "../utils/tools";

const AddCar = () => {
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(false);
  const [brandError, setBrandError] = useState(false);

  const [exists, setExists] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState(
    "Successfully adding new car"
  );

  const queryParameters = new URLSearchParams(window.location.search);
  let carId = queryParameters.get("id");

  const fetchOne = async (id) => {
    const res = await findOne(id);
    if (res === undefined) {
      setExists(false);
      setSnackMessage("Car is not exists");
      setOpenSnack(true);
    } else {
      setExists(true);
      setBrand(res.brand);
      setColor(res.color);
      setPrice(res.price);
      setAvailable(res.available);
    }
  };

  useEffect(() => {
    if (carId) {
      fetchOne(carId);
    }
  }, [carId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setBrandError(false);
    if (brand == "") {
      setBrandError(true);
    }

    if (brand) {
      let args = {
        brand: brand,
        color: color,
        price: price,
        available: available,
        createdAt: srvTimestamp,
      };
      if (exists) {
        args = { id: carId, ...args };
        update(args);
        setSnackMessage("Successfully update car");
      } else {
        create(args);
        setSnackMessage("Successfully adding new car");
      }
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
          {exists ? "Edit Car" : "Add New Car"}
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={openSnack}
          autoHideDuration={5000}
          onClose={handleCloseSnack}
          message={snackMessage}
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
