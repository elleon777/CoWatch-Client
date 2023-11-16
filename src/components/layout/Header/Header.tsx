import { Paper, Container, InputBase, Divider, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SyncIcon from '@mui/icons-material/Sync';
import React from 'react';

interface HeaderProps {
  ServerSync: any,
  player: any,
}

function Header({ ServerSync, player }: HeaderProps) {
  return (
    <Container maxWidth="xl" sx={{ p: '20px 0' }}>
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Create SyncVideo"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton
          onClick={() => ServerSync.requestVideo()}
          type="button"
          sx={{ p: '10px' }}
          aria-label="create syncvideo">
          <SendIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={ServerSync.setTime(player)}
          type="button"
          sx={{ p: '10px' }}
          aria-label="sync video">
          <SyncIcon />
        </IconButton>
      </Paper>
    </Container>
  );
}

export default Header;
