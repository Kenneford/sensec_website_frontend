import React, { useEffect, useState } from "react";
import "./app.scss";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import TelegramIcon from "@mui/icons-material/Telegram";
import CloseIcon from "@mui/icons-material/Close";
import AdminDashboard from "./pages/admin/adminDashboard/AdminDashboard";
import Home from "./pages/home/Home";
import NavBar from "./components/navBar/NavBar";
import AdminTeachers from "./components/adminSection/adminTeachers/AdminTeachers";
import DashboardContent from "./components/adminSection/dashboardContent/DashboardContent";
import AdminStudents from "./components/adminSection/adminStudents/AdminStudents";
import About from "./pages/about/About";
import Courses from "./pages/courses/Courses";
import Contact from "./pages/contact/Contact";
import Enrollments from "./pages/enrollments/Enrollments";
import AdminLoginPage from "./pages/admin/adminLogin/AdminLoginPage";
import StaffLogin from "./pages/staff/staffLogin/StaffLogin";
import StudentLoginPage from "./pages/student/studentLogin/StudentLoginPage";
import TeacherLoginPage from "./pages/teacher/teacherLogin/TeacherLoginPage";
import StaffDashboard from "./pages/staff/staffDashboard/staffDashboard";
import StudentDashBoard from "./pages/student/studentDashBoard/StudentDashBoard";
import TeacherDashBoard from "./pages/teacher/teacherDashboard/TeacherDashboard";
import StudentDashBoardContent from "./components/studentSection/studentDashBoard/StudentDashBoardContent";
import TeacherDashBoardContent from "./components/teacherSection/teacherDashBoard/TeacherDashBoardContent";
import StaffDashBoardContent from "./components/staffSection/staffDashBoard/StaffDashBoardContent";
import AdminStudentAdd from "./components/adminSection/adminStudents/addStudent/AdminStudentAdd";
import TotalStudents from "./components/adminSection/adminStudents/totalStudents/TotalStudents";
import { useSelector } from "react-redux";
import { getStudentInfo } from "./features/student/studentsSlice";
import { getStaffInfo } from "./features/staff/staffSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllStaffMembers from "./components/adminSection/adminStaff/allStaffMembers/AllStaffMembers";
import AddStaffMember from "./components/adminSection/adminStaff/newRegistration/NewRegistration";
import UpdateStudent from "./components/adminSection/adminStudents/updateStudent/AdminUpdateStudent";
import GeneralNotice from "./pages/notice/GeneralNotice";
import AllNotices from "./components/noticeSection/AllNotices";
import SingleNotice from "./pages/notice/SingleNotice";
import EmailTemplate from "./components/emailTemplate/EmailTemplate";
import StudentInfos from "./components/studentSection/studentInfo/StudentInfos";
import UpdatePost from "./components/adminSection/updatePost/UpdatePost";
import { getAdminInfo } from "./features/admin/adminsSlice";
import { getTeacherInfo } from "./features/teacher/teachersSlice";
import StudentParentGuardian from "./components/adminSection/adminStudents/studentParentGuardian/StudentParentGuardian";
import StudentGuardian from "./components/adminSection/adminStudents/studentGuardian/StudentGuardian";
import AdminProgramesSubjects from "./components/adminSection/adminProgrames_Subjects/AdminProgramesSubjects";
import AllAdmins from "./components/adminSection/allAdmins/AllAdmins";
import ProgramOverView from "./pages/programOverView/ProgramOverView";
import SubjectOverView from "./pages/subjectOverView/SubjectOverView";
import AdminAttendance from "./components/adminSection/adminAttendance/AdminAttendance";
import TeacherAttendance from "./components/teacherSection/attendanceTeacher/TeacherAttendance";
import Library from "./pages/library/Library";
import Cadet from "./pages/cadet/Cadet";
import ITDepartment from "./pages/IT/ITDepartment";
import Facilities from "./pages/facilities/Facilities";
import FacilityOverview from "./pages/facilities/facilityOverview/FacilityOverview";
import CreateNewData from "./pages/createData/CreateNewData";
import Total1stYearStudents from "./components/adminSection/adminStudents/totalStudents/ClassLevelStudents";
import Total2ndYearStudents from "./components/adminSection/adminStudents/totalStudents/OldStudents";
import ClassLevelStudents from "./components/adminSection/adminStudents/totalStudents/ClassLevelStudents";
import OldStudents from "./components/adminSection/adminStudents/totalStudents/OldStudents";
import ApplyOnline from "./pages/applyOnline/ApplyOnline";
import PendingStudents from "./components/adminSection/adminStudents/totalStudents/PendingStudents";
import PendingClassLevelStudents from "./components/adminSection/adminStudents/totalStudents/PendingClassLevelStudents";
import WeeklyLectures from "./components/studentSection/weeklyLectures/WeeklyLectures";
import StudentUpdateSelf from "./components/studentSection/studentUpdateSelf/StudentUpdateSelf";
import AdminStudentInfos from "./components/adminSection/adminStudents/studentInfos/AdminStudentInfos";
import Blogs from "./pages/blogs/AllBlogs";
import BlogItem from "./pages/blogs/BlogItem";
import SingleBlog from "./pages/blogs/SingleBlog";
import StudentsAttendance from "./components/studentSection/studentsAttendance/StudentsAttendance";
import AdminStudentsAttendance from "./components/adminSection/adminStudents/studentsAttendance/AdminStudentsAttendance";
import CourseMates from "./components/studentSection/courseMates/CourseMates";
import Blog from "./pages/blogs/Blog";
import AllBlogs from "./pages/blogs/AllBlogs";
import Timer from "./components/studentSection/weeklyLectures/timer/Timer";
import CreateSchoolData from "./components/create/schoolData/CreateSchoolData";
import CreateAcademicYear from "./components/create/CreateAcademicYear";
import CreateYearGroup from "./components/create/CreateYearGroup";
import CreateAcademicTerm from "./components/create/CreateAcademicTerm";
import CreateClassLevel from "./components/create/CreateClassLevel";
import CreateProgram from "./components/create/CreateProgram";
import CreateClassSection from "./components/create/CreateClassSection";
import CreateElectiveSubject from "./components/create/CreateElectiveSubject";
import CreateCoreSubject from "./components/create/CreateCoreSubject";
import PublicBlogs from "./pages/blogs/PublicBlogs";
import AllPublicBlogs from "./pages/blogs/AllPublicBlogs";
import AdminEmployment from "./components/adminSection/adminEmployment/AdminEmploymentForm";
import TeacherEmploymentForm from "./components/adminSection/teacherEmploymentForm/TeacherEmploymentForm";
import NonTeachingEmploymentForm from "./components/adminSection/nonTeachingEmploymentForm/NonTeachingEmploymentForm";
import NewRegistration from "./components/adminSection/adminStaff/newRegistration/NewRegistration";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import VerifiedEmail from "./pages/verifyEmail/VerifiedEmail";
import SignUp from "./pages/signUp/SignUp";
import { getUser } from "./features/allUsers/AllUsersSlice";
import SignUpSuccessPage from "./components/signUpSuccessPage/SignUpSuccessPage";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/forgotPassword/ResetPassword";

export default function App() {
  const verifiedUser = localStorage.getItem("verifiedUser");
  const userInfo = useSelector(getUser);
  const studentInfo = useSelector(getStudentInfo);
  const authStaffInfo = useSelector(getStaffInfo);
  const authAdminInfo = useSelector(getAdminInfo);
  const authTeacherInfo = useSelector(getTeacherInfo);
  const authUser =
    authAdminInfo || studentInfo || authTeacherInfo || authStaffInfo;

  const [openLogin, setOpenLogin] = useState(false);
  const [postOptions, setPostOptions] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openChatBox, setOpenChatBox] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const currentNewStudent = localStorage.getItem("newStudentRegisteredId");
  // console.log(currentNewStudent);
  const toggleSidebar = () => setOpenSidebar(!openSidebar);

  const navigate = useNavigate();

  const clearLogOptions = () => {
    if (openLogin) {
      setOpenLogin(false);
    }
    if (postOptions) {
      setPostOptions(false);
    }
    if (showOptions) {
      setShowOptions(false);
    }
  };

  const openChat = () => setOpenChatBox(!openChatBox);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  return (
    <div className="app" onClick={clearLogOptions}>
      <NavBar
        setOpenLogin={setOpenLogin}
        openLogin={openLogin}
        showOptions={showOptions}
        setShowOptions={setShowOptions}
      />
      <Routes>
        {/* NORMAL ROUTES */}
        <Route
          exact
          path="/"
          element={
            <Navigate
              to="/sensec/homepage"
              toast={toast}
              showOptions={showOptions}
              setShowOptions={setShowOptions}
            />
          }
        />
        <Route exact path="/sensec/homepage" element={<Home />} />
        <Route path="/sensec/email" element={<EmailTemplate />} />
        <Route exact path="/sensec/about" element={<About />} />
        <Route exact path="/sensec/courses" element={<Courses />} />
        <Route exact path="/sensec/timer" element={<Timer />} />
        <Route exact path="/sensec/sign_up" element={<SignUp />} />
        <Route
          exact
          path="/sensec/forgot_password"
          element={
            !userInfo ? (
              <ForgotPassword />
            ) : userInfo.isStudent ? (
              <Navigate to={"/sensec/student"} />
            ) : userInfo.admin ? (
              <Navigate to={"/sensec/admin"} />
            ) : userInfo.teacher ? (
              <Navigate to={"/sensec/admin"} />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />

        {verifiedUser && (
          <Route
            exact
            path="/sensec/reset_password/:uniqueId/:id/:token"
            element={<ResetPassword />}
          />
        )}
        <Route
          exact
          path="/sensec/sign_up/successful"
          element={<SignUpSuccessPage />}
        />
        <Route
          exact
          path="/sensec/email_verification/:emailToken"
          element={<VerifyEmail />}
        />
        {!authUser && (
          <Route exact path="/sensec/blogs" element={<AllPublicBlogs />} />
        )}
        {authUser && (
          <Route
            exact
            path="/sensec/blogs"
            element={
              <Blog
                openSidebar={openSidebar}
                toastOptions={toastOptions}
                toast={toast}
                setPostOptions={setPostOptions}
                postOptions={postOptions}
                clearLogOptions={clearLogOptions}
                toggleSidebar={toggleSidebar}
              />
            }
          >
            <Route
              index
              element={
                <AllBlogs
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                  setPostOptions={setPostOptions}
                  postOptions={postOptions}
                  clearLogOptions={clearLogOptions}
                />
              }
            />
            <Route
              exact
              path="/sensec/blogs/blog_overview/:blogId"
              element={
                <SingleBlog
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                  setPostOptions={setPostOptions}
                  postOptions={postOptions}
                  clearLogOptions={clearLogOptions}
                />
              }
            />
          </Route>
        )}
        <Route
          exact
          path="/sensec/contact"
          element={<Contact toastOptions={toastOptions} toast={toast} />}
        />
        <Route path="/sensec/school_library" element={<Library />} />
        <Route path="/sensec/school_cadet" element={<Cadet />} />
        <Route path="/sensec/school_IT_department" element={<ITDepartment />} />
        <Route path="/sensec/facilities" element={<Facilities />} />
        <Route
          path="/sensec/student_enrollment/online_application"
          element={<ApplyOnline toastOptions={toastOptions} toast={toast} />}
        />
        <Route
          path="/sensec/student_enrollment/online_application/add_parents_guardian"
          element={
            <StudentParentGuardian toastOptions={toastOptions} toast={toast} />
          }
        />
        <Route
          path="/sensec/facilities_overview/:name"
          element={<FacilityOverview />}
        />
        <Route path="/sensec/student_enrollment" element={<Enrollments />} />
        <Route
          path="/sensec/admin/login"
          element={<AdminLoginPage toastOptions={toastOptions} toast={toast} />}
        />
        <Route
          path="/sensec/staff/login"
          element={<StaffLogin toastOptions={toastOptions} toast={toast} />}
        />
        <Route
          path="/sensec/teacher/login"
          element={
            <TeacherLoginPage toastOptions={toastOptions} toast={toast} />
          }
        />
        <Route
          path="/sensec/student/login"
          element={
            <StudentLoginPage toastOptions={toastOptions} toast={toast} />
          }
        />
        {/* ANNOUNCEMENT ROUTES */}
        {/* <Route
          exact
          path="/sensec/general_announcement"
          element={
            <GeneralNotice
              openSidebar={openSidebar}
              toggleSidebar={toggleSidebar}
            />
          }
        >
          <Route
            index
            element={
              <AllNotices
                openSidebar={openSidebar}
                toastOptions={toastOptions}
                toast={toast}
                setPostOptions={setPostOptions}
                postOptions={postOptions}
                clearLogOptions={clearLogOptions}
              />
            }
          />
          <Route
            exact
            path="/sensec/general_announcement/:postId"
            element={
              <SingleNotice
                openSidebar={openSidebar}
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          />
        </Route> */}
        {/* ADMIN ROUTES */}
        <Route
          exact
          path="/sensec/admin"
          element={
            authAdminInfo.isAdmin ? (
              <AdminDashboard
                toggleSidebar={toggleSidebar}
                openSidebar={openSidebar}
                toastOptions={toastOptions}
                toast={toast}
              />
            ) : (
              <Navigate to={"/sensec/admin/login"} />
            )
          }
        >
          <Route
            index
            element={
              <DashboardContent
                openSidebar={openSidebar}
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          />
          {/* Admin Creating Datas Routes */}
          <Route
            exact
            path="/sensec/admin/create_data"
            element={
              <CreateNewData
                openSidebar={openSidebar}
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          >
            {/* <Route index element={<CreateNewData />} /> */}
            <Route
              path="/sensec/admin/create_data/academic_year"
              element={
                <CreateAcademicYear
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                />
              }
            />
            <Route
              path="/sensec/admin/create_data/year_group"
              element={
                <CreateYearGroup
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                />
              }
            />
            <Route
              path="/sensec/admin/create_data/academic_term"
              element={
                <CreateAcademicTerm
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                />
              }
            />
            <Route
              path="/sensec/admin/create_data/class_level"
              element={
                <CreateClassLevel
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                />
              }
            />
            <Route
              path="/sensec/admin/create_data/program"
              element={
                <CreateProgram
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                />
              }
            />
            <Route
              path="/sensec/admin/create_data/class_section"
              element={
                <CreateClassSection
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                />
              }
            />
            <Route
              path="/sensec/admin/create_data/elective_subject"
              element={
                <CreateElectiveSubject
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                />
              }
            />
            <Route
              path="/sensec/admin/create_data/core_subject"
              element={
                <CreateCoreSubject
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                />
              }
            />
            <Route
              path="/sensec/admin/create_data/school_data"
              element={
                <CreateSchoolData
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                />
              }
            />
          </Route>
          <Route
            exact
            path="/sensec/admin/all_admins"
            element={
              <AllAdmins
                openSidebar={openSidebar}
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          />
          <Route
            exact
            path="/sensec/admin/register"
            element={
              <NewRegistration
                openSidebar={openSidebar}
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          >
            <Route
              path="/sensec/admin/register/new_student"
              element={
                <AdminStudentAdd
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                />
              }
            />
            <Route
              path="/sensec/admin/register/new_admin"
              element={
                <AdminEmployment
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                />
              }
            />
            <Route
              path="/sensec/admin/register/new_teacher"
              element={
                <TeacherEmploymentForm
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                />
              }
            />
            <Route
              path="/sensec/admin/register/new_non_teacheing_staff"
              element={
                <NonTeachingEmploymentForm
                  openSidebar={openSidebar}
                  toastOptions={toastOptions}
                  toast={toast}
                />
              }
            />
          </Route>
          <Route
            exact
            path="/sensec/admin/staff_members"
            element={<AllStaffMembers openSidebar={openSidebar} />}
          />
          <Route
            exact
            path="/sensec/admin/all_teachers"
            element={<AdminTeachers openSidebar={openSidebar} />}
          />
          {/* <Route
            path="/sensec/admin/students"
            element={<AdminStudents openSidebar={openSidebar} />}
          /> */}
          <Route
            path="/sensec/admin/student_enrollment"
            element={
              <AdminStudentAdd toastOptions={toastOptions} toast={toast} />
            }
          />
          <Route
            path="/sensec/admin/attendance"
            element={
              <AdminAttendance toastOptions={toastOptions} toast={toast} />
            }
          />
          <Route
            path="/sensec/admin/programs&subjects"
            element={
              <AdminProgramesSubjects
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          />
          <Route
            path="/sensec/admin/programmes/:programName"
            element={
              <ProgramOverView toastOptions={toastOptions} toast={toast} />
            }
          />
          <Route
            path="/sensec/admin/subjects/:subjectName"
            element={
              <SubjectOverView toastOptions={toastOptions} toast={toast} />
            }
          />
          <Route
            path="/sensec/admin/students/add_parents_guardian"
            element={
              <StudentParentGuardian
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          />
          <Route
            path="/sensec/admin/edit_student/:student_name/:studentId"
            element={
              <UpdateStudent toastOptions={toastOptions} toast={toast} />
            }
          />
          <Route
            path="/sensec/admin/students"
            element={
              <TotalStudents toastOptions={toastOptions} toast={toast} />
            }
          />
          <Route
            path="/sensec/admin/:adminUniqueId/all_pending_students"
            element={
              <PendingStudents toastOptions={toastOptions} toast={toast} />
            }
          />
          <Route
            path="/sensec/admin/all_pending_students/:class_level"
            element={
              <PendingClassLevelStudents
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          />
          <Route
            path="/sensec/admin/students/:class_level"
            element={
              <ClassLevelStudents toastOptions={toastOptions} toast={toast} />
            }
          />
          <Route
            path="/sensec/admin/old_students/:graduates"
            element={<OldStudents toastOptions={toastOptions} toast={toast} />}
          />
          <Route
            path="/sensec/admin/old_students/search_student"
            element={<OldStudents toastOptions={toastOptions} toast={toast} />}
          />
          {/* <Route
            path="/sensec/admin/search_student"
            element={
              <TotalStudents toastOptions={toastOptions} toast={toast} />
            }
          /> */}
          <Route
            path="/sensec/admin/student_info/:student_name/:uniqueId"
            element={
              authAdminInfo.isAdmin ? (
                <AdminStudentInfos toastOptions={toastOptions} toast={toast} />
              ) : (
                <Navigate to={"/sensec/admins/login"} />
              )
            }
          />
          <Route
            exact
            path="/sensec/admin/:studentId/attendance"
            element={<AdminStudentsAttendance openSidebar={openSidebar} />}
          />
          <Route
            path="/sensec/admin/general_announcement/update/:postId"
            element={
              <UpdatePost
                openSidebar={openSidebar}
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          />
        </Route>
        {/* STAFFS ROUTES */}
        <Route
          path="/sensec/staff"
          element={
            authStaffInfo ? (
              <StaffDashboard
                toggleSidebar={toggleSidebar}
                openSidebar={openSidebar}
                toastOptions={toastOptions}
                toast={toast}
              />
            ) : (
              <Navigate to={"/sensec/staff/login"} />
            )
          }
        >
          <Route
            index
            element={<StaffDashBoardContent openSidebar={openSidebar} />}
          />
        </Route>
        {/* TEACHERS ROUTES */}
        <Route
          path="/sensec/teacher"
          element={
            authTeacherInfo.isTeacher ? (
              <TeacherDashBoard
                toggleSidebar={toggleSidebar}
                openSidebar={openSidebar}
                toastOptions={toastOptions}
                toast={toast}
              />
            ) : (
              <Navigate to={"/sensec/teacher/login"} />
            )
          }
        >
          <Route
            index
            element={<TeacherDashBoardContent openSidebar={openSidebar} />}
          />
          <Route
            path="/sensec/teacher/:teacherId/take_attendance"
            element={
              <TeacherAttendance toastOptions={toastOptions} toast={toast} />
            }
          />
        </Route>
        {/* STUDENTS ROUTES */}
        <Route
          path="/sensec/student"
          element={
            userInfo.isStudent ? (
              <StudentDashBoard
                toggleSidebar={toggleSidebar}
                openSidebar={openSidebar}
                studentInfo={studentInfo}
                toastOptions={toastOptions}
                toast={toast}
                userInfo={userInfo}
              />
            ) : (
              <Navigate to={"/sensec/student/login"} />
            )
          }
        >
          <Route
            index
            element={<StudentDashBoardContent openSidebar={openSidebar} />}
          />
          <Route
            exact
            path="/sensec/student/:program/:currentClassLevel/weekly_lectures"
            element={<WeeklyLectures openSidebar={openSidebar} />}
          />
          <Route
            exact
            path="/sensec/student/:uniqueId/attendance"
            element={<StudentsAttendance openSidebar={openSidebar} />}
          />
          <Route
            exact
            path="/sensec/student/student_info/:student_name/:uniqueId"
            element={<StudentInfos toastOptions={toastOptions} toast={toast} />}
          />
          <Route
            exact
            path="/sensec/student/:uniqueId/coursemates/:programName"
            element={<CourseMates toastOptions={toastOptions} toast={toast} />}
          />
          <Route
            exact
            path="/sensec/student/update_info/:student_name/:uniqueId"
            element={
              <StudentUpdateSelf toastOptions={toastOptions} toast={toast} />
            }
          />
        </Route>
        {/* 404 PAGE NOT FOUND ROUTE */}
        <Route
          path="*"
          element={
            <div className="empty-page">
              <h2>Page Not Found!</h2>
              <div className="emptyWrap">
                <h1 className="page404">404</h1>
                <img src="/assets/sad-dog1.jpg" alt="sad dog" />
                <h4>Ooops! There is nothing in here...</h4>
                <button className="empty-page-btn" onClick={() => navigate(-1)}>
                  Go back
                </button>
              </div>
            </div>
          }
        />
      </Routes>
      <div className="liveChat">
        <div className="chatIcon" onClick={openChat}>
          {!openChatBox ? (
            <ChatIcon style={{ color: "#039e0f" }} titleAccess="Open Chat" />
          ) : (
            <CloseIcon className="closeChatIcon" />
          )}
        </div>
        {openChatBox && (
          <div className="chatModal">
            <div className="msgBox">
              <p>This is a message!</p>
            </div>
            <div className="inputField">
              <input type="text" className="msgInput" />
              <TelegramIcon className="sendIcon" />
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
