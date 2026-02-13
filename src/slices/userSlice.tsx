import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  accessToken: "",
  userList: [],
  songList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action?.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action?.payload;
    },
    setUserList(state, action) {
      state.userList = action?.payload;
    },
    setSongList(state, action) {
      state.songList = action?.payload;
    },
  },
});

export const { setUserData, setAccessToken, setUserList, setSongList } = userSlice.actions;
export default userSlice.reducer;
