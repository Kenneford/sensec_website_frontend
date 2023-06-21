import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/student/studentsSlice";
import staffsReducer from "../features/staff/staffSlice";
import StudentsReducer from "../features/allStudents/allStudents";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    staffs: staffsReducer,
    students: StudentsReducer,
  },
  //   middleware: getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });
