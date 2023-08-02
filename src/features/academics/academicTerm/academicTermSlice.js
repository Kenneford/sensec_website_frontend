import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../../../apiEndPoint/api";

const initialState = {
  academicTermInfo: "",
  allAcademicTerms: [],
  successMessage: "",
  academicTermError: "",
  createTermStatus: "",
  fetchingStatus: "",
};

export const createAcademicTerm = createAsyncThunk(
  "Academics/createAcademicTerm",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/admins/academics/add_term`,
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

const academicTermSlice = createSlice({
  name: "Academics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAcademicTerm.pending, (state, action) => {
      return { ...state, createTermStatus: "pending" };
    });
    builder.addCase(createAcademicTerm.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          academicTermInfo: action.payload.academicTerm,
          successMessage: action.payload.successMessage,
          createTermStatus: "success",
          academicTermError: "",
        };
      } else return state;
    });
    builder.addCase(createAcademicTerm.rejected, (state, action) => {
      return {
        ...state,
        createTermStatus: "rejected",
        academicTermError: action.payload,
      };
    });
  },
});

export default academicTermSlice.reducer;
