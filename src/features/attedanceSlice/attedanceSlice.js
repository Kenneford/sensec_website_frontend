import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  attendanceInfo: "",
  allAttendances: [],
  error: "",
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

export const fetchAttendances = createAsyncThunk(
  "Attendance/fetchAttendances",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/academics/get_class_levels`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);
export const fetchSingleAttendance = createAsyncThunk(
  "Attendance/fetchSingleAttendance",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/admins/academics/get_class_level100`
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
          error: "",
        };
      } else return state;
    });
    builder.addCase(addAttendance.rejected, (state, action) => {
      return {
        ...state,
        addStatus: "rejected",
        teacherError: action.payload,
      };
    });

    builder.addCase(fetchAttendances.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAttendances.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allattendances: action.payload.attendances,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAttendances.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        teacherError: action.payload,
      };
    });

    builder.addCase(fetchSingleAttendance.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchSingleAttendance.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          attendance100: action.payload.attendance,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleAttendance.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllattendances = (state) => state.attendance.allattendances;
export const getattendance100 = (state) =>
  state.attendance.attendance100.students;

export const getattendance200 = (state) =>
  state.attendance.attendance200.students;

export const getattendance300 = (state) =>
  state.attendance.attendance300.students;

export default attendancesSlice.reducer;
