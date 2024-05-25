// https://github.com/mui/material-ui/tree/next/examples/material-ui-vite
// https://github.com/kriasoft/react-starter-kit/tree/main

import { Navigate, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Copyright from "./Copyright";
import Header from "./components/nav/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import AddCar from "./pages/AddCar";
import Logout from "./pages/auth/Logout";
import Upload from "./components/upload/Upload";
import UploadList from "./components/upload/UploadList";

function App() {
  return (
    <Container maxWidth="lg">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/addcar" element={<AddCar />} />
        <Route exact path="/upload" element={<Upload />} />
        <Route exact path="/uploadlist" element={<UploadList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Copyright />
    </Container>
  );
}

export default App;
