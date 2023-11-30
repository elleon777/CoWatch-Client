import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import styles from './RequestVideo.module.scss';

export const RequestVideo: React.FC = () => {
  const [request, setRequest] = React.useState<string>('');

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequest(event.target.value);
  };
  return (
    <form className={styles.wrapper}>
      <TextField
        className={styles.input}
        value={request}
        onChange={onChangeInput}
        type="text"
        color="primary"
        label="Вставьте ссылку на видео"
        variant="outlined"
      />
      <IconButton className={styles.button}>
        <SendIcon />
      </IconButton>
    </form>
  );
};
