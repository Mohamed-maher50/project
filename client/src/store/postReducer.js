import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authConfig from "../config";
import { getRequest } from "../utils/ProfileMethods";

export const getPosts = createAsyncThunk("user/posts", async (token) => {
  const [data, err] = await getRequest(
    "http://localhost:4000/getPosts",
    authConfig(token)
  );

  return data;
});
const PostReducer = createSlice({
  name: "user/post",
  initialState: {
    posts: [],
  },
  reducers: {
    addPost: (state, { payload }) => {},
  },
  extraReducers: {
    [getPosts.pending]: (state, { payload }) => {},
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload;
    },
    [getPosts.rejected]: (state, { payload }) => {},
  },
});
export default PostReducer.reducer;
export const { addPost } = PostReducer.actions;
