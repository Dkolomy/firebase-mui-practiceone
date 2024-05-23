import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App.jsx";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import "./utils/firebase";
import { getAuth } from "firebase/auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

getAuth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.email);
    console.log(user.uid);
  } else {
    console.log("no user");
  }
});
