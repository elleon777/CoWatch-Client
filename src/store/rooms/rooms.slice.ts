import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  rooms: [],
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    
  },
});

// export const {  } = roomsSlice.actions;
export default roomsSlice.reducer;
