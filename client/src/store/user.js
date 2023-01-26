import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const loginAuth = createAsyncThunk(
  "posts/getPosts",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/auth/login",
        formData
      );
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
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
const initialState = JSON.parse(localStorage.getItem("userInfo")) || {};
console.log(initialState);
const userReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [loginAuth.pending]: (state, { payload }) => {
      console.log({ payload });
    },
    [loginAuth.fulfilled]: (state, { payload }) => {
      console.log(payload);
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
