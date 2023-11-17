import { Container, Grid } from '@mui/material';
import React from 'react';
import { io } from 'socket.io-client';
import VideoJS from './components/VideoJS';
import Header from 'components/layout/Header/Header';
import videojs from 'video.js';
import { Login } from 'views/Login';
import { getUsers } from 'store/users/users.action';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from 'utils/hooks/store';
// import { Header } from 'components/layout';

const linkSocket = 'http://localhost:9999/';
// const linkSocket = process.env.REACT_APP_API_URL || 'http://localhost:9999/';

const socket = io(linkSocket, { transports: ['websocket'] });
// const ServerSync = ServerSyncController(socket);

function App() {
  React.useEffect(() => {
    socket.on('connect', function () {
      console.log('Подключение успешно', socket.id);
    });
    socket.on('sync', (currentTime) => {
      syncTime(currentTime);
    });
    socket.on('syncPlay', () => {
      playerRef.current.play();
    });
    socket.on('syncPause', () => {
      playerRef.current.pause();
    });
    socket.on('syncRequestVideo', (src) => {
      setSrcVideo(src);
    });
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);
  // const [request, setRequest] = React.useState<string>('');
  const [srcVideo, setSrcVideo] = React.useState<string>(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  );
  const playerRef = React.useRef<any>(null);
  // const ServerSync = React.useCallback(() => CreateServerSync(socket), []);

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
      videojs.log('click control');
    });

    player.on('play', () => {
      videojs.log('player play');
      // ServerSync.playVideo();
      serverSyncPlay();
    });

    player.on('pause', () => {
      videojs.log('player pause');
      // ServerSync.pauseVideo();
      serverSyncPause();
    });
  };

  function syncTime(currentTime: number): void {
    if (!playerRef) {
      return;
    }
    playerRef.current.pause();
    playerRef.current.currentTime(currentTime);
    // playerRef.current.play();
  }
  function serverSync(): void {
    socket.emit('sendTime', playerRef.current.currentTime());
  }
  function serverSyncPlay(): void {
    socket.emit('playVideo');
  }
  function serverSyncPause(): void {
    socket.emit('pauseVideo');
  }
  function requestVideo(src: string): void {
    socket.emit('requestVideo', src);
  }
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="App">
      {/* <Header ServerSync={ServerSync} player={playerRef.current} /> */}
      <Login />
      <Container maxWidth="xl">
        <Grid container>
          <Grid item lg={8} xs={12}>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </Grid>
          <Grid item lg={4} xs={12}>
            <button onClick={serverSync}>SYNC</button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
