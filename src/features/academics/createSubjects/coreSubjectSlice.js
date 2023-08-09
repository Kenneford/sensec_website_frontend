import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../../apiEndPoint/api";

const initialState = {
  coreSubjectInfo: "",
  allcoreSubjects: [],
  successMessage: "",
  error: "",
  createStatus: "",
  fetchingStatus: "",
};

export const createCoreSubject = createAsyncThunk(
  "Academics/createCoreSubject",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/admins/subjects/add_core_subject`,
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

export const fetchAllcoreSubjects = createAsyncThunk(
  "Academics/fetchAllcoreSubjects",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/subjects/get_all_core_subjects`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);
export const fetchSinglecoreSubject = createAsyncThunk(
  "Academics/fetchSinglecoreSubject",
  async (coreSubjectName) => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/subjects/single_core_subject/${coreSubjectName}`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

const coreSubjectSlice = createSlice({
  name: "Academics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCoreSubject.pending, (state) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createCoreSubject.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          coreSubjectInfo: action.payload.coreSubject,
          successMessage: action.payload.successMessage,
          createStatus: "success",
          error: "",
        };
      } else return state;
    });
    builder.addCase(createCoreSubject.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchAllcoreSubjects.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAllcoreSubjects.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allcoreSubjectmes: action.payload.coreSubjects,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllcoreSubjects.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchSinglecoreSubject.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchSinglecoreSubject.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          coreSubjectInfo: action.payload.subject,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSinglecoreSubject.rejected, (state, action) => {
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

export default coreSubjectSlice.reducer;
