import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../../apiEndPoint/api";

// const API_ENDPOINT = "http://localhost:7000/api";

// const initialState = [
//   {
//     id: 1,
//     name: "Patrick Annan",
//     course: "Science",
//   },
//   {
//     id: 2,
//     name: "Robert Afful",
//     course: "E-Maths",
//   },
// ];

const initialState = {
  studentInfo: "",
  successMessage: "",
  error: "",
  registerStatus: "",
  loginStatus: "",
  fetchingStatus: "",
  // loginError: "",
  allStudents: [],
  loading: true,
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

const getStudentToken = localStorage.getItem("studentToken");
if (getStudentToken) {
  const getStudentInfo = tokenDecoded(getStudentToken);
  if (getStudentInfo) {
    initialState.studentInfo = getStudentInfo;
    initialState.authenticated = true;
    initialState.loading = false;
  }
}

export const studentRegistory = createAsyncThunk(
  "students/studentRegistory",
  async (data, { rejectWithValue }) => {
    try {
      await axios.post(`${API_ENDPOINT}/authusers/add_student`, data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const studentLogin = createAsyncThunk(
  "students/studentLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/authusers/student_login`,
        data
      );
      console.log("Student", res.data);
      //   localStorage.setItem("user", res.data);
      localStorage.setItem("studentToken", res.data.token);
      return res.data.token;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllStudents = createAsyncThunk(
  "student/fetchAllStudents",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_ENDPOINT}/authusers/get_all_students`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    studentLogout(state, action) {
      localStorage.removeItem("studentToken");

      return {
        ...state,
        studentInfo: "",
        successMessage: "",
        error: "",
        registerStatus: "",
        loginStatus: "",
        // loginError: "",
        allStudents: [
          // {
          //   id: 1,
          //   name: "Patrick Annan",
          //   course: "Science",
          // },
          // {
          //   id: 2,
          //   name: "Robert Afful",
          //   course: "E-Maths",
          // },
        ],
        loading: true,
        authenticated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(studentRegistory.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(studentRegistory.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          studentInfo: action.payload,
          successMessage: "Student Registered Successfully...",
          registerStatus: "success",
          error: "",
          authenticated: false,
          loading: false,
        };
      } else return state;
    });
    builder.addCase(studentRegistory.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        error: action.payload,
        // error: "Failed To Register New Student!",
      };
    });
    builder.addCase(studentLogin.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(studentLogin.fulfilled, (state, action) => {
      if (action.payload) {
        const student = tokenDecoded(action.payload);
        return {
          ...state,
          studentInfo: student,
          successMessage: "Login Successful...",
          loginStatus: "success",
          authenticated: true,
          loading: false,
        };
      } else return state;
    });
    builder.addCase(studentLogin.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        // error: "Authentication failed! Please check your input values!",
        error: action.payload,
      };
    });
    builder.addCase(fetchAllStudents.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAllStudents.fulfilled, (state, action) => {
      if (action.payload) {
        // const student = tokenDecoded(action.payload);
        return {
          ...state,
          allStudents: action.payload,
          successMessage: "All students data fetch successful!",
          fetchingStatus: "success",
          loading: false,
        };
      } else return state;
    });
    builder.addCase(fetchAllStudents.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

// export const getAllStudents = (state) => state.student.allStudents;
export const getStudentInfo = (state) => state.student.studentInfo;
export const { studentLogout } = studentSlice.actions;

export default studentSlice.reducer;
