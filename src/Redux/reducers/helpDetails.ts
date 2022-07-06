import { createSlice } from "@reduxjs/toolkit";
import { requestAskedType } from "../../Types/RequestAskedType";

const initialState: requestAskedType = {
  helpOffers: [],
  id: 0,
  userId: 0,
  status: "",
  subject: "",
  description: "",
  codeSnippet: "",
  linkToSandbox: "",
  roomId: "",
  technologies: [],
  languages: [],
};

export const helpDetailsSlice = createSlice({
  name: "user",
  initialState: { value: initialState },
  reducers: {
    helpDetails: (
      state: { value: requestAskedType },
      action: { payload: requestAskedType }
    ) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { helpDetails } = helpDetailsSlice.actions;

export default helpDetailsSlice.reducer;
