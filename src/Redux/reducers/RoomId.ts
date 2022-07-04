import { createSlice } from "@reduxjs/toolkit";

const initialState: string = "";

export const roomIdSlice = createSlice({
  name: "roomid",
  initialState: { value: initialState },
  reducers: {
    roomId: (state: { value: string }, action: { payload: string }) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { roomId } = roomIdSlice.actions;

export default roomIdSlice.reducer;
