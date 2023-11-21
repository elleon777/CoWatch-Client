import React from 'react';
import { Container, Grid } from '@mui/material';
import videojs from 'video.js';
import VideoJS from 'components/VideoJS';
import { Users } from 'components/Users';
import { useAppDispatch, useAppSelector } from 'utils/hooks/store';
import { fetchUsers } from 'store/users/users.action';
import axios from 'axios';
import { RootState } from 'utils/@types/store';
import { logout } from 'store/auth/auth.slice';
import { User } from 'utils/@types/users';

// const socket = io('http://localhost:9999/', { transports: ['websocket'] });

export const Room: React.FC = () => {
  // React.useEffect(() => {
  //   socket.on('connect', function () {
  //     console.log('Подключение успешно', socket.id);
  //   });
  //   socket.on('sync', (currentTime) => {
  //     syncTime(currentTime);
  //   });
  //   socket.on('syncPlay', () => {
  //     playerRef.current.play();
  //   });
  //   socket.on('syncPause', () => {
  //     playerRef.current.pause();
  //   });
  //   socket.on('syncRequestVideo', (src) => {
  //     setSrcVideo(src);
  //   });
  //   return () => {
  //     socket.removeAllListeners();
  //     socket.disconnect();
  //   };
  // }, []);
  // const [request, setRequest] = React.useState<string>('');
  const [srcVideo, setSrcVideo] = React.useState<string>(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  );
  const playerRef = React.useRef<any>(null);

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
      // videojs.log('click control');
    });

    player.on('play', () => {
      videojs.log('player play');
      // ServerSync.playVideo();
      // serverSyncPlay();
    });

    player.on('pause', () => {
      videojs.log('player pause');
      // ServerSync.pauseVideo();
      // serverSyncPause();
    });
  };

  function syncTime(currentTime: number): void {
    if (!playerRef) {
      return;
    }
    playerRef.current.pause();
    playerRef.current.currentTime(currentTime);
  }
  // function serverSync(): void {
  //   socket.emit('sendTime', playerRef.current.currentTime());
  // }
  // function serverSyncPlay(): void {
  //   socket.emit('playVideo');
  // }
  // function serverSyncPause(): void {
  //   socket.emit('pauseVideo');
  // }
  // function requestVideo(src: string): void {
  //   socket.emit('requestVideo', src);
  // }

  
  return (
    <Container maxWidth="xl">
      <Grid container>
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
