import { createSlice } from "@reduxjs/toolkit";
import { requestAskedType } from "../../Types/RequestAskedType";

const initialState: requestAskedType[] = [];

export const helpRequestSlice = createSlice({
  name: "user",
  initialState: { value: initialState },
  reducers: {
    helpRequests: (
      state: { value: requestAskedType[] },
      action: { payload: requestAskedType[] }
    ) => {
      state.value = action.payload;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { helpRequests } = helpRequestSlice.actions;

export default helpRequestSlice.reducer;
