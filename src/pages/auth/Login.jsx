import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email == "") {
      setEmailError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }

    if (email && password) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          console.log("Email Verified:", response.user.emailVerified);
          // response.user.sendEmailVerification().then(() => {
          //   console.log('mail send');
          // });
          // const user = userCredential.user;
          // console.log(user);
          setSnackMessage("Successfully Logged In");
          setOpenSnack(true);
        })
        .catch((error) => {
          // https://firebase.google.com/docs/reference/js/auth
          // readonly INVALID_LOGIN_CREDENTIALS: "auth/invalid-credential";
          const errorCode = error.code;
          //        const errorMessage = error.message;
          //        console.log(errorCode, errorMessage);
          setSnackMessage(errorCode);
          setOpenSnack(true);
        });

      console.log(email, password);
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
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <TextField
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="email"
          sx={{ mb: 3 }}
          fullWidth
          value={email}
          error={emailError}
        />
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          color="secondary"
          type="password"
          sx={{ mb: 3 }}
          fullWidth
          value={password}
          error={passwordError}
        />
        <Button variant="outlined" color="secondary" type="submit">
          Login
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
        Need an account? <Link to="/register">Register here</Link>
      </small>
    </>
  );
};

export default Login;
