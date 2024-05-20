// https://github.com/mui/material-ui/tree/next/examples/material-ui-vite
// https://github.com/kriasoft/react-starter-kit/tree/main

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import ProTip from './ProTip';
import Copyright from './Copyright';

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI + Route - Vite.js 
        </Typography>
        {/* <ProTip /> */}
        <Copyright />
      </Box>
    </Container>
  )
}

export default App
