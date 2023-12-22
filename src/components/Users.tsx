import { Typography } from '@mui/material';
import { useLazyGetRoomUsersQuery } from 'api';
import React from 'react';
import { socket } from 'store';
import { useMap } from 'usehooks-ts';
import { RoomRole } from 'utils/enums';
import { videoTimeFormat } from 'utils/helpers/videoTimeFormat';

interface IUsersProps {
  roomId: string | undefined;
}

export const Users: React.FC<IUsersProps> = ({ roomId }) => {
  const [fetchTrigger, { data = [] }] = useLazyGetRoomUsersQuery();
  const [usersMap, actionsUsersMap] = useMap()

  React.useEffect(() => {
    fetchTrigger(roomId);
    socket.on('room:updateUsers', () => {
      fetchTrigger(roomId);
    });
    socket.on('player:userTime', ({ currentUser, currentTime }) => {
      const formatTime = videoTimeFormat(Math.ceil(currentTime));
      actionsUsersMap.set(currentUser.id, formatTime);
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
              {user.username} {user.roomRole === RoomRole.Host && `(${user.roomRole})`}{' '}
              {usersMap.get(user.id) || '00:00'}
            </Typography>
          </li>
        ))}
    </ul>
  );
};
