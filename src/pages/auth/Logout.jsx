import { useState } from "react";
import { Button, Stack, Snackbar, IconButton } from "@mui/material";
import { getAuth } from "firebase/auth";
import CloseIcon from "@mui/icons-material/Close";

const Logout = () => {
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleLogout = () => {
    getAuth()
      .signOut()
      .then(() => {
        setSnackMessage("User logged out");
        setOpenSnack(true);
      });
  };

  const handleWhoAmI = () => {
    const user = getAuth().currentUser;
    if (user) {
      setSnackMessage(user.email);
    } else {
      setSnackMessage("NO USER");
    }
    setOpenSnack(true);
  };

  const handleMyProfile = () => {
    // import { getAuth, updateProfile } from "firebase/auth";
    const user = getAuth().currentUser;
    user.providerData.forEach((profile) => {
      console.log(profile);
    });
    console.log("Email Verified:", user.emailVerified);
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
    <Stack spacing={2} sx={{ m: 2 }} justifyContent="center" direction="row">
      <Button onClick={handleWhoAmI} variant="contained" color="primary">
        Who Am I
      </Button>
      <Button onClick={handleMyProfile} variant="contained" color="primary">
        My Profile
      </Button>
      <Button onClick={handleLogout} variant="outlined" color="secondary">
        Logout
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={openSnack}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
        message={snackMessage}
        action={action}
      />
    </Stack>
  );
};

export default Logout;
