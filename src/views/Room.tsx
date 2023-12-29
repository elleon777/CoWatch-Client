import React from 'react';
import { Container, Grid, Skeleton } from '@mui/material';
import VideoJS from 'components/VideoJS';
import videojs from 'video.js';
import { Users } from 'components/Users';
import { useAppSelector } from 'utils/hooks/store';
import { socket } from 'store';
import { RequestVideo } from 'components/RequestVideo';
import { useParams } from 'react-router-dom';
import { RootState } from 'utils/@types/store';
import { createVideoPlayController } from 'utils/helpers/videoPlayController';
import { QualityButton } from 'utils/videojs/QualityButton';
import { useLazyGetSourcesFromRoomQuery } from 'api';

export const Room: React.FC = () => {
  const { roomId } = useParams();
  const { currentUser } = useAppSelector((state: RootState) => state.userState);
  const [getSourcesFromRoom] = useLazyGetSourcesFromRoomQuery();
  const [showPlayer, setShowPlayer] = React.useState(false);
  const [readyPlayer, setReadyPlayer] = React.useState(false);
  const [playerSources, setPlayerSources] = React.useState([]);
  const [playerSubtitles, setPlayerSubtitles] = React.useState([]);
  const [videoPlayController, setVideoPlayController] = React.useState<{
    play: () => void;
    reInit: () => void;
  } | null>(null);
  const playerRef = React.useRef<any>(null);

  const getSourceVideo = async () => {
    const payload = await getSourcesFromRoom(roomId!).unwrap();
    if (!payload) {
      return;
    }
    if (payload.sources) {
      setPlayerSources(payload.sources);
      setShowPlayer(true);
    }
    if (payload.subtitles) {
      const subObj = new Blob([payload.subtitleVVT], { type: 'text/vtt' });
      const url = (URL || webkitURL).createObjectURL(subObj);
      const updatedSubtitles = { ...payload.subtitles, src: url, mode: 'showing' };
      setPlayerSubtitles(updatedSubtitles);
    }
  };

  React.useEffect(() => {
    getSourceVideo();
    socket.on('player:updateSources', () => {
      getSourceVideo();
    });
    socket.on('player:syncTime', (currentTime) => {
      syncTime(currentTime);
    });
    socket.on('player:syncPlay', () => {
      playerRef.current.one('canplay', () => {
        playerRef.current.play();
      });
    });
    socket.on('player:syncPause', () => {
      playerRef.current.pause();
    });

    return () => {
      const userId = currentUser?.id;
      socket.emit('room:leave', { roomId, userId });
      socket.removeAllListeners();
    };
  }, []);

  React.useEffect(() => {
    if (readyPlayer) {
      console.log(playerRef.current);
      const controller = createVideoPlayController(playerRef.current);
      setVideoPlayController(controller);
    }
  }, [readyPlayer]);

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
    language: 'ru',
    experimentalSvgIcons: true,
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    preload: 'metadata',
    sources: playerSources,
    tracks: [playerSubtitles],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // @ts-expect-error: ts not supported
    videojs.registerComponent('QualityButton', QualityButton);

    const qualityButton = player.controlBar.addChild('QualityButton', {
      myItems: playerSources,
    });
    if (qualityButton) {
      qualityButton.setIcon('cog');
    }

    player.on('ready', () => {
      // раньше был canplay
      setReadyPlayer(true);
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

  return (
    <Container maxWidth="xl" sx={{ pt: 5 }}>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <RequestVideo roomId={roomId!} />
        </Grid>
        <Grid item lg={8} xs={12}>
          {showPlayer ? (
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          ) : (
            <Skeleton variant="rectangular" className="skeleton__player" />
          )}
        </Grid>
        <Grid item lg={4} xs={12}>
          <Users roomId={roomId} />
        </Grid>
      </Grid>
    </Container>
  );
};
