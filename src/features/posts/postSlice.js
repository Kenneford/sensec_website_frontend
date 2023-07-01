import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  postDetails: "",
  posts: [],
  postLikes: [],
  success: "",
  error: "",
  postStatus: "",
  postFetchingStatus: "",
  singlePostFetchingStatus: "",
  deletePostStatus: "",
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

export const fetchSinglePost = createAsyncThunk(
  "post/fetchSinglePost",
  async (title, { rejectWithValue }) => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/posts/single_post/${title}`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async ({ id, post }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINT}/admins/posts/like_post/${post}`,
        id
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_ENDPOINT}/admins/posts/delete_post/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
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
    builder.addCase(fetchSinglePost.pending, (state) => {
      return { ...state, singlePostFetchingStatus: "pending" };
    });
    builder.addCase(fetchSinglePost.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          postDetails: action.payload.singlePost,
          success: action.payload.successMessage,
          singlePostFetchingStatus: "success",
        };
      }
    });
    builder.addCase(fetchSinglePost.rejected, (state, action) => {
      return {
        ...state,
        singlePostFetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(likePost.pending, (state) => {
      return { ...state, likePostStatus: "pending" };
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      if (action.payload) {
        const currentPosts = state.posts.findIndex(
          (post) => post._id === action.payload.likedPost._id
        );
        return {
          ...state,
          posts: [...state.posts, currentPosts],
          success: action.payload.successMessage,
          likePostStatus: "success",
        };
      }
    });
    builder.addCase(likePost.rejected, (state, action) => {
      return {
        ...state,
        likePostStatus: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(deletePost.pending, (state) => {
      return { ...state, deletePostStatus: "pending" };
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      if (action.payload) {
        const currentPosts = state.posts.filter(
          (post) => post._id !== action.payload.postDeleted._id
        );
        return {
          ...state,
          posts: currentPosts,
          success: action.payload.successMessage,
          deletePostStatus: "success",
        };
      }
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      return {
        ...state,
        deletePostStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllPosts = (state) => state.post.posts;
export const getSinglePost = (state) => state.post.postDetails;

export default postSlice.reducer;
