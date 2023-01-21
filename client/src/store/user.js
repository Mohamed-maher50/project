import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: JSON.parse(localStorage.getItem("userInfo")),
  reducers: {},
});
export default userReducer.reducer;
