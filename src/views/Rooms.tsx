import { Container, Grid, Button, Typography, CircularProgress } from '@mui/material';
import { useLazyGetRoomsQuery } from 'api';
import React from 'react';
import { socket } from 'store';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'utils/hooks/store';
import { RootState } from 'utils/@types/store';
import { User } from 'utils/@types/user';

export const Rooms: React.FC = () => {
  const navigate = useNavigate();

  const { currentUser } = useAppSelector((state: RootState) => state.userState);
  
  const [getRooms, { data: users = [] }] = useLazyGetRoomsQuery();

  React.useEffect(() => {
    getRooms();
    socket.on('rooms:update', () => {
      getRooms();
    });

    socket.on('room:join', (roomId) => {
      if (!currentUser) {
        return;
      }
      const userId = currentUser.id;
      onJoinRoom(roomId, userId);
    });

    console.log(window.history);
    // window.history.replaceState({}, '', window.location.pathname);
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const createRoom = () => {
    const socketId = socket?.socket?.id;
    socket.emit('room:create', socketId);
  };
  const onJoinRoom = (roomId: number, userId: string) => {
    console.log({ roomId, userId });
    socket.emit('room:join', { roomId, userId });
    navigate('/room/' + roomId);
  };

  // if (isLoading) {
  //   return <CircularProgress />;
  // }

  return (
    <Container maxWidth="xl" sx={{ pt: 5 }}>
      <Button onClick={createRoom} variant="contained">
        Create Room
      </Button>

      <Grid container spacing={2} sx={{ pt: 5 }}>
        {users ? (
          users.map(({ id }: any) => (
            <Grid item key={id} xs={3}>
              <Button onClick={() => onJoinRoom(id, currentUser!.id)} variant="outlined">
                Room: {id}
              </Button>
            </Grid>
          ))
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Container>
  );
};
