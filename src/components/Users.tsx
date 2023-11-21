import React from 'react';

import { useAppDispatch, useAppSelector } from 'utils/hooks/store';
import { RootState } from 'utils/@types/store';
import { fetchUsers } from 'store/users/users.action';

export const Users = () => {
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const usersArr = useAppSelector((state: RootState) => state.usersState);
  return (
    <>
      {usersArr.users.map((user, index) => (
        <li key={index}>{user.username}</li>
      ))}
    </>
  );
};
