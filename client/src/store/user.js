import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const loginAuth = createAsyncThunk(
  "posts/getPosts",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/auth/login",
        formData
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const registerAuth = createAsyncThunk(
  "user/registerAuth",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/auth/register",
        formData
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const userReducer = createSlice({
  name: "user",
  initialState: JSON.parse(localStorage.getItem("userInfo")),
  reducers: {},
  extraReducers: {
    [loginAuth.pending]: (state) => {},
    [loginAuth.fulfilled]: (state, { payload }) => {
      localStorage.setItem("userInfo", payload);
    },
    [loginAuth.rejected]: (state, d) => {},
    [registerAuth.pending]: (state) => {},
    [registerAuth.fulfilled]: (state, { payload }) => {
      localStorage.setItem("userInfo", payload);
    },
    [registerAuth.rejected]: (state, { payload }) => {
      console.log("ug");
    },
  },
});
export default userReducer.reducer;

export { loginAuth, registerAuth };
