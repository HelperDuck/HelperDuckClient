import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../Types/UserType';











const initialState: UserType[] = [{
  uid:'aadahdZD1',
  firstName: 'John',
  lastName: 'Doe',
  userName: 'jd',
  email:' john.doe@abc.com',
  userBio:' I am John Doe, Junior Developer based in LA',
  profilePic:' http://google.com/',
  technologies: ['JavaScript', 'React', 'Redux'],
  languages: ['English', 'Spanish'],
  gitHubProfile:' https://github.com/johndoe',
  openedRequests: 20,
  acceptedRequests: 2,
  avgTip: 20,
  rating: 4.5 
}]



export const userSlice = createSlice({
  name: 'user',
  initialState: {value: initialState},
  reducers: {
       loginProfile: (state: { value: UserType[] }, action: { payload: UserType }) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
})

// Action creators are generated for each case reducer function
export const {  loginProfile } = userSlice.actions

export default userSlice.reducer