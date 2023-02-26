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

const linkSocket = process.env.REACT_APP_API_URL || 'http://localhost:9999/';

let socket = io(linkSocket, { transports: ['websocket'] });

function App() {
  //https://m.vk.com/video-463673_456239380'
  const inputUrl =
    'https://vk.com/video/playlist/-463673_53376946?section=playlist_53376946&z=video-463673_456239380%2Fclub463673%2Fpl_-463673_53376946';

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
      alert('Подключение успешно');
    });
    socket.on('sync', (currentTime) => {
      syncTime(currentTime);
    });
    socket.on('syncPlay', () => {
      console.log('play');
      vidRef.current.play();
    });
    socket.on('syncPause', () => {
      console.log('pause');
      vidRef.current.pause();
    });
    socket.on('syncRequestVideo', (src) => {
      setSrcVideo(src);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const vidRef = React.useRef<any>(null);

  function syncTime(currentTime: number): void {
    if (!vidRef) {
      return;
    }
    vidRef.current.currentTime = currentTime;
    vidRef.current.volume = 0.1;
    // vidRef.current.play();
  }
  function serverSync(): void {
    socket.emit('sendTime', vidRef.current.currentTime);
  }
  function serverSyncPlay(): void {
    // serverSync();
    socket.emit('playVideo');
  }
  function serverSyncPause(): void {
    socket.emit('pauseVideo');
  }
  const [request, setRequest] = React.useState<string>('');
  const [srcVideo, setSrcVideo] = React.useState<string>(
    'https:/vkvd189.mycdn.me/?srcIp=83.149.45.231&pr=40&expires=1677542160140&srcAg=CHROME&fromCache=1&ms=185.226.53.189&type=3&sig=4YcFp9690us&ct=0&urls=45.136.22.175&clientType=14&appId=512000384397&zs=48&id=796381481708',
  );

  function requestVideo(src: string): void {
    socket.emit('requestVideo', src);
  }

  function log() {
    console.log("log")
  }

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
          <video
            ref={vidRef}
            onPlay={serverSyncPlay}
            onPause={serverSyncPause}
            width="100%"
            preload="auto"
            controls
            playsInline
            src={srcVideo}></video>
        </Box>
      </Container>

      {/* <button onClick={serverSyncPlay}>Play</button>
      <button onClick={serverSyncPause}>Pause</button> */}
    </div>
  );
}

export default App;
