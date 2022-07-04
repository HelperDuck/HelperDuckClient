import { createSlice } from "@reduxjs/toolkit";

const initialState: string = "";

export const roomIdSlice = createSlice({
  name: "roomid",
  initialState: { value: initialState },
  reducers: {
    roomIdState: (state: { value: any }, action: { payload: any }) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { roomIdState } = roomIdSlice.actions;

export default roomIdSlice.reducer;
