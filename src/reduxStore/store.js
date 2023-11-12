import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/student/studentsSlice";
import PendingStudentDataReducer from "../features/pendingStudents/pendingStudentsSlice";
import staffsReducer from "../features/staff/staffSlice";
import academicsReducer from "../features/academics/academics";
import postReducer from "../features/posts/postSlice";
import emailReducer from "../features/email/emailSlice";
import adminsReducer from "../features/admin/adminsSlice";
import classLevelsReducer from "../features/classLevels/classLevelsSlice";
import classLevelsSectionReducer from "../features/classLevels/classLevelSectionSlice";
import teachersReducer from "../features/teacher/teachersSlice";
import attendanceReducer from "../features/attedanceSlice/attedanceSlice";
import academicYearsReducer from "../features/academics/academicYear/academicYearSlice";
import academicTermReducer from "../features/academics/academicTerm/academicTermSlice";
import yearGroupReducer from "../features/oldStudents/OldStudentsSlice";
import academicProgramReducer from "../features/academics/academicProgram/academicProgram";
import electiveSubjectReducer from "../features/academics/createSubjects/electiveSubjectSlice";
import coreSubjectReducer from "../features/academics/createSubjects/coreSubjectSlice";
import TimeTableReducer from "../features/timeTable/timeTableSlice";
import SchoolDataReducer from "../features/school/schoolSlice";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    admin: adminsReducer,
    teacher: teachersReducer,
    student: studentReducer,
    staff: staffsReducer,
    academics: academicsReducer,
    classLevel: classLevelsReducer,
    classLevelSection: classLevelsSectionReducer,
    post: postReducer,
    email: emailReducer,
    attendance: attendanceReducer,
    academicYear: academicYearsReducer,
    academicTerm: academicTermReducer,
    academicProgram: academicProgramReducer,
    electiveSubject: electiveSubjectReducer,
    coreSubject: coreSubjectReducer,
    yearGroup: yearGroupReducer,
    pendingStudentsData: PendingStudentDataReducer,
    timeTable: TimeTableReducer,
    schoolData: SchoolDataReducer,
  },
  //   middleware: getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });
