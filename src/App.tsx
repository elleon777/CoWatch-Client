import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from 'routes/PrivateRoute';
import { PublicRoute } from 'routes/PublicRoute';
import { login } from 'store/user/user.slice';
import { useAppDispatch } from 'utils/hooks/store';
import { Login } from 'views/LoginPage';
import { Room } from 'views/Room';
import { Rooms } from 'views/Rooms';

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
        <Route index element={<Login />} />
      </Route>
      <Route path="/*" element={<PrivateRoute />}>
        <Route path="rooms" element={<Rooms />} />
        <Route path="room/:roomId" element={<Room />} />
      </Route>
    </Routes>
  );
};

export default App;
