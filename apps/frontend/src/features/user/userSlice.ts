import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '@andarna/common';
import { axiosInstanceAuthorized } from '../../axios';
import { ApiEndpoints } from '../../enum/apiEndpoints';
interface IUserInitialState {
  user: IUser | null;
  isLoading: boolean;
}
const initialState: IUserInitialState = {
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
  async () => {
    const { data: userFromDb } = await axiosInstanceAuthorized.get<IUser>(
      ApiEndpoints.FIND_OR_CREATE_USER
    );

    return userFromDb;
  }
);

const userReducer = userSlice.reducer;

export const { signOut } = userSlice.actions;
export default userReducer;
