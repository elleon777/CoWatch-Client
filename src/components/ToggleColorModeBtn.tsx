import { Paper, Container, IconButton, useTheme, Fab } from '@mui/material';
import { ColorModeContext } from 'App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';

function ToggleColorModeBtn() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Fab
      sx={{
        position: 'fixed',
        bottom: (theme) => theme.spacing(5),
        right: (theme) => theme.spacing(5),
      }}
      size="large"
      onClick={colorMode.toggleColorMode}
      color="secondary">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </Fab>
  );
}

export default ToggleColorModeBtn;
