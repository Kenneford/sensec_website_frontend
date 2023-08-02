import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  allStudents: [],
  allGraduates: [],
  studentInfo: "",
  studentParentInfo: "",
  studentGuardianInfo: "",
  registerStudentStatus: "",
  createGuardianStatus: "",
  createParentStatus: "",
  updateStudentStatus: "",
  fetchingStudentStatus: "",
  fetchingSingleStudentStatus: "",
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
  async (student, id, name, { rejectWithValue }) => {
    try {
      // const {
      //   firstName,
      //   lastName,
      //   dateOfBirth,
      //   placeOfBirth,
      //   nationality,
      //   email,
      //   program,
      //   updatedBy,
      //   updatedByAdminId,
      //   academicYear,
      //   currentClassLevel,
      //   role,
      //   gender,
      //   address,
      //   currentCity,
      //   homeTown,
      //   region,
      //   religion,
      //   height,
      //   weight,
      //   motherTongue,
      //   otherTongue,
      //   complexion,
      //   updatedDate,
      // } = student;
      const res = await axios.put(
        `${API_ENDPOINT}/students/update_student/${name}/${id}/admin`,
        // {
        //   firstName,
        //   lastName,
        //   dateOfBirth,
        //   placeOfBirth,
        //   nationality,
        //   email,
        //   program,
        //   updatedBy,
        //   updatedByAdminId,
        //   academicYear,
        //   currentClassLevel,
        //   role,
        //   gender,
        //   address,
        //   currentCity,
        //   homeTown,
        //   region,
        //   religion,
        //   height,
        //   weight,
        //   motherTongue,
        //   otherTongue,
        //   complexion,
        //   updatedDate,
        // }
        {
          student,
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const studentLogin = createAsyncThunk(
  "Student/studentLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_ENDPOINT}/students/login/`, data);
      console.log("Student", res.data);
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
    console.log(response.data);
    return response.data;
  }
);

export const fetchGraduates = createAsyncThunk(
  "Student/fetchGraduates",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/get_all_graduates`
    );
    console.log(response.data);
    return response.data;
  }
);
export const fetchSingleStudent = createAsyncThunk(
  "Student/fetchSingleStudent",
  async (studentId) => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/get_single_student/${studentId}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const studentSearch = createAsyncThunk(
  "Student/studentSearch",
  async (student_name, { rejectWithValue }) => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/search_student?student_name=${student_name}`
    );
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
      return { ...state, updateStudentStatus: "pending" };
    });
    builder.addCase(studentUpdate.fulfilled, (state, action) => {
      if (action.payload) {
        const updatedStudents = state.allStudents.map((student) =>
          student.studentId === action.payload.updatedStudent.studentId
            ? action.payload.updatedStudent
            : student
        );
        return {
          ...state,
          allStudents: updatedStudents,
          studentSuccessMessage: action.payload.successMessage,
          updateStudentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(studentUpdate.rejected, (state, action) => {
      return {
        ...state,
        updateStudentStatus: "rejected",
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
        };
      } else return state;
    });
    builder.addCase(studentLogin.rejected, (state, action) => {
      return {
        ...state,
        loginStudentStatus: "rejected",
        studentError: action.payload,
      };
    });

    builder.addCase(fetchStudents.pending, (state, action) => {
      return { ...state, fetchingStudentStatus: "pending" };
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      if (action.payload) {
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

    builder.addCase(fetchGraduates.pending, (state, action) => {
      return { ...state, fetchingGraduatesStatus: "pending" };
    });
    builder.addCase(fetchGraduates.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allGraduates: action.payload.graduatedStudents,
          studentSuccessMessage: action.payload.successMessage,
          fetchingGraduatesStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchGraduates.rejected, (state, action) => {
      return {
        ...state,
        fetchingGraduatesStatus: "rejected",
        studentError: action.payload,
      };
    });

    builder.addCase(fetchSingleStudent.pending, (state, action) => {
      return { ...state, fetchingSingleStudentStatus: "pending" };
    });
    builder.addCase(fetchSingleStudent.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          studentInfo: action.payload.student,
          studentSuccessMessage: action.payload.successMessage,
          fetchingSingleStudentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleStudent.rejected, (state, action) => {
      return {
        ...state,
        fetchingSingleStudentStatus: "rejected",
        studentError: action.payload,
      };
    });

    builder.addCase(studentSearch.pending, (state, action) => {
      return { ...state, searchStudentStatus: "pending" };
    });
    builder.addCase(studentSearch.fulfilled, (state, action) => {
      if (action.payload) {
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
export const getAllGraduates = (state) => state.student.allGraduates;
export const getStudentInfo = (state) => state.student.studentInfo;

export const { registeredStudents, studentLogout } = studentSlice.actions;

export default studentSlice.reducer;
