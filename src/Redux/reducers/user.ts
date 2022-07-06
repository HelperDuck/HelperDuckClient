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
  credits: 0
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialState },
  reducers: {
    loginProfile: (
      state: { value: UserType },
      action: { payload: UserType }
    ) => {
      state.value = { ...state.value, ...action.payload };
    },
    updateUserInfo: (state: any, action: any) => {
      state.value = { ...state.value, ...action.payload.user };
    },
    updateCredits: (state: any, action: any) => {
      state.value.credits = parseInt(state.value.credits) + parseInt(action.payload);
    }
    
    // changeProfilePic: (state: any, action: any) => {
    //   state.value.profilePic = action.payload.url;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { loginProfile, updateUserInfo, updateCredits } = userSlice.actions;

export default userSlice.reducer;
