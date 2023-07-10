import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  teacherInfo: "",
  authTeacherInfo: "",
  allTeachers: [],
  teacherSuccessMessage: "",
  teacherError: "",
  registerTeacherStatus: "",
  loginStatus: "",
  logoutStatus: "",
  fetchingStatus: "",
  authenticated: false,
};

const tokenDecoded = (token) => {
  const decodeToken = jwtDecode(token);
  const expTime = new Date(decodeToken.exp * 1000);
  if (new Date() > expTime) {
    return null;
  }
  return decodeToken;
};

const getTeacherToken = localStorage.getItem("teacherToken");
if (getTeacherToken) {
  const getTeacherInfo = tokenDecoded(getTeacherToken);
  if (getTeacherInfo) {
    initialState.authTeacherInfo = getTeacherInfo;
    initialState.authenticated = true;
    initialState.loading = false;
  }
}

export const teacherRegistory = createAsyncThunk(
  "Teacher/teacherRegistory",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/teachers/add_teacher/admin`,
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

export const fetchTeachers = createAsyncThunk(
  "Teacher/fetchTeachers",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/teachers/get_all_teachers`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const fetchSingleTeacher = createAsyncThunk(
  "Teacher/fetchSingleTeacher",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/teachers/get_single_teacher`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const teacherLogin = createAsyncThunk(
  "Teacher/teacherLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_ENDPOINT}/teachers/login`, data);
      console.log("Teacher", res.data);
      //   localStorage.setItem("user", res.data);
      localStorage.setItem("teacherToken", res.data.token);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutTeacher = createAsyncThunk(
  "Teacher/logoutTeacher",
  async ({ rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_ENDPOINT}/teachers/logout`);
      console.log(res.data);
      if (res.data.success) {
        localStorage.removeItem("teacherToken");
      }
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const teachersSlice = createSlice({
  name: "Teacher",
  initialState,
  reducers: {
    teacherLogout(state, action) {
      localStorage.removeItem("teacherToken");
      return {
        ...state,
        teacherInfo: "",
        authTeacherInfo: "",
        allTeachers: [],
        teacherSuccessMessage: "",
        teacherError: "",
        registerTeacherStatus: "",
        loginStatus: "",
        logoutStatus: "",
        fetchingStatus: "",
        authenticated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(teacherRegistory.pending, (state, action) => {
      return { ...state, registerTeacherStatus: "pending" };
    });
    builder.addCase(teacherRegistory.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          teacherInfo: action.payload.teacher,
          teacherSuccessMessage: action.payload.successMessage,
          registerTeacherStatus: "success",
          teacherError: "",
          authenticated: false,
        };
      } else return state;
    });
    builder.addCase(teacherRegistory.rejected, (state, action) => {
      return {
        ...state,
        registerTeacherStatus: "rejected",
        teacherError: action.payload,
      };
    });

    builder.addCase(teacherLogin.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(teacherLogin.fulfilled, (state, action) => {
      if (action.payload) {
        const teacher = tokenDecoded(action.payload.token);
        return {
          ...state,
          authTeacherInfo: teacher,
          teacherSuccessMessage: action.payload.successMessage,
          loginStatus: "success",
          authenticated: true,
        };
      } else return state;
    });
    builder.addCase(teacherLogin.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        teacherError: action.payload,
      };
    });

    builder.addCase(logoutTeacher.pending, (state, action) => {
      return { ...state, logoutStatus: "pending" };
    });
    builder.addCase(logoutTeacher.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          TeacherInfo: "",
          authTeacherInfo: "",
          TeacherSuccessMessage: "",
          TeacherError: "",
          registerTeacherStatus: "",
          loginStatus: "",
          fetchingStatus: "",
          allTeachers: [],
          authenticated: false,
        };
      } else return state;
    });
    builder.addCase(logoutTeacher.rejected, (state, action) => {
      return {
        ...state,
        logoutStatus: "rejected",
        TeacherError: "Logout failed!",
      };
    });

    builder.addCase(fetchTeachers.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allTeachers: action.payload.Teachers,
          TeacherSuccessMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchTeachers.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        TeacherError: action.payload,
      };
    });

    builder.addCase(fetchSingleTeacher.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchSingleTeacher.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          TeacherInfo: action.payload.Teacher,
          TeacherSuccessMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleTeacher.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        TeacherError: action.payload,
      };
    });
  },
});

export const getAllTeachers = (state) => state.teacher.allTeachers;
export const getSingleTeacher = (state) => state.teacher.teacherInfo;
export const getTeacherInfo = (state) => state.teacher.authTeacherInfo;

export const { teacherLogout } = teachersSlice.actions;

export default teachersSlice.reducer;
