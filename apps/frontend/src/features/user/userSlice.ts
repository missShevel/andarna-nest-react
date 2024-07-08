import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserData } from '../../interface/user';
interface IInitialState {
  user: IUserData | null;
}
const initialState: IInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IUserData>) => {
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
