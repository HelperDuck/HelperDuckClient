import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const myRequestModalStateSlice = createSlice({
  name: "myRequestModalState",
  initialState: { value: initialState },
  reducers: {
    myRequestModalState: (state: { value: any }, action: { payload: any }) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { myRequestModalState } = myRequestModalStateSlice.actions;

export default myRequestModalStateSlice.reducer;
