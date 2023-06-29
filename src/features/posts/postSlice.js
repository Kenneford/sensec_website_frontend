import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  postDetails: "",
  posts: [],
  success: "",
  error: "",
  postStatus: "",
  postFetchingStatus: "",
};

export const adminPost = createAsyncThunk(
  "post/adminPost",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/admins/posts/add_post`,
        data
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await axios.get(
    `${API_ENDPOINT}/admins/posts/get_all_posts`
  );
  // const students = response.data;
  console.log(response.data);
  return response.data;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminPost.pending, (state) => {
      return { ...state, postStatus: "pending" };
    });
    builder.addCase(adminPost.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          postDetails: action.payload.post,
          posts: [...state.posts, action.payload.post],
          success: action.payload.successMessage,
          postStatus: "success",
          error: "",
        };
      } else return state;
    });
    builder.addCase(adminPost.rejected, (state, action) => {
      return {
        ...state,
        postStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchPosts.pending, (state) => {
      return { ...state, postFetchingStatus: "pending" };
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          posts: action.payload.posts,
          success: action.payload.successMessage,
          postFetchingStatus: "success",
        };
      }
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      return {
        ...state,
        postFetchingStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllPosts = (state) => state.post.posts;

export default postSlice.reducer;
