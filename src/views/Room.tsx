import React from 'react';
import { Container, Grid } from '@mui/material';
import VideoJS from 'components/VideoJS';
import { Users } from 'components/Users';
import { useAppDispatch } from 'utils/hooks/store';

import { socket } from 'store';
import { RequestVideo } from 'components/RequestVideo';
import { useParams } from 'react-router-dom';

export const Room: React.FC = () => {
  const { roomId } = useParams();
  React.useEffect(() => {
    //TODO loop bug is live
    // может быть паузить только по клику/пробелу?
    // связан скорее всего с буфуризацией или интернетом так как не удается определить паттерн бага
    // мб попробовать синхронищировать буферизацию, тип запретить воспроизведение пока
    // буферизация не пройдет полностью после смены времени
    socket.on('sync', (currentTime) => {
      syncTime(currentTime);
    });
    socket.on('syncPlay', () => {
      playerRef.current.play();
    });
    socket.on('syncPause', () => {
      playerRef.current.pause();
    });
    // socket.on('syncRequestVideo', (src) => {
    //   setSrcVideo(src);
    // });
    return () => {};
  }, []);
  const playerRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (playerRef.current) {
      serverSync();
    }
  }, [playerRef.current]);

  const [srcVideo, setSrcVideo] = React.useState<string>(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  );
  const dispatch = useAppDispatch();

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: srcVideo,
        type: 'video/mp4',
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
    const progressControl = player.controlBar.progressControl;
    progressControl.on('mouseup', () => {
      serverSync();
    });
    player.on('play', () => {
      serverSyncPlay();
    });
    player.on('pause', () => {
      serverSyncPause();
    });

    // player.on('timeupdate', () => {
    //   console.log(Math.ceil(playerRef.current.currentTime()))
    // });
  };

  function syncTime(currentTime: number): void {
    if (!playerRef) {
      return;
    }
    playerRef.current.currentTime(currentTime);
    playerRef.current.pause();
  }
  function serverSync(): void {
    const obj = {
      currentTime: playerRef.current.currentTime(),
      roomId,
    };
    socket.emit('sendTime', obj);
  }
  function serverSyncPlay(): void {
    socket.emit('playVideo', roomId);
  }
  function serverSyncPause(): void {
    socket.emit('pauseVideo', roomId);
  }
  function serverSendTime(): void {
    socket.emit('sendTime');
  }
  // function requestVideo(src: string): void {
  //   socket.emit('requestVideo', src);
  // }

  return (
    <Container maxWidth="xl" sx={{ pt: 5 }}>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <RequestVideo />
        </Grid>
        <Grid item lg={8} xs={12}>
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </Grid>
        <Grid item lg={4} xs={12}>
          {/* <button onClick={serverSync}>SYNC</button> */}
          <Users />
        </Grid>
      </Grid>
    </Container>
  );
};