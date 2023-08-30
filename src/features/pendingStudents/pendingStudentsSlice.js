import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  pendingStudentsDataInfo: "",
  allPendingStudentsData: [],
  successMessage: "",
  pendingStudentsDataError: "",
  createStatus: "",
  fetchingStatus: "",
};

export const createPendingStudentsData = createAsyncThunk(
  "PendingStudentsData/createPendingStudentsData",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/students/pending_student/add`,
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

export const fetchPendingStudentsDatas = createAsyncThunk(
  "PendingStudentsData/fetchPendingStudentsDatas",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/pending/get_all`
    );
    console.log(response.data);
    return response.data;
  }
);

export const fetchSinglePendingStudentsData = createAsyncThunk(
  "PendingStudentsData/fetchSinglePendingStudentsData",
  async (id) => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/pending/${id}/get_single`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

const PendingStudentDataSlice = createSlice({
  name: "PendingStudentsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPendingStudentsData.pending, (state, action) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createPendingStudentsData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          pendingStudentsDataInfo: action.payload.pendingData,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createPendingStudentsData.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        pendingStudentsDataError: action.payload,
      };
    });

    builder.addCase(fetchPendingStudentsDatas.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchPendingStudentsDatas.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allPendingStudentsData: action.payload.pendingStudentsData,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchPendingStudentsDatas.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        pendingStudentsDataError: action.payload,
      };
    });

    builder.addCase(fetchSinglePendingStudentsData.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(
      fetchSinglePendingStudentsData.fulfilled,
      (state, action) => {
        if (action.payload) {
          return {
            ...state,
            pendingStudentsDataInfo: action.payload.pendingStudentsData,
            successMessage: action.payload.successMessage,
            fetchingStatus: "success",
          };
        } else return state;
      }
    );
    builder.addCase(
      fetchSinglePendingStudentsData.rejected,
      (state, action) => {
        return {
          ...state,
          fetchingStatus: "rejected",
          pendingStudentsDataError: action.payload,
        };
      }
    );
  },
});
export const getAllPendingStudentsDatas = (state) =>
  state.pendingStudentsData.allPendingStudentsData;
export const getSinglePendingStudentsData = (state) =>
  state.pendingStudentsData.pendingStudentsDataInfo;

export default PendingStudentDataSlice.reducer;
