import { Container, Grid, Button, Typography } from '@mui/material';
import { useGetRoomsQuery } from 'api/roomsApi';
import React from 'react';
import { socket } from 'store';
import { useNavigate } from 'react-router-dom';

export const Rooms: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetRoomsQuery();
  React.useEffect(() => {
    console.log(data);
  }, [data]);
  const createRoom = () => {
    const socketId = socket?.socket?.id;
    socket.emit('createRoom', socketId);
  };
  const onJoinRoom = (id) => {
    socket.emit('joinRoom', id);
    navigate('/room/' + id);
  };
  return (
    <Container maxWidth="xl" sx={{ pt: 5 }}>
      <Button onClick={createRoom} variant="contained">
        +
      </Button>
      {/* <Button onClick={checkRoom} variant="contained">
        Room
      </Button> */}
      <Grid container spacing={2}>
        {data ? data.map((id) => (
          <Grid item key={id} xs={3}>
            <Button onClick={() => onJoinRoom(id)} variant="outlined">
              Room: {id}
            </Button>
            
          </Grid>
        )) : <Typography variant="h3">Комнат нет</Typography>}
      </Grid>
    </Container>
  );
};
