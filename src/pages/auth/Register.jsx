import { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextField, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { auth } from "../../utils/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    setPassword2Error(false);

    if (email == "") {
      setEmailError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }
    if (password2 == "") {
      setPassword2Error(true);
    }

    if (password !== password2) {
      setPasswordError(true);
      setPassword2Error(true);
    }

    if (email && password && password2) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // const user = userCredential.user;
          // console.log(user);
          setSnackMessage("Successfully Registered");
          setOpenSnack(true);
        })
        .catch((error) => {
          // https://firebase.google.com/docs/reference/js/auth
          // readonly EMAIL_EXISTS: "auth/email-already-in-use";
          const errorCode = error.code;
          //          const errorMessage = error.message;
          setSnackMessage(errorCode);
          setOpenSnack(true);
        });
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          fullWidth
          required
          sx={{ mb: 4 }}
          error={passwordError}
        />
        <TextField
          type="password"
          variant="outlined"
          color="secondary"
          label="Retype password"
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
          message={snackMessage}
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
