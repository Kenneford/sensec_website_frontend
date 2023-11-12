import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  schoolDetails: "",
  successMessage: "",
  errorMessage: "",
  addSchoolStatus: "",
  updateSchoolStatus: "",
  schoolFetchingStatus: "",
  singleSchoolFetchingStatus: "",
  deleteSchoolStatus: "",
};

export const addSchoolData = createAsyncThunk(
  "school/addSchoolData",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/school_data/admins/add`,
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

const schoolSclice = createSlice({
  name: "school",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addSchoolData.pending, (state) => {
      return { ...state, addSchoolStatus: "pending" };
    });
    builder.addCase(addSchoolData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          schoolDetails: action.payload.schoolData,
          successMessage: action.payload.successMessage,
          addSchoolStatus: "success",
        };
      } else return state;
    });
    builder.addCase(addSchoolData.rejected, (state, action) => {
      return {
        ...state,
        addSchoolStatus: "rejected",
        errorMessage: action.payload,
      };
    });
  },
});

export default schoolSclice.reducer;
