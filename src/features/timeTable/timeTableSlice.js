import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  timeTableInfo: "",
  timeInfo: "",
  allTimeTables: [],
  timeTableDayInfo: "",
  allTimeTableDays: [],
  successMessage: "",
  timeSuccessMessage: "",
  timeTableError: "",
  timeError: "",
  createStatus: "",
  fetchingStatus: "",
  fetchingTimeStatus: "",
  fetchAllSuccessMessage: "",
  fetchingSingleStatus: "",
};

export const createTimeTable = createAsyncThunk(
  "TimeTable/createTimeTable",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/students/time_table/create/admin`,
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
export const createTimeTableDay = createAsyncThunk(
  "TimeTable/createTimeTableDay",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/students/time_table/create/day/admin`,
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

export const fetchAllTimeTables = createAsyncThunk(
  "TimeTable/fetchAllTimeTables",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/time_table/get_all`
    );
    console.log(response.data);
    return response.data;
  }
);

export const fetchAllTimeTableDays = createAsyncThunk(
  "TimeTable/fetchAllTimeTableDays",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/time_table/days/get_all`
    );
    console.log(response.data);
    return response.data;
  }
);

export const fetchTime = createAsyncThunk("TimeTable/fetchTime", async () => {
  const response = await axios.get(
    `${API_ENDPOINT}/students/time_table/get_time`
  );
  console.log(response.data);
  return response.data;
});

export const fetchSingleTimeTable = createAsyncThunk(
  "TimeTable/fetchSingleTimeTable",
  async ({ program, currentClassLevel }) => {
    const response = await axios.get(
      `${API_ENDPOINT}/students/time_table/${program}/${currentClassLevel}/get_single`
    );
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

const PendingStudentDataSlice = createSlice({
  name: "TimeTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTimeTable.pending, (state, action) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createTimeTable.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          timeTableInfo: action.payload.pendingData,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createTimeTable.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        timeTableError: action.payload,
      };
    });
    builder.addCase(createTimeTableDay.pending, (state, action) => {
      return { ...state, createStatus: "pending" };
    });
    builder.addCase(createTimeTableDay.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          timeTableDayInfo: action.payload.timeTableDay,
          successMessage: action.payload.successMessage,
          createStatus: "success",
        };
      } else return state;
    });
    builder.addCase(createTimeTableDay.rejected, (state, action) => {
      return {
        ...state,
        createStatus: "rejected",
        timeTableError: action.payload,
      };
    });

    builder.addCase(fetchAllTimeTables.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAllTimeTables.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allTimeTables: action.payload.allTimeTables,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllTimeTables.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        timeTableError: action.payload,
      };
    });

    builder.addCase(fetchTime.pending, (state, action) => {
      return { ...state, fetchingTimeStatus: "pending" };
    });
    builder.addCase(fetchTime.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          timeInfo: action.payload.time,
          timeSuccessMessage: action.payload.successMessage,
          fetchingTimeStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchTime.rejected, (state, action) => {
      return {
        ...state,
        fetchingTimeStatus: "rejected",
        timeError: action.payload,
      };
    });

    builder.addCase(fetchAllTimeTableDays.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAllTimeTableDays.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allTimeTableDays: action.payload.allTimeTableDays,
          fetchAllSuccessMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllTimeTableDays.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        timeTableError: action.payload,
      };
    });

    builder.addCase(fetchSingleTimeTable.pending, (state, action) => {
      return { ...state, fetchingSingleStatus: "pending" };
    });
    builder.addCase(fetchSingleTimeTable.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          timeTableInfo: action.payload.singleTimeTable,
          successMessage: action.payload.successMessage,
          fetchingSingleStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleTimeTable.rejected, (state, action) => {
      return {
        ...state,
        fetchingSingleStatus: "rejected",
        timeTableError: action.payload,
      };
    });
  },
});
export const getAllTimeTables = (state) => state.timeTable.allTimeTables;
export const getSingleTimeTable = (state) => state.timeTable.timeTableInfo;
export const getTime = (state) => state.timeTable.timeInfo;

export default PendingStudentDataSlice.reducer;
