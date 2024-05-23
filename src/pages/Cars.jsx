import { useEffect, useState } from "react";
import { findAll, findOne, del } from "../utils/tools";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress, IconButton, Snackbar, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import {collection, onSnapshot} from "firebase/firestore";
import { db, collection_name } from "../utils/firebase";

import { Link, useNavigate } from "react-router-dom";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("")

  let navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const res = await findAll();
    setCars([...res]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (id) => {
    const res = await findOne(id);
    if (res === undefined) {
      setSnackMessage("Car is not exists");
      setOpenSnack(true);
    } else {
      navigate(`/addcar?id=${id}`);
    }
  };

  const handleDelete = async (id) => {
    del(id);
    setSnackMessage("Car succussfully deleted");
    setOpenSnack(true);
    fetchData();
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
      {loading && <CircularProgress />}
      {!loading && (
        <IconButton component={Link} to="/addcar">
          <Tooltip id="button-report" title="Add new car">
            <AddIcon />
          </Tooltip>
        </IconButton>
      )}
      {cars.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <TableRow
                  key={car.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {car.id}
                  </TableCell>
                  <TableCell>{car.brand}</TableCell>
                  <TableCell>{car.color}</TableCell>
                  <TableCell align="right">{car.price}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleEdit(car.id)}
                      area-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(car.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            open={openSnack}
            autoHideDuration={5000}
            onClose={handleCloseSnack}
            message={snackMessage}
            action={action}
          />
        </TableContainer>
      )}
    </>
  );
};

onSnapshot(collection(db, collection_name), () => {
  console.log("Collection was updated")
})

export default Cars;
