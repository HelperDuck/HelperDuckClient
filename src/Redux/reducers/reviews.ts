import { createSlice } from "@reduxjs/toolkit";
import { reviewType } from "../../Types/ReviewType";

const initialState: reviewType[] = [];

export const reviewSlice = createSlice({
  name: "user",
  initialState: { value: initialState },
  reducers: {
    askerReview: (
      state: { value: reviewType[] },
      action: { payload: reviewType[] }
    ) => {
      state.value = [...state.value, ...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { askerReview } = reviewSlice.actions;

export default reviewSlice.reducer;
