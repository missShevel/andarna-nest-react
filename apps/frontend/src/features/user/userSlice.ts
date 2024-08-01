import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserData } from '../../interface/user';
import { IUser } from '@andarna/common';
import axiosInstance from '../../axios';
import { ApiEndpoints } from '../../enum/apiEndpoints';
import { User } from 'firebase/auth';
interface IInitialState {
  user: IUser | null;
  isLoading: boolean;
}
const initialState: IInitialState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findOrCreateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        findOrCreateUser.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.isLoading = false;
          state.user = action.payload;
        }
      )
      .addCase(findOrCreateUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const findOrCreateUser = createAsyncThunk(
  'users/findOrCreate',
  async (user: User) => {
    console.log(await user.getIdToken());

    const { data: userFromDb } = await axiosInstance.get<IUser>(
      ApiEndpoints.FIND_OR_CREATE,
      {
        headers: {
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
      }
    );

    return userFromDb;
  }
);

const userReducer = userSlice.reducer;

export const { signOut } = userSlice.actions;
export default userReducer;
