import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const modalSlice = createSlice({
  name: "modal",
  initialState: { value: initialState },
  reducers: {
    modalState: (state: { value: any }, action: { payload: any }) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { modalState } = modalSlice.actions;

export default modalSlice.reducer;
