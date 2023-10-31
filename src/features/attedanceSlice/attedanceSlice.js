import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  attendanceInfo: "",
  presentAttendanceInfo: "",
  absentAttendanceInfo: "",
  holidayAttendanceInfo: "",
  allClassAttendances: [],
  allStudentAttendances: [],
  error: "",
  successMessage: "",
  addStatus: "",
  fetchingStatus: "",
};

export const addAttendance = createAsyncThunk(
  "Attendance/addAttendance",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/attendance/teacher/create`,
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
export const handleStudentAttendance = createAsyncThunk(
  "Attendance/handleStudentAttendance",
  async (data, teacherId, student_id, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/attendance/teacher/${teacherId}/${student_id}/create`,
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

// export const fetchPreviousAttendance = createAsyncThunk(
//   "Attendance/fetchPreviousAttendance",
//   async () => {
//     const response = await axios.get(
//       `${API_ENDPOINT}/admins/academics/get_class_levels`
//     );
//     // const students = response.data;
//     console.log(response.data);
//     return response.data;
//   }
// );

export const fetchClassAttendances = createAsyncThunk(
  "Attendance/fetchClassAttendances",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/attendance/get_all_students_attendance`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);
export const fetchSingleStudentAttendance = createAsyncThunk(
  "Attendance/fetchSingleStudentAttendance",
  async (studentId) => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/attendance/${studentId}`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const fetchStudentPresentAttendance = createAsyncThunk(
  "Attendance/fetchStudentPresentAttendance",
  async (studentId) => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/attendance/${studentId}/present`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const fetchStudentAbsentAttendance = createAsyncThunk(
  "Attendance/fetchStudentAbsentAttendance",
  async (studentId) => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/attendance/${studentId}/absent`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

export const fetchStudentHolidayAttendance = createAsyncThunk(
  "Attendance/fetchStudentHolidayAttendance",
  async (studentId) => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/attendance/${studentId}/holiday`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

const attendancesSlice = createSlice({
  name: "Attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addAttendance.pending, (state, action) => {
      return { ...state, addStatus: "pending" };
    });
    builder.addCase(addAttendance.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          attendanceInfo: action.payload.attendance,
          successMessage: action.payload.successMessage,
          addStatus: "success",
        };
      } else return state;
    });
    builder.addCase(addAttendance.rejected, (state, action) => {
      return {
        ...state,
        addStatus: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(handleStudentAttendance.pending, (state, action) => {
      return { ...state, addStatus: "pending" };
    });
    builder.addCase(handleStudentAttendance.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          attendanceInfo: action.payload.attendance,
          successMessage: action.payload.successMessage,
          addStatus: "success",
        };
      } else return state;
    });
    builder.addCase(handleStudentAttendance.rejected, (state, action) => {
      return {
        ...state,
        addStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchClassAttendances.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchClassAttendances.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allClassAttendances: action.payload.studentsAttendances,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchClassAttendances.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        teacherError: action.payload,
      };
    });

    builder.addCase(fetchSingleStudentAttendance.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchSingleStudentAttendance.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          attendanceInfo: action.payload.studentAttendance,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleStudentAttendance.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchStudentPresentAttendance.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(
      fetchStudentPresentAttendance.fulfilled,
      (state, action) => {
        if (action.payload) {
          return {
            ...state,
            presentAttendanceInfo: action.payload.studentAttendance,
            successMessage: action.payload.successMessage,
            fetchingStatus: "success",
          };
        } else return state;
      }
    );
    builder.addCase(fetchStudentPresentAttendance.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchStudentAbsentAttendance.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchStudentAbsentAttendance.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          absentAttendanceInfo: action.payload.studentAttendance,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchStudentAbsentAttendance.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchStudentHolidayAttendance.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(
      fetchStudentHolidayAttendance.fulfilled,
      (state, action) => {
        if (action.payload) {
          return {
            ...state,
            holidayAttendanceInfo: action.payload.studentAttendance,
            successMessage: action.payload.successMessage,
            fetchingStatus: "success",
          };
        } else return state;
      }
    );
    builder.addCase(fetchStudentHolidayAttendance.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllClassAttendances = (state) =>
  state.attendance.allClassAttendances;
export const getAllStudentAttendances = (state) =>
  state.attendance.allStudentAttendances;
export const getSingleStudentAttendance = (state) =>
  state.attendance.attendanceInfo;
export const getStudentPresentAttendance = (state) =>
  state.attendance.presentAttendanceInfo;
export const getStudentAbsentAttendance = (state) =>
  state.attendance.absentAttendanceInfo;
export const getStudentHolidayAttendance = (state) =>
  state.attendance.holidayAttendanceInfo;

export const getattendance200 = (state) =>
  state.attendance.attendance200.students;

export const getattendance300 = (state) =>
  state.attendance.attendance300.students;

export default attendancesSlice.reducer;
