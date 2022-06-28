import { createSlice } from '@reduxjs/toolkit'
import { UserType } from '../../Types/UserType';


const initialState: UserType[] = []



export const userSlice = createSlice({
  name: 'user',
  initialState: {value: initialState},
  reducers: {
    allUsers: (state: { value: UserType[] }, action: { payload: UserType }) => {
      state.value = { ...state.value, ...action.payload };
    },

  },
})

// Action creators are generated for each case reducer function
export const { allUsers } = userSlice.actions

export default userSlice.reducer