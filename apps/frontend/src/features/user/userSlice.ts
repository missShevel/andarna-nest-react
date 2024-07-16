import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserData } from '../../interface/user';
import { IUser } from '@andarna/common';
interface IInitialState {
  user: IUser | null;
}
const initialState: IInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

const userReducer = userSlice.reducer;

export const { signIn, signOut } = userSlice.actions;
export default userReducer;
