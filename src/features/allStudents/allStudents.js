import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = { allStudentsData: [] };

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/authusers/get_all_students`
    );
    return response.data.students;
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      return {
        ...state,
        allStudentsData: action.payload,
      };
    });
  },
});

export const getAllStudents = (state) => state.students.allStudentsData;

export default studentsSlice.reducer;
