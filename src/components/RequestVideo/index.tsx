import { CircularProgress, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import styles from './RequestVideo.module.scss';
import { useLazyGetSourcesFromURLQuery } from 'api';
import { socket } from 'store';

interface VideoPlayerProps {
  roomId: string;
}

export const RequestVideo: React.FC<VideoPlayerProps> = ({ roomId }) => {
  const [request, setRequest] = React.useState<string>(
    'https://anilib.me/anime/17984-chainsaw-man-anime/episode/106051?player=Animelib&team=32713',
  );
  const [getSourcesFromURL, { isLoading }] = useLazyGetSourcesFromURLQuery();
  const [disabled, setDisabled] = React.useState(false);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequest(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    setDisabled(true);
    await getSourcesFromURL({ roomId, url: request }).unwrap();
    socket.emit('player:updateSources', roomId);
    setDisabled(false);
    event.preventDefault();
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
      <IconButton className={styles.button} onClick={handleSubmit} disabled={disabled}>
        {isLoading ? <CircularProgress /> : <SendIcon />}
      </IconButton>
    </form>
  );
};
