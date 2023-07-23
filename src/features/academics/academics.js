import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  programInfo: "",
  subjectInfo: "",
  allProgrammes: [],
  agricProgram: "",
  allYears: [],
  allSubjects: [],
  successMessage: "",
  error: "",
  addStatus: "",
  fetchingStatus: "",
};

export const addProgram = createAsyncThunk(
  "Academics/addProgram",
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

export const addSubject = createAsyncThunk(
  "Academics/addSubject",
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

const academicsSlice = createSlice({
  name: "Academics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProgram.pending, (state, action) => {
      return { ...state, addStatus: "pending" };
    });
    builder.addCase(addProgram.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          programInfo: action.payload.program,
          successMessage: action.payload.successMessage,
          addStatus: "success",
          error: "",
        };
      } else return state;
    });
    builder.addCase(addProgram.rejected, (state, action) => {
      return {
        ...state,
        addStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(addSubject.pending, (state) => {
      return { ...state, addStatus: "pending" };
    });
    builder.addCase(addSubject.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          subjectInfo: action.payload.subject,
          successMessage: action.payload.successMessage,
          addStatus: "success",
        };
      } else return state;
    });
    builder.addCase(addSubject.rejected, (state, action) => {
      return {
        ...state,
        addStatus: "rejected",
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

export const getAllProgrammes = (state) => state.academics.allProgrammes;
export const getAgricProgram = (state) => state.academics.agricProgram;
export const getAllYears = (state) => state.academics.allYears;

export default academicsSlice.reducer;
