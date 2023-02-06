import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PostRequest } from "../utils/ProfileMethods";
const loginAuth = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    const [data, err] = await PostRequest(
      "http://localhost:4000/auth/login",
      formData
    );
    if (!data) return rejectWithValue(err.response.data);
    return data;
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
const userReducer = createSlice({
  name: "user",
  initialState: {
    userData: initialState,
  },
  reducers: {
    updateUser: (state, { payload }) => {
      localStorage.setItem("userInfo", payload);
      state.userData = JSON.parse(payload);
    },
  },
  extraReducers: {
    [loginAuth.pending]: (state, { payload }) => {
      console.log("pending");
      console.log({ payload });
    },
    [loginAuth.fulfilled]: (state, { payload }) => {
      console.log("fulfilled");
      localStorage.setItem("userInfo", payload);
      state.userData = JSON.parse(payload);
    },
    [loginAuth.rejected]: (state, d) => {
      console.log("rejected");
    },
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
export const { updateUser } = userReducer.actions;
export { loginAuth, registerAuth };
