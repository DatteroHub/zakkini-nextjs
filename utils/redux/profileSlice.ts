import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProfileInfo = {
  id: string;
  name: string;
  imgId: string;
};

interface ProfileState {
  profileInfo: ProfileInfo | null;
}

const initialState: ProfileState = {
  profileInfo: null,
};

export const profileSlice = createSlice({
  name: 'profileInfo',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileInfo>) => {
      state.profileInfo = action.payload;
    },
    clearProfile: (state) => {
      state.profileInfo = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
