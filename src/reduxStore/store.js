import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/student/studentsSlice";
import staffsReducer from "../features/staff/staffSlice";
import StudentsReducer from "../features/allStudents/allStudents";
import postSlice from "../features/posts/postSlice";
import emailSlice from "../features/email/emailSlice";
import adminsReducer from "../features/admin/adminsSlice";
import teachersReducer from "../features/teacher/teachersSlice";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    admin: adminsReducer,
    teacher: teachersReducer,
    student: studentReducer,
    staff: staffsReducer,
    students: StudentsReducer,
    post: postSlice,
    email: emailSlice,
  },
  //   middleware: getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });
