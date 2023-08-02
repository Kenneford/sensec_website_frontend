import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../../../apiEndPoint/api";

const initialState = {
  academicYearInfo: "",
  allAcademicYears: [],
  successMessage: "",
  academicYearError: "",
  createStatus: "",
  fetchingStatus: "",
};

export const createAcademicYear = createAsyncThunk(
  "Academics/createAcademicYear",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/admins/academics/add_year`,
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

export const fetchAllYears = createAsyncThunk(
  "Admin/fetchAllYears",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/academics/get_academic_years`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

const academicYearsSlice = createSlice({
  name: "Academics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAcademicYear.pending, (state, action) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createAcademicYear.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          academicYearInfo: action.payload.academicYear,
          successMessage: action.payload.successMessage,
          createStatus: "success",
          academicYearError: "",
        };
      } else return state;
    });
    builder.addCase(createAcademicYear.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        academicYearError: action.payload,
      };
    });

    builder.addCase(fetchAllYears.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAllYears.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allYears: action.payload.academicYears,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllYears.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllAcademicYears = (state) => state.academics.allYears;

export default academicYearsSlice.reducer;
