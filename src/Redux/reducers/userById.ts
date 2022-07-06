import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../Types/UserType";

const initialState: UserType = {
  uid: "",
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  userBio: "",
  profilePic: "",
  technologies: [],
  languages: [],
  helpOffers: [],
  helpRequests: [],
  gitHubProfile: "",
  avgTip: 0,
  rating: 0,
};

export const userbyIdSlice = createSlice({
  name: "userById",
  initialState: { value: initialState },
  reducers: {
    userById: (state: { value: any }, action: { payload: any }) => {
      state.value = { ...state.value, ...action.payload };
    },
    changeProfilePic: (state: any, action: any) => {
      state.value.profilePic = action.payload.url;
    },
    updateByIdUserInfo: (state: any, action: any) => {
      state.value = { ...state.value, ...action.payload.user };
    },
  },
});

// Action creators are generated for each case reducer function
export const { userById, changeProfilePic, updateByIdUserInfo } =
  userbyIdSlice.actions;

export default userbyIdSlice.reducer;
