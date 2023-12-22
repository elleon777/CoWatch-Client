import React from 'react';
import { Container, Grid } from '@mui/material';
import VideoJS from 'components/VideoJS';
import { Users } from 'components/Users';
import { useAppSelector } from 'utils/hooks/store';
import { socket } from 'store';
import { RequestVideo } from 'components/RequestVideo';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from 'utils/@types/store';
import { createVideoPlayController } from 'utils/helpers/videoPlayController';

import 'videojs-contrib-quality-levels';
import 'videojs-http-source-selector';

export const Room: React.FC = () => {
  const { roomId } = useParams();
  const { currentUser } = useAppSelector((state: RootState) => state.userState);
  const navigate = useNavigate();

  const [srcVideo, setSrcVideo] = React.useState<string>('');
  const [videoPlayController, setVideoPlayController] = React.useState<{
    play: () => void;
    reInit: () => void;
  } | null>(null);

  const playerRef = React.useRef<any>(null);

  React.useEffect(() => {
    socket.on('player:syncTime', (currentTime) => {
      syncTime(currentTime);
    });
    socket.on('player:syncPlay', () => {
      console.log('player:syncPlay');
      playerRef.current.one('canplay', () => {
        playerRef.current.play();
      });
    });
    socket.on('player:syncPause', () => {
      console.log('player:syncPause');
      playerRef.current.pause();
    });
    socket.on('player:syncRequestVideo', (src) => {
      // setSrcVideo(src);
      playerRef.current.src({ type: 'video/mp4', src: src + '#t=0.5' });
    });
    console.log(currentUser);
    return () => {
      const userId = currentUser?.id;
      socket.emit('room:leave', { roomId, userId });
      socket.removeAllListeners();
    };
  }, []);

  React.useEffect(() => {
    const controller = createVideoPlayController(playerRef.current);
    setVideoPlayController(controller);
  }, [playerRef.current]);

  function createSendTimeUsers() {
    let oldCurrentTime = 0;
    return () => {
      const currentTime = Math.ceil(playerRef.current.currentTime());
      if (currentTime !== oldCurrentTime) {
        socket.emit('player:userTime', { roomId, currentUser, currentTime });
        oldCurrentTime = currentTime;
      }
    };
  }
  const sendTimeUsers = createSendTimeUsers();

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    preload: 'metadata',
    sources: [
      {
        type: 'video/mp4',
        src: 'https://video1.anilib.me//uploads/converted_videos/11047/11047_1080.mp4',
        size: '1080',
      },
      {
        type: 'video/mp4',
        src: 'https://video1.anilib.me//uploads/converted_videos/11047/11047_720.mp4',
        size: '720',
      },
      {
        type: 'video/mp4',
        src: 'https://video1.anilib.me//uploads/converted_videos/11047/11047_360.mp4',
        size: '360',
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    player.httpSourceSelector();
    playerRef.current = player;
    const progressControl = player.controlBar.progressControl;

    progressControl.on('mouseup', () => {});
    player.on('canplay', () => {
      console.log('client canplay');
    });
    player.on('play', () => {
      serverSync();
      serverSyncPlay();
      videoPlayController?.play();
    });
    player.on('pause', () => {
      serverSyncPause();
      videoPlayController?.reInit();
    });
    player.on('timeupdate', () => {
      sendTimeUsers();
    });
  };

  function syncTime(currentTime: number): void {
    if (!playerRef) {
      return;
    }
    playerRef.current.currentTime(currentTime);
  }
  function serverSync(): void {
    const obj = {
      currentTime: playerRef.current.currentTime(),
      roomId,
    };
    socket.emit('player:syncTime', obj);
  }
  function serverSyncPlay(): void {
    socket.emit('player:play', roomId);
  }
  function serverSyncPause(): void {
    socket.emit('player:pause', roomId);
  }

  function requestVideo(src: string): void {
    const obj = {
      src,
      roomId,
    };
    socket.emit('player:requestVideo', obj);
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 5 }}>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <RequestVideo requestVideo={requestVideo} />
        </Grid>
        <Grid item lg={8} xs={12}>
          <div>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
        </Grid>
        <Grid item lg={4} xs={12}>
          <button onClick={serverSync}>SYNC</button>
          <button onClick={sendTimeUsers}>SendTime</button>
          <Users roomId={roomId} />
        </Grid>
      </Grid>
    </Container>
  );
};
