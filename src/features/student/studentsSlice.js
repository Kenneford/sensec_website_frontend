import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  allStudents: [],
  studentInfo: "",
  studentParentInfo: "",
  studentGuardianInfo: "",
  registerStudentStatus: "",
  createGuardianStatus: "",
  createParentStatus: "",
  updateStudentStatus: "",
  fetchingStudentStatus: "",
  searchStudentStatus: "",
  deleteStudentStatus: "",
  studentSuccessMessage: "",
  studentError: "",
  loginStudentStatus: "",
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
  }
}

export const studentRegistory = createAsyncThunk(
  "Student/studentRegistory",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/students/register/admin`,
        data
      );
      console.log(res.data);
      localStorage.setItem(
        "newStudentRegisteredId",
        res.data.student.studentId
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createStudentParent = createAsyncThunk(
  "Student/createStudentParent",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/students/create_parents/admin`,
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

export const createStudentGuardian = createAsyncThunk(
  "Student/createStudentGuardian",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/students/create_guardian/admin`,
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

export const studentUpdate = createAsyncThunk(
  "Student/studentUpdate",
  async (student, id, { rejectWithValue }) => {
    try {
      const {
        firstName,
        lastName,
        dateOfBirth,
        placeOfBirth,
        nationality,
        email,
        studentId,
        courseStudy,
        studentRegistrar,
        studentRegistrarId,
        classLevel,
        isStudent,
        isMale,
        profilePicture,
        address,
        currentCity,
        homeTown,
        region,
        religion,
        height,
        weight,
        parents,
        guardian,
        motherTongue,
        otherTongue,
        complexion,
        registedDate,
      } = student;
      const res = await axios.put(
        `${API_ENDPOINT}/students/update_student/${id}/admin`,
        {
          student,
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const studentLogin = createAsyncThunk(
  "Student/studentLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_ENDPOINT}/students/login/`, data);
      console.log("Student", res.data);
      //   localStorage.setItem("user", res.data);
      localStorage.setItem("studentToken", res.data.token);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudents = createAsyncThunk(
  "Student/fetchStudents",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/get_all_students`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);
export const fetchSingleStudent = createAsyncThunk(
  "Student/fetchSingleStudent",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/students/get_single_student/${id}`
      );
      // const students = response.data;
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const studentSearch = createAsyncThunk(
  "Student/studentSearch",
  async (student_name, { rejectWithValue }) => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/search_student?student_name=${student_name}`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

const studentSlice = createSlice({
  name: "Student",
  initialState,
  reducers: {
    registeredStudents(state, action) {
      state.allStudents.push(action.payload.student);
    },
    studentLogout(state, action) {
      localStorage.removeItem("studentToken");
      return {
        ...state,
        studentInfo: "",
        studentSuccessMessage: "",
        studentError: "",
        registerStudentStatus: "",
        loginStudentStatus: "",
        authenticated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(studentRegistory.pending, (state) => {
      return { ...state, registerStudentStatus: "pending" };
    });
    builder.addCase(studentRegistory.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          studentInfo: action.payload.student,
          allStudents: [...state.allStudents, action.payload.student],
          studentSuccessMessage: action.payload.successMessage,
          registerStudentStatus: "success",
          authenticated: false,
        };
      } else return state;
    });
    builder.addCase(studentRegistory.rejected, (state, action) => {
      return {
        ...state,
        registerStudentStatus: "rejected",
        studentError: action.payload,
      };
    });
    builder.addCase(createStudentParent.pending, (state) => {
      return { ...state, createParentStatus: "pending" };
    });
    builder.addCase(createStudentParent.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          studentParentInfo: action.payload.parent,
          studentSuccessMessage: action.payload.successMessage,
          createParentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createStudentParent.rejected, (state, action) => {
      return {
        ...state,
        createParentStatus: "rejected",
        studentError: action.payload,
      };
    });

    builder.addCase(createStudentGuardian.pending, (state) => {
      return { ...state, createGuardianStatus: "pending" };
    });
    builder.addCase(createStudentGuardian.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          studentGuardianInfo: action.payload.guardian,
          studentSuccessMessage: action.payload.successMessage,
          createGuardianStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createStudentGuardian.rejected, (state, action) => {
      return {
        ...state,
        createGuardianStatus: "rejected",
        studentError: action.payload,
      };
    });

    builder.addCase(studentUpdate.pending, (state) => {
      return { ...state, updateStatus: "pending" };
    });
    builder.addCase(studentUpdate.fulfilled, (state, action) => {
      if (action.payload) {
        const updatedStudent = state.allStudents.map((student) =>
          student.studentId === action.payload.updatedStudent.studentId
            ? action.payload.updatedStudent
            : student
        );
        return {
          ...state,
          allStudents: updatedStudent,
          studentSuccessMessage: action.payload.successMessage,
          updateStatus: "success",
        };
      } else return state;
    });
    builder.addCase(studentUpdate.rejected, (state, action) => {
      return {
        ...state,
        updateStatus: "rejected",
        studentError: action.payload,
      };
    });

    builder.addCase(studentLogin.pending, (state, action) => {
      return { ...state, loginStudentStatus: "pending" };
    });
    builder.addCase(studentLogin.fulfilled, (state, action) => {
      if (action.payload) {
        const student = tokenDecoded(action.payload.token);
        return {
          ...state,
          studentInfo: student,
          studentSuccessMessage: action.payload.successMessage,
          loginStudentStatus: "success",
          authenticated: true,
          loading: false,
        };
      } else return state;
    });
    builder.addCase(studentLogin.rejected, (state, action) => {
      return {
        ...state,
        loginStudentStatus: "rejected",
        // error: "Authentication failed! Please check your input values!",
        studentError: action.payload,
      };
    });

    builder.addCase(fetchStudents.pending, (state, action) => {
      return { ...state, fetchingStudentStatus: "pending" };
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      if (action.payload) {
        // const student = tokenDecoded(action.payload);
        return {
          ...state,
          allStudents: action.payload.students,
          studentSuccessMessage: action.payload.successMessage,
          fetchingStudentStatus: "success",
          searchStudentStatus: "",
        };
      } else return state;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      return {
        ...state,
        fetchingStudentStatus: "rejected",
        studentError: action.payload,
      };
    });

    builder.addCase(fetchSingleStudent.pending, (state, action) => {
      return { ...state, fetchingStudentStatus: "pending" };
    });
    builder.addCase(fetchSingleStudent.fulfilled, (state, action) => {
      if (action.payload) {
        // const student = tokenDecoded(action.payload);
        return {
          ...state,
          studentInfo: action.payload.student,
          studentSuccessMessage: action.payload.successMessage,
          fetchingStudentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleStudent.rejected, (state, action) => {
      return {
        ...state,
        fetchingStudentStatus: "rejected",
        studentError: action.payload.errorMessage,
      };
    });

    builder.addCase(studentSearch.pending, (state, action) => {
      return { ...state, searchStudentStatus: "pending" };
    });
    builder.addCase(studentSearch.fulfilled, (state, action) => {
      if (action.payload) {
        // const student = tokenDecoded(action.payload);
        return {
          ...state,
          allStudents: action.payload.student,
          studentSuccessMessage: action.payload.successMessage,
          searchStudentStatus: "success",
          fetchingStudentStatus: "",
        };
      } else return state;
    });
    builder.addCase(studentSearch.rejected, (state, action) => {
      return {
        ...state,
        searchStudentStatus: "rejected",
        studentError: action.payload.errorMessage,
      };
    });
  },
});

export const getAllStudents = (state) => state.student.allStudents;
export const getStudentInfo = (state) => state.student.studentInfo;

export const { registeredStudents, studentLogout } = studentSlice.actions;

export default studentSlice.reducer;
