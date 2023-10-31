import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  allStudents: [],
  allPendingStudents: [],
  allLevel100Students: [],
  allLevel200Students: [],
  allLevel300Students: [],
  allGraduates: [],
  studentInfo: "",
  fetchSingleStudent: "",
  studentParentInfo: "",
  studentGuardianInfo: "",
  registerStudentStatus: "",
  createGuardianStatus: "",
  createParentStatus: "",
  updateStudentStatus: "",
  updateStudentImageStatus: "",
  fetchingStudentStatus: "",
  fetchingPendingStudentsStatus: "",
  fetchingSingleStudentStatus: "",
  searchStudentStatus: "",
  deleteStudentStatus: "",
  studentLoginSuccessMessage: "",
  studentSuccessMessage: "",
  studentLoginError: "",
  studentError: "",
  studentLoginStatus: "",
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
  async (
    {
      id,
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      gender,
      jhsAttended,
      shsAttended,
      nationality,
      district,
      address,
      currentCity,
      homeTown,
      region,
      email,
      studentId,
      role,
      currentClassLevel,
      program,
      academicYear,
      // religion,
      height,
      weight,
      // parents,
      // guardian,
      motherTongue,
      otherTongue,
      complexion,
      profilePicture,
      updatedBy,
      updatedByAdminId,
      updatedDate,
    },
    { rejectWithValue }
  ) => {
    try {
      // const {
      //   firstName,
      //   lastName,
      //   dateOfBirth,
      //   placeOfBirth,
      //   gender,
      //   jhsAttended,
      //   shsAttended,
      //   nationality,
      //   district,
      //   address,
      //   currentCity,
      //   homeTown,
      //   region,
      //   email,
      //   studentId,
      //   role,
      //   currentClassLevel,
      //   program,
      //   academicYear,
      //   studentRegistrar,
      //   studentRegistrarId,
      //   // religion,
      //   height,
      //   weight,
      //   // parents,
      //   // guardian,
      //   motherTongue,
      //   otherTongue,
      //   complexion,
      //   updatedBy,
      //   updatedByAdminId,
      //   updatedDate,
      //   password,
      // } = student;

      const res = await axios.put(
        `${API_ENDPOINT}/students/update_student/${firstName}_${lastName}/${id}/admin`,
        {
          firstName,
          lastName,
          dateOfBirth,
          placeOfBirth,
          gender,
          jhsAttended,
          shsAttended,
          nationality,
          district,
          address,
          currentCity,
          homeTown,
          region,
          email,
          studentId,
          role,
          currentClassLevel,
          program,
          academicYear,
          // religion,
          height,
          weight,
          // parents,
          // guardian,
          motherTongue,
          otherTongue,
          complexion,
          profilePicture,
          updatedBy,
          updatedByAdminId,
          updatedDate,
        }
        // {
        //   student,
        // }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const studentUpdateImage = createAsyncThunk(
  "Student/studentUpdateImage",
  async (
    {
      id,
      firstName,
      lastName,
      profilePicture,
      updatedBy,
      updatedByAdminId,
      updatedDate,
    },
    { rejectWithValue }
  ) => {
    try {
      // const {
      //   firstName,
      //   lastName,
      //   dateOfBirth,
      //   placeOfBirth,
      //   gender,
      //   jhsAttended,
      //   shsAttended,
      //   nationality,
      //   district,
      //   address,
      //   currentCity,
      //   homeTown,
      //   region,
      //   email,
      //   studentId,
      //   role,
      //   currentClassLevel,
      //   program,
      //   academicYear,
      //   studentRegistrar,
      //   studentRegistrarId,
      //   // religion,
      //   height,
      //   weight,
      //   // parents,
      //   // guardian,
      //   motherTongue,
      //   otherTongue,
      //   complexion,
      //   updatedBy,
      //   updatedByAdminId,
      //   updatedDate,
      //   password,
      // } = student;

      const res = await axios.put(
        `${API_ENDPOINT}/students/update_student/${firstName}_${lastName}/${id}/image`,
        {
          firstName,
          lastName,
          profilePicture,
          updatedBy,
          updatedByAdminId,
          updatedDate,
        }
        // {
        //   student,
        // }
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
export const fetchPendingStudents = createAsyncThunk(
  "Student/fetchPendingStudents",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/get_all_pending_students`
    );
    console.log(response.data);
    return response.data;
  }
);
export const fetchLevel100Students = createAsyncThunk(
  "Student/fetchLevel100Students",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/get_level100_students`
    );
    console.log(response.data);
    return response.data;
  }
);
export const fetchLevel200Students = createAsyncThunk(
  "Student/fetchLevel200Students",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/get_level200_students`
    );
    console.log(response.data);
    return response.data;
  }
);
export const fetchLevel300Students = createAsyncThunk(
  "Student/fetchLevel300Students",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/get_level300_students`
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
  async (student_name) => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/search_student?student_name=${student_name}`
    );
    console.log(response.data);
    return response.data;
  }
);
export const searchOldStudent = createAsyncThunk(
  "Student/searchOldStudent",
  async (student_name, { rejectWithValue }) => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/graduates/search_student?student_name=${student_name}`
    );
    console.log(response.data);
    return response.data;
  }
);

const studentSlice = createSlice({
  name: "Student",
  initialState: initialState,
  reducers: {
    studentUpdated(state, action) {
      const {
        _id,
        firstName,
        lastName,
        dateOfBirth,
        placeOfBirth,
        gender,
        jhsAttended,
        shsAttended,
        nationality,
        district,
        address,
        currentCity,
        homeTown,
        region,
        email,
        studentId,
        role,
        currentClassLevel,
        program,
        academicYear,
        studentRegistrar,
        studentRegistrarId,
        // religion,
        height,
        weight,
        // parents,
        // guardian,
        motherTongue,
        otherTongue,
        complexion,
        updatedBy,
        updatedByAdminId,
        updatedDate,
        password,
      } = action.payload;
      const updatedStudent = state.find((user) => user._id === _id);
      if (updatedStudent) {
        updatedStudent.firstName = firstName;
        updatedStudent.lastName = lastName;
        updatedStudent.dateOfBirth = dateOfBirth;
        updatedStudent.placeOfBirth = placeOfBirth;
        updatedStudent.gender = gender;
        updatedStudent.jhsAttended = jhsAttended;
        updatedStudent.shsAttended = shsAttended;
        updatedStudent.nationality = nationality;
        updatedStudent.district = district;
        updatedStudent.address = address;
        updatedStudent.currentCity = currentCity;
        updatedStudent.homeTown = homeTown;
        updatedStudent.region = region;
        updatedStudent.email = email;
        updatedStudent.studentId = studentId;
        updatedStudent.role = role;
        updatedStudent.currentClassLevel = currentClassLevel;
        updatedStudent.program = program;
        updatedStudent.academicYear = academicYear;
        updatedStudent.studentRegistrar = studentRegistrar;
        updatedStudent.studentRegistrarId = studentRegistrarId;
        // religion,
        updatedStudent.height = height;
        updatedStudent.weight = weight;
        // parents,
        // guardian,
        updatedStudent.motherTongue = motherTongue;
        updatedStudent.otherTongue = otherTongue;
        updatedStudent.complexion = complexion;
        updatedStudent.updatedBy = updatedBy;
        updatedStudent.updatedByAdminId = updatedByAdminId;
        updatedStudent.updatedDate = updatedDate;
        updatedStudent.password = password;
      }
    },
    studentLogout(state) {
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
          student._id === action.payload.updatedStudent._id
            ? action.payload.updatedStudent
            : student
        );
        if (updatedStudents) {
          return {
            ...state,
            allStudents: updatedStudents,
            studentSuccessMessage: action.payload.successMessage,
            updateStudentStatus: "success",
          };
        }
      } else return state;
    });
    builder.addCase(studentUpdate.rejected, (state, action) => {
      return {
        ...state,
        updateStudentStatus: "rejected",
        studentError: action.payload,
      };
    });

    builder.addCase(studentUpdateImage.pending, (state) => {
      return { ...state, updateStudentStatus: "pending" };
    });
    builder.addCase(studentUpdateImage.fulfilled, (state, action) => {
      if (action.payload) {
        const updatedStudents = state.allStudents.map((student) =>
          student._id === action.payload.updatedStudent._id
            ? action.payload.updatedStudent
            : student
        );
        if (updatedStudents) {
          return {
            ...state,
            allStudents: updatedStudents,
            studentSuccessMessage: action.payload.successMessage,
            updateStudentImageStatus: "success",
          };
        }
      } else return state;
    });
    builder.addCase(studentUpdateImage.rejected, (state, action) => {
      return {
        ...state,
        updateStudentImageStatus: "rejected",
        studentError: action.payload,
      };
    });

    builder.addCase(studentLogin.pending, (state, action) => {
      return { ...state, studentLoginStatus: "pending" };
    });
    builder.addCase(studentLogin.fulfilled, (state, action) => {
      if (action.payload) {
        const student = tokenDecoded(action.payload.token);
        return {
          ...state,
          studentInfo: student,
          studentLoginSuccessMessage: action.payload.successMessage,
          studentLoginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(studentLogin.rejected, (state, action) => {
      return {
        ...state,
        studentLoginStatus: "rejected",
        studentLoginError: action.payload,
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

    builder.addCase(fetchPendingStudents.pending, (state, action) => {
      return { ...state, fetchingPendingStudentsStatus: "pending" };
    });
    builder.addCase(fetchPendingStudents.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allPendingStudents: action.payload.students,
          studentSuccessMessage: action.payload.successMessage,
          fetchingPendingStudentsStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchPendingStudents.rejected, (state, action) => {
      return {
        ...state,
        fetchingPendingStudentsStatus: "rejected",
        studentError: action.payload,
      };
    });

    builder.addCase(fetchLevel100Students.pending, (state) => {
      return { ...state, fetchingStudentStatus: "pending" };
    });
    builder.addCase(fetchLevel100Students.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allLevel100Students: action.payload.students,
          studentSuccessMessage: action.payload.successMessage,
          fetchingStudentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchLevel100Students.rejected, (state, action) => {
      return {
        ...state,
        fetchingStudentStatus: "rejected",
        studentError: action.payload,
      };
    });

    builder.addCase(fetchLevel200Students.pending, (state) => {
      return { ...state, fetchingStudentStatus: "pending" };
    });
    builder.addCase(fetchLevel200Students.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allLevel200Students: action.payload.students,
          studentSuccessMessage: action.payload.successMessage,
          fetchingStudentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchLevel200Students.rejected, (state, action) => {
      return {
        ...state,
        fetchingStudentStatus: "rejected",
        studentError: action.payload,
      };
    });

    builder.addCase(fetchLevel300Students.pending, (state) => {
      return { ...state, fetchingStudentStatus: "pending" };
    });
    builder.addCase(fetchLevel300Students.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allLevel300Students: action.payload.students,
          studentSuccessMessage: action.payload.successMessage,
          fetchingStudentStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchLevel300Students.rejected, (state, action) => {
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

    builder.addCase(searchOldStudent.pending, (state, action) => {
      return { ...state, searchStudentStatus: "pending" };
    });
    builder.addCase(searchOldStudent.fulfilled, (state, action) => {
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
    builder.addCase(searchOldStudent.rejected, (state, action) => {
      return {
        ...state,
        searchStudentStatus: "rejected",
        studentError: action.payload.errorMessage,
      };
    });
  },
});

export const getAllStudents = (state) => state.student.allStudents;
export const getAllPendingStudents = (state) =>
  state.student.allPendingStudents;
export const getAllLevel100Students = (state) =>
  state.student.allLevel100Students;
export const getAllLevel200Students = (state) =>
  state.student.allLevel200Students;
export const getAllLevel300Students = (state) =>
  state.student.allLevel300Students;
export const getAllGraduates = (state) => state.student.allGraduates;
export const getStudentInfo = (state) => state.student.studentInfo;
export const getSingleStudentInfo = (state) => state.student.fetchSingleStudent;

export const { studentUpdated, studentLogout } = studentSlice.actions;

export default studentSlice.reducer;
