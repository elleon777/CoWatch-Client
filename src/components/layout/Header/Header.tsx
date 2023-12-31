import { Paper, Container, IconButton, useTheme } from '@mui/material';
import { ColorModeContext } from 'App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';

function Header() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Container maxWidth="xl" sx={{ p: '20px 0' }}>
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Paper>
    </Container>
  );
}

export default Header;
