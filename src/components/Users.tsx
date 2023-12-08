import { Typography } from '@mui/material';
import { useLazyGetRoomUsersQuery } from 'api';
import React from 'react';
import { socket } from 'store';

interface IUsersProps {
  roomId: string | undefined;
}

export const Users: React.FC<IUsersProps> = ({ roomId }) => {
  const [fetchTrigger, { data = [] }] = useLazyGetRoomUsersQuery();
  React.useEffect(() => {
    fetchTrigger(roomId);
    socket.on('room:updateUsers', () => {
      fetchTrigger(roomId);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);
  // if (isLoading) {
  //   return <h2>Загрузка...</h2>;
  // }

  // if (isError) {
  //   return <h2>Ошибка</h2>;
  // }

  return (
    <ul>
      {data &&
        data.map((user: any, index: any) => (
          <li key={index}>
            <Typography variant="body1" fontSize={20}>
              {user.username}
            </Typography>
          </li>
        ))}
    </ul>
  );
};
