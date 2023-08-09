import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  yearGroupInfo: "",
  allYearGroup: [],
  successMessage: "",
  yearGroupError: "",
  createStatus: "",
  fetchingStatus: "",
};

export const createYearGroup = createAsyncThunk(
  "YearGroup/createYearGroup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/admins/old_students/add_batch`,
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

const yearGroupSlice = createSlice({
  name: "YearGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createYearGroup.pending, (state, action) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createYearGroup.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          yearGroupInfo: action.payload.oldStudents,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createYearGroup.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        yearGroupError: action.payload,
      };
    });
  },
});

export default yearGroupSlice.reducer;
