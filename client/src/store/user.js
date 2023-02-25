import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authConfig from "../config";
const loginAuth = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    const { data } = await axios.post(
      "http://localhost:4000/auth/login",
      formData
    );
    if (!data) return rejectWithValue(data.response);
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
export const changeProfilePicture = createAsyncThunk(
  "user/changeProfilePicture",
  async (payload, { getState }) => {
    const { user, token } = getState()?.user?.userData;
    console.log(token);
    console.log(payload);
    try {
      const { data } = await axios.put(
        "http://localhost:4000/avatar",
        payload,

        authConfig(token)
      );
      console.log(data);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }

    // if (data) {
    //   return JSON.parse(data);
    // }
  }
);
const initialState = JSON.parse(localStorage.getItem("userInfo")) || false;
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
    [loginAuth.pending]: (state, { payload }) => {},
    [loginAuth.fulfilled]: (state, { payload }) => {
      localStorage.setItem("userInfo", payload);
      state.userData = JSON.parse(payload);
    },
    [loginAuth.rejected]: (state, d) => {},
    [registerAuth.pending]: (state) => {},
    [registerAuth.fulfilled]: (state, { payload }) => {
      state.userData = JSON.parse(payload);
      localStorage.setItem("userInfo", payload);
    },
    [registerAuth.rejected]: (state, { payload }) => {},
    [changeProfilePicture.pending]: (state, { payload }) => {
      console.log(payload);
    },
    [changeProfilePicture.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      console.log(payload);
      state.userData.user = user;
      localStorage.setItem("userInfo", JSON.stringify(state.userData));
    },
  },
});
export default userReducer.reducer;
export const { updateUser } = userReducer.actions;
export { loginAuth, registerAuth };
