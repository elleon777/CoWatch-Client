import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import styles from './RequestVideo.module.scss';

interface VideoPlayerProps {
  requestVideo: (src: string) => void;
}

export const RequestVideo: React.FC<VideoPlayerProps> = ({ requestVideo }) => {
  const [request, setRequest] = React.useState<string>(
    'https://anilib.me/anime/17984-chainsaw-man-anime/episode/106051?player=Animelib&team=32713',
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequest(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      <IconButton className={styles.button}>
        <SendIcon />
      </IconButton>
    </form>
  );
};
