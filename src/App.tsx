import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from 'routes/PrivateRoute';
import { PublicRoute } from 'routes/PublicRoute';
import { login } from 'store/user/user.slice';
import { useReadLocalStorage } from 'usehooks-ts';
import { useAppDispatch } from 'utils/hooks/store';
import { Login } from 'views/LoginPage';
import { Room } from 'views/Room';
import { Rooms } from 'views/Rooms';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from 'components/layout/Header/Header';
import { CssBaseline, useMediaQuery } from '@mui/material';
import ToggleColorModeBtn from 'components/ToggleColorModeBtn';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const currentTheme = prefersDarkMode ? 'dark' : 'light';
  const [mode, setMode] = React.useState<'light' | 'dark'>(currentTheme);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  const dispatch = useAppDispatch();

  const loggedInUser = useReadLocalStorage('user');

  React.useEffect(() => {
    if (loggedInUser) {
      dispatch(login(loggedInUser));
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <ToggleColorModeBtn />
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/*" element={<PrivateRoute />}>
            <Route path="rooms" element={<Rooms />} />
            <Route path="room/:roomId" element={<Room />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
