import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerState } from 'utils/@types/player';
import { RootState } from 'utils/@types/store';

const initialState: PlayerState = {
  src: '',
  status: false,
  currentTime: null,
  player: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    clientPlayPlayer: (state) => {
      state.status = true;
    },
    serverPlayPlayer: (state) => {
      state.status = true;
    },
    clientPausePlayer: (state) => {
      state.status = false;
    },
    serverPausePlayer: (state) => {
      state.status = false;
    },
    setTimePlayer: (state, { payload }: PayloadAction<number>) => {
      state.currentTime = payload;
    },
    setSrcPlayer: (state, { payload }: PayloadAction<string>) => {
      state.src = payload;
    },
  },
});

export const {
  clientPlayPlayer,
  serverPlayPlayer,
  clientPausePlayer,
  serverPausePlayer,
  setTimePlayer,
  setSrcPlayer
} = playerSlice.actions;
export const selectPlayerData = (state: RootState) => state.playerState;
export default playerSlice.reducer;
