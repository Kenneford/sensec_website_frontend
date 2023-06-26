import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = [];

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/authusers/get_all_students`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    // allRegisteredStudents(state, action) {
    //   state.allStudentsData.push(action.payload);
    // },
  },
  extraReducers(builder) {
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// export const getStudents = (state) => state.students.allStudentsData;
export const getStudents = (state) => state.students;

// export const { allRegisteredStudents } = studentsSlice.actions;
export default studentsSlice.reducer;
