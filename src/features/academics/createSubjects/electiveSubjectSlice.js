import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../../apiEndPoint/api";

const initialState = {
  electiveSubjectInfo: "",
  allElectiveSubjects: [],
  successMessage: "",
  error: "",
  createStatus: "",
  fetchingStatus: "",
};

export const createElectiveSubject = createAsyncThunk(
  "Academics/createElectiveSubject",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/admins/academics/add_subject`,
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

export const fetchAllElectiveSubjects = createAsyncThunk(
  "Admin/fetchAllElectiveSubjects",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/academics/get_all_electiveSubjects`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);
export const fetchSingleElectiveSubject = createAsyncThunk(
  "Admin/fetchSingleElectiveSubject",
  async (ElectiveSubjectName) => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/academics/single_electiveSubject/${ElectiveSubjectName}`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

const academicsSlice = createSlice({
  name: "Academics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createElectiveSubject.pending, (state, action) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createElectiveSubject.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          ElectiveSubjectInfo: action.payload.ElectiveSubject,
          successMessage: action.payload.successMessage,
          createStatus: "success",
          error: "",
        };
      } else return state;
    });
    builder.addCase(createElectiveSubject.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchAllElectiveSubjects.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAllElectiveSubjects.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allElectiveSubjectmes: action.payload.ElectiveSubjects,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllElectiveSubjects.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchSingleElectiveSubject.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchSingleElectiveSubject.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          electiveSubjectInfo: action.payload.subject,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleElectiveSubject.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllSubjects = (state) => state.academics.allSubjects;
export const getSingleSubject = (state) => state.academics.subjectInfo;

export default academicsSlice.reducer;
