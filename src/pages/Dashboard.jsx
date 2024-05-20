import { Box, Typography } from "@mui/material";
import ProTip from "../ProTip";

const Dashboard = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }} align="center">
        Material UI + Route - Vite.js
      </Typography>
      <ProTip />
    </Box>
  );
};

export default Dashboard;
