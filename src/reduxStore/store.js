import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/student/studentsSlice";
import staffsReducer from "../features/staff/staffSlice";
import academicsReducer from "../features/academics/academics";
import postSlice from "../features/posts/postSlice";
import emailSlice from "../features/email/emailSlice";
import adminsReducer from "../features/admin/adminsSlice";
import classLevelsReducer from "../features/classLevels/classLevelsSlice";
import teachersReducer from "../features/teacher/teachersSlice";
import attendanceReducer from "../features/attedanceSlice/attedanceSlice";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    admin: adminsReducer,
    teacher: teachersReducer,
    student: studentReducer,
    staff: staffsReducer,
    academics: academicsReducer,
    classLevel: classLevelsReducer,
    post: postSlice,
    email: emailSlice,
    attendance: attendanceReducer,
  },
  //   middleware: getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });
