import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  classLevelSectionInfo: "",
  allClassLevelSections: [],
  successMessage: "",
  error: "",
  createLevelSectionStatus: "",
  fetchingStatus: "",
};

export const createClassLevelSection = createAsyncThunk(
  "ClassLevelSection/createClassLevelSection",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/admins/academics/add_class_section`,
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

const classLevelSectionsSlice = createSlice({
  name: "ClassLevelSection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createClassLevelSection.pending, (state, action) => {
      return { ...state, createLevelSectionStatus: "pending" };
    });
    builder.addCase(createClassLevelSection.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classLevelSectionInfo: action.payload.classLevelSection,
          successMessage: action.payload.successMessage,
          createLevelSectionStatus: "success",
          error: "",
        };
      } else return state;
    });
    builder.addCase(createClassLevelSection.rejected, (state, action) => {
      return {
        ...state,
        createLevelSectionStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllClassLevelSections = (state) =>
  state.classLevelSection.allClassLevelSections;

export default classLevelSectionsSlice.reducer;
