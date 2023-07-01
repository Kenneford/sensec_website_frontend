import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  emailDetails: "",
  sentEmails: "",
  receivedEmails: "",
  success: "",
  error: "",
  emailStatus: "",
  emailFetchingStatus: "",
};

export const sendEmail = createAsyncThunk(
  "email/sendEmail",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/admins/posts/send_email`,
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

export const receiveEmail = createAsyncThunk(
  "email/receiveEmail",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/admins/posts/receive_email`,
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

export const fetchEmails = createAsyncThunk("email/fetchEmails", async () => {
  const response = await axios.get(
    `${API_ENDPOINT}/admins/posts/get_all_posts`
  );
  // const students = response.data;
  console.log(response.data);
  return response.data;
});

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendEmail.pending, (state) => {
      return { ...state, emailStatus: "pending" };
    });
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          emailDetails: action.payload.email,
          emails: [...state.emails, action.payload.email],
          success: action.payload.successMessage,
          emailStatus: "success",
          error: "",
        };
      } else return state;
    });
    builder.addCase(sendEmail.rejected, (state, action) => {
      return {
        ...state,
        emailStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(receiveEmail.pending, (state) => {
      return { ...state, emailStatus: "pending" };
    });
    builder.addCase(receiveEmail.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          receivedEmails: action.payload.email,
          success: action.payload.successMessage,
          emailStatus: "success",
        };
      }
    });
    builder.addCase(receiveEmail.rejected, (state, action) => {
      return {
        ...state,
        emailStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllEmails = (state) => state.email.emails;
export const getSingleEmail = (state) => state.email.emailDetails;

export default emailSlice.reducer;
