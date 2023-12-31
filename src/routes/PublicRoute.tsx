import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'utils/@types/store';
import { useAppSelector } from 'utils/hooks/store';



export const PublicRoute: React.FC = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.userState);
  return !isAuth ? <Outlet /> : <Navigate to="/rooms" />;
};
