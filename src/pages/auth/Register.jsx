import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password1Error, setPassword1Error] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setEmailError(false);
    setPassword1Error(false);
    setPassword2Error(false);

    if (email == "") {
      setEmailError(true);
    }
    if (password1 == "") {
      setPassword1Error(true);
    }
    if (password2 == "") {
      setPassword2Error(true);
    }

    if (password1 !== password2) {
      setPassword1Error(true);
      setPassword2Error(true);
    }

    if (email && password1 && password2) {
      console.log(email, password1, password2);
      setOpenSnack(true);
    }
  }

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
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit} action={<Link to="/login" />}>
        <TextField
          type="email"
          variant="outlined"
          color="secondary"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{ mb: 4 }}
          error={emailError}
        />
        <TextField
          type="password"
          variant="outlined"
          color="secondary"
          label="Password"
          onChange={(e) => setPassword1(e.target.value)}
          value={password1}
          fullWidth
          required
          sx={{ mb: 4 }}
          error={password1Error}
        />
        <TextField
          type="password"
          variant="outlined"
          color="secondary"
          label="Retypr password"
          onChange={(e) => setPassword2(e.target.value)}
          value={password2}
          fullWidth
          required
          sx={{ mb: 4 }}
          error={password2Error}
        />
        <Button variant="outlined" color="secondary" type="submit">
          Register
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={openSnack}
          autoHideDuration={5000}
          onClose={handleCloseSnack}
          message="Successfully Registered"
          action={action}
        />
      </form>
      <small>
        Already have an account? <Link to="/login">Login Here</Link>
      </small>
    </>
  );
};

export default Register;
