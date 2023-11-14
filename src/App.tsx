import React from 'react';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { io } from 'socket.io-client';

import {
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Button,
  ButtonGroup,
  Container,
  Box,
  Icon,
} from '@chakra-ui/react';
import { TbLink } from 'react-icons/tb';
import { IoMdSync, IoMdArrowForward } from 'react-icons/io';
import VideoJS from './components/VideoJs';
import videojs from 'video.js';

const linkSocket = process.env.REACT_APP_API_URL || 'http://localhost:9999/';

let socket = io(linkSocket, { transports: ['websocket'] });

// TODO 
// синхронизировать буферизацию видео
// err : didn't interact with the document first
// сделать иконки тех кто присоединился с временем видел, 
// а если буферизация не закончилась блочить видео и показывать лоадер на аве

function App() {
  function parseUrlVideo(url: string): string | undefined {
    const regex = /video-[0-9]{6}_[0-9]{9}/gm;
    const idVkVideo = url.match(regex);
    if (!idVkVideo) {
      alert('Не удалось получить id видео');
      return;
    }
    return 'https://m.vk.com/' + idVkVideo[0];
  }
  function getData(url: string): string | undefined {
    console.log(parseUrlVideo(url));
    const parseUrl = parseUrlVideo(url);
    if (!parseUrl) {
      console.log('Ошибка');
      return;
    }
    axios.get(parseUrl).then((html) => {
      const $ = cheerio.load(html.data);
    });
  }
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
  const [request, setRequest] = React.useState<string>('');
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
    });

    player.on('play', () => {
      // videojs.log('player play');
      serverSyncPlay();
    });

    player.on('pause', () => {
      // videojs.log('player pause');
      serverSyncPause();
    });
  };

  function syncTime(currentTime: number): void {
    if (!playerRef) {
      return;
    }
    playerRef.current.currentTime(currentTime);
    playerRef.current.volume = 0.1;
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

  function log() {
    console.log('log');
  }

  React.useEffect(() => {
    // const progressBar = new PlayProgressBar(playerRef.current);
  }, []);

  return (
    <div className="App">
      <Container maxW={1440}>
        <Box p={10}>
          <Flex mb={15}>
            <InputGroup mr={15}>
              <InputLeftElement pointerEvents="none" children={<Icon as={TbLink} />} />
              <Input
                type="url"
                placeholder="Url"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              />
            </InputGroup>
            <ButtonGroup gap="1">
              <Button
                colorScheme="red"
                onClick={() => requestVideo(request)}
                rightIcon={<Icon as={IoMdArrowForward} w={6} h={6} color="white" />}>
                Request
              </Button>
              <Button
                colorScheme="messenger"
                rightIcon={<Icon as={IoMdSync} w={6} h={6} color="white" />}
                onClick={serverSync}>
                Sync
              </Button>
            </ButtonGroup>
          </Flex>
          {/* <video
            ref={playerRef}
            onPlay={serverSyncPlay}
            onPause={serverSyncPause}
            width="100%"
            preload="auto"
            controls
            playsInline
            src={srcVideo}></video> */}
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </Box>
      </Container>

      <button onClick={serverSyncPlay}>Play</button>
      <button onClick={serverSyncPause}>Pause</button>
    </div>
  );
}

export default App;
