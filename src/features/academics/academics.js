import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  programInfo: "",
  subjectInfo: "",
  allProgrammes: [],
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
  async (data, programId, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/admins/academics/${programId}/add_subject`,
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

export const fetchSingleAdmin = createAsyncThunk(
  "Admin/fetchSingleAdmin",
  async () => {
    const response = await axios.get(`${API_ENDPOINT}/admins/get_single_admin`);
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

    builder.addCase(fetchSingleAdmin.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchSingleAdmin.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          adminInfo: action.payload.admin,
          adminSuccessMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleAdmin.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        adminError: action.payload,
      };
    });
  },
});

export const getAllProgrammes = (state) => state.academics.allProgrammes;
export const getAllYears = (state) => state.academics.allYears;
export const getSingleAdmin = (state) => state.admin.adminInfo;
export const getAdminInfo = (state) => state.admin.authAdminInfo;

export default academicsSlice.reducer;