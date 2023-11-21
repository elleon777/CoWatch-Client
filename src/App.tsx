import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from 'routes/PrivateRoute';
import { PublicRoute } from 'routes/PublicRoute';
import { login } from 'store/auth/auth.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { Login } from 'views/Login';
import { Room } from 'views/Room';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      dispatch(login(JSON.parse(loggedInUser)));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route path="/room" element={<PrivateRoute />}>
        <Route path="/room" element={<Room />} />
      </Route>
    </Routes>
  );
};

export default App;
