import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import styles from './RequestVideo.module.scss';

interface VideoPlayerProps {
  requestVideo: (src: string) => void;
}

export const RequestVideo: React.FC<VideoPlayerProps> = ({ requestVideo }) => {
  const [request, setRequest] = React.useState<string>(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequest(event.target.value);
    console.log(request)
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(request);
    requestVideo(request);
  };
  const handleClick = () => {
    requestVideo(request);
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <TextField
        className={styles.input}
        value={request}
        onChange={onChangeInput}
        type="text"
        color="primary"
        label="Вставьте ссылку на видео"
        variant="outlined"
        name="requestSrc"
      />
      <IconButton className={styles.button} onClick={handleClick}>
        <SendIcon />
      </IconButton>
    </form>
  );
};
