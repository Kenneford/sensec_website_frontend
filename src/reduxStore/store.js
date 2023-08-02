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
import academicYearsReducer from "../features/academics/academicYear/academicYearSlice";
import academicTermReducer from "../features/academics/academicTerm/academicTermSlice";
import yearGroupReducer from "../features/oldStudents/OldStudentsSlice";
import academicProgramReducer from "../features/academics/academicProgram/academicProgram";
import electiveSubjectReducer from "../features/academics/createSubjects/electiveSubjectSlice";
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
    academicYear: academicYearsReducer,
    academicTerm: academicTermReducer,
    academicProgram: academicProgramReducer,
    electiveSubject: electiveSubjectReducer,
    yearGroup: yearGroupReducer,
  },
  //   middleware: getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });
