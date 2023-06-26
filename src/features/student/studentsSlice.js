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
  allStudents: [],
  studentInfo: "",
  registerStatus: "",
  updateStatus: "",
  fetchingStatus: "",
  searchStatus: "",
  deleteStatus: "",
  successMessage: "",
  error: "",
  loginStatus: "",
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
  }
}

export const studentRegistory = createAsyncThunk(
  "students/studentRegistory",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/authusers/add_student`,
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
  "students/studentUpdate",
  async (student, { rejectWithValue }) => {
    try {
      const {
        _id,
        firstName,
        lastName,
        dateOfBirth,
        placeOfBirth,
        nationality,
        password,
        confirmPassword,
        email,
        studentId,
        courseStudy,
        //   studentRegistrar,
        level,
        isMale,
        studentImage,
        profilePicture,
        address,
        currentCity,
        homeTown,
        region,
        religion,
        height,
        weight,
        mother,
        father,
        guardian,
        motherTongue,
        otherTongue,
        complexion,
        registedDate,
      } = student;
      const res = await axios.put(
        `${API_ENDPOINT}/students/update_student/${_id}`,
        {
          firstName,
          lastName,
          dateOfBirth,
          placeOfBirth,
          nationality,
          password,
          confirmPassword,
          email,
          studentId,
          courseStudy,
          //   studentRegistrar,
          level,
          isMale,
          studentImage,
          profilePicture,
          address,
          currentCity,
          homeTown,
          region,
          religion,
          height,
          weight,
          mother,
          father,
          guardian,
          motherTongue,
          otherTongue,
          complexion,
          registedDate,
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
  "students/studentLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/authusers/student_login/`,
        data
      );
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
  "students/fetchStudents",
  async (id = null, { rejectWithValue }) => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/get_all_students`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const studentSearch = createAsyncThunk(
  "students/studentSearch",
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
  name: "student",
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
        successMessage: "",
        error: "",
        registerStatus: "",
        loginStatus: "",
        authenticated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(studentRegistory.pending, (state) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(studentRegistory.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          studentInfo: action.payload.student,
          allStudents: [...state.allStudents, action.payload.student],
          successMessage: action.payload.successMessage,
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
        error: action.payload.errorMessage,
        // error: "Failed To Register New Student!",
      };
    });
    builder.addCase(studentUpdate.pending, (state) => {
      return { ...state, updateStatus: "pending" };
    });
    builder.addCase(studentUpdate.fulfilled, (state, action) => {
      if (action.payload) {
        // const updatedStudentsData = state.allStudents.map((student) =>
        //   student._id === action.payload.updatedStudent._id
        //     ? action.payload.updatedStudent
        //     : student
        // );
        return {
          ...state,
          // allStudents: updatedStudentsData,
          allStudents: state.allStudents.map((student) =>
            student._id === action.payload.updatedStudent._id
              ? {
                  ...student,
                  mother: {
                    motherName: action.payload.updatedStudent.mother.motherName,
                    motherOccupation:
                      action.payload.updatedStudent.mother.motherOccupation,
                    motherPhoneNumber:
                      action.payload.updatedStudent.mother.motherPhoneNumber,
                    motherEmail:
                      action.payload.updatedStudent.mother.motherEmail,
                  },
                  father: {
                    fatherName: action.payload.updatedStudent.father.fatherName,
                    fatherOccupation:
                      action.payload.updatedStudent.father.fatherOccupation,
                    fatherPhoneNumber:
                      action.payload.updatedStudent.father.fatherPhoneNumber,
                    fatherEmail:
                      action.payload.updatedStudent.father.fatherEmail,
                  },
                  guardian: {
                    guardianName:
                      action.payload.updatedStudent.guardian.guardianName,
                    guardianOccupation:
                      action.payload.updatedStudent.guardian.guardianOccupation,
                    guardianPhoneNumber:
                      action.payload.updatedStudent.guardian
                        .guardianPhoneNumber,
                    guardianEmail:
                      action.payload.updatedStudent.guardian.guardianEmail,
                  },
                }
              : student
          ),
          studentInfo: action.payload.updatedStudent,
          successMessage: action.payload.successMessage,
          updateStatus: "success",
        };
      } else return state;
    });
    builder.addCase(studentUpdate.rejected, (state, action) => {
      return {
        ...state,
        updateStatus: "rejected",
        error: action.payload.errorMessage,
        // error: "Failed To Register New Student!",
      };
    });
    builder.addCase(studentLogin.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(studentLogin.fulfilled, (state, action) => {
      if (action.payload) {
        const student = tokenDecoded(action.payload.token);
        return {
          ...state,
          studentInfo: student,
          successMessage: action.payload.successMessage,
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
        error: action.payload.errorMessage,
      };
    });
    builder.addCase(fetchStudents.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      if (action.payload) {
        // const student = tokenDecoded(action.payload);
        return {
          ...state,
          allStudents: action.payload.students,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
          searchStatus: "",
        };
      } else return state;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload.errorMessage,
      };
    });
    builder.addCase(studentSearch.pending, (state, action) => {
      return { ...state, searchStatus: "pending" };
    });
    builder.addCase(studentSearch.fulfilled, (state, action) => {
      if (action.payload) {
        // const student = tokenDecoded(action.payload);
        return {
          ...state,
          allStudents: action.payload.student,
          successMessage: action.payload.successMessage,
          searchStatus: "success",
          fetchingStatus: "",
        };
      } else return state;
    });
    builder.addCase(studentSearch.rejected, (state, action) => {
      return {
        ...state,
        searchStatus: "rejected",
        error: action.payload.errorMessage,
      };
    });
  },
});

export const getAllStudents = (state) => state.student.allStudents;
export const getStudentInfo = (state) => state.student.studentInfo;

export const { registeredStudents, studentLogout } = studentSlice.actions;

export default studentSlice.reducer;
