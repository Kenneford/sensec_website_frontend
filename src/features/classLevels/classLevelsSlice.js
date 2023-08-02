import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  classLevelInfo: "",
  allClassLevels: [],
  classLevel100: "",
  classLevel200: "",
  classLevel300: "",
  successMessage: "",
  error: "",
  createStatus: "",
  fetchingStatus: "",
};

export const createClassLevel = createAsyncThunk(
  "ClassLevel/createClassLevel",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/admins/academics/add_class`,
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

export const fetchClassLevels = createAsyncThunk(
  "ClassLevel/fetchClassLevels",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/academics/get_class_levels`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);
export const fetchClassLevel100 = createAsyncThunk(
  "ClassLevel/fetchClassLevel100",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/academics/get_class_level100`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const fetchClassLevel200 = createAsyncThunk(
  "ClassLevel/fetchClassLevel200",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/academics/get_class_level200`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const fetchClassLevel300 = createAsyncThunk(
  "ClassLevel/fetchClassLevel300",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/academics/get_class_level300`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

const classLevelsSlice = createSlice({
  name: "ClassLevel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createClassLevel.pending, (state, action) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createClassLevel.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classLevelInfo: action.payload.classLevel,
          successMessage: action.payload.successMessage,
          createStatus: "success",
          error: "",
          authenticated: false,
        };
      } else return state;
    });
    builder.addCase(createClassLevel.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchClassLevels.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchClassLevels.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allClassLevels: action.payload.classLevels,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchClassLevels.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchClassLevel100.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchClassLevel100.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classLevel100: action.payload.classLevel,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchClassLevel100.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchClassLevel200.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchClassLevel200.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classLevel200: action.payload.classLevel,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchClassLevel200.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchClassLevel300.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchClassLevel300.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          classLevel300: action.payload.classLevel,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchClassLevel300.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllClassLevels = (state) => state.classLevel.allClassLevels;
export const getClassLevel100 = (state) =>
  state.classLevel.classLevel100.students;

export const getClassLevel200 = (state) =>
  state.classLevel.classLevel200.students;

export const getClassLevel300 = (state) =>
  state.classLevel.classLevel300.students;

export default classLevelsSlice.reducer;
