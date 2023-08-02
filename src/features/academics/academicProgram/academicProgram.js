import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../../apiEndPoint/api";

const initialState = {
  programInfo: "",
  allProgrammes: [],
  agricProgram: "",
  successMessage: "",
  error: "",
  createStatus: "",
  fetchingStatus: "",
};

export const createProgram = createAsyncThunk(
  "Academics/createProgram",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/admins/academics/add_program`,
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

export const fetchAllProgrammes = createAsyncThunk(
  "Admin/fetchAllProgrammes",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/academics/get_all_programs`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);
export const fetchSingleProgram = createAsyncThunk(
  "Admin/fetchSingleProgram",
  async (programName) => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/academics/single_program/${programName}`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const fetchAgricProgram = createAsyncThunk(
  "Admin/fetchAgricProgram",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/academics/get_agric_program`
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
    builder.addCase(createProgram.pending, (state, action) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createProgram.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          programInfo: action.payload.program,
          successMessage: action.payload.successMessage,
          createStatus: "success",
          error: "",
        };
      } else return state;
    });
    builder.addCase(createProgram.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchAllProgrammes.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAllProgrammes.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allProgrammes: action.payload.programs,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllProgrammes.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchSingleProgram.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchSingleProgram.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          programInfo: action.payload.program,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleProgram.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchAgricProgram.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAgricProgram.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          agricProgram: action.payload.program,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAgricProgram.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllProgrammes = (state) => state.academics.allProgrammes;
export const getSingleProgram = (state) => state.academics.programInfo;
export const getAgricProgram = (state) => state.academics.agricProgram;

export default academicsSlice.reducer;
