import React from 'react';
import { Container, Grid } from '@mui/material';
import VideoJS from 'components/VideoJS';
import { Users } from 'components/Users';
import { useAppDispatch, useAppSelector } from 'utils/hooks/store';
import { useNavigate } from 'react-router-dom';
import { socket } from 'store';
import { RequestVideo } from 'components/RequestVideo';
import { useParams } from 'react-router-dom';
import { RootState } from 'utils/@types/store';
// import videojsQualitySelector from '@silvermine/videojs-quality-selector';

export const Room: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { currentUser } = useAppSelector((state: RootState) => state.userState);
  const dispatch = useAppDispatch();

  const playerRef = React.useRef<any>(null);
  const playVideo = async (): Promise<void> => {
    try {
      if (playerRef.current.paused) {
        await playerRef.current.play();
      }
    } catch (err) {
      console.error(err);
      serverSyncPause();
    }
  };

  React.useEffect(() => {
    return () => {
      socket.emit('room:leave', { roomId, currentUser });
    };
  }, []);

  React.useEffect(() => {
    // player events
    //TODO loop bug is live https://github.com/elan-ev/opencast-studio/issues/581
    // canplay, loadeddata
    // Uncaught (in promise) DOMException: The fetching process for the media resource was aborted by the user agent at the user's request.

    socket.on('sync', (currentTime) => {
      syncTime(currentTime);
    });
    socket.on('syncPlay', () => {
      playVideo();
      // playerRef.current.play();
    });
    socket.on('syncPause', () => {
      playerRef.current.pause();
    });
    socket.on('syncRequestVideo', (src) => {
      // setSrcVideo(src);
      playerRef.current.src({ type: 'video/mp4', src: src + '#t=0.5' });
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);
  const [srcVideo, setSrcVideo] = React.useState<string>('');
  // const [srcVideo, setSrcVideo] = React.useState<string>(
  //   'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  // );
  // https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4

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
  function requestVideo(src: string): void {
    const obj = {
      src,
      roomId,
    };
    socket.emit('requestVideo', obj);
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 5 }}>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <RequestVideo requestVideo={requestVideo} />
        </Grid>
        <Grid item lg={8} xs={12}>
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </Grid>
        <Grid item lg={4} xs={12}>
          <button onClick={serverSync}>SYNC</button>
          <Users roomId={roomId} />
        </Grid>
      </Grid>
    </Container>
  );
};
