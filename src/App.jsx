// https://github.com/mui/material-ui/tree/next/examples/material-ui-vite
// https://github.com/kriasoft/react-starter-kit/tree/main

import { Navigate, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Copyright from "./Copyright";
import Header from "./components/nav/Header";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Cars from "./pages/Cars";

function App() {
  return (
    <Container maxWidth="sm">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Copyright />
    </Container>
  );
}

export default App;
