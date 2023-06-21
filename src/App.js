import React, { useState } from "react";
import "./app.scss";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  redirect,
} from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import TelegramIcon from "@mui/icons-material/Telegram";
import CloseIcon from "@mui/icons-material/Close";
import AdminDashboard from "./pages/admin/adminDashboard/AdminDashboard";
import Home from "./pages/home/Home";
import NavBar from "./components/navBar/NavBar";
import AdminTeachers from "./components/adminSection/adminTeachers/AdminTeachers";
import DashboardContent from "./components/adminSection/dashboardContent/DashboardContent";
import AdminStudents from "./components/adminSection/adminStudents/AdminStudents";
import AdminStaff from "./components/adminSection/adminStaff/AdminStaff";
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

export default function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openChatBox, setOpenChatBox] = useState(false);
  const toggleSidebar = (e) => setOpenSidebar(!openSidebar);
  const authUser = true;
  const studentInfo = useSelector(getStudentInfo);
  const staffInfo = useSelector(getStaffInfo);
  console.log(staffInfo);

  const navigate = useNavigate();
  const clearLogOptions = () => {
    if (openLogin) {
      setOpenLogin(false);
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
      <NavBar setOpenLogin={setOpenLogin} openLogin={openLogin} />
      <Routes>
        <Route exact path="/" element={<Navigate to="/sensec/homepage" />} />
        <Route exact path="/sensec/homepage" element={<Home />} />
        <Route exact path="/sensec/about" element={<About />} />
        <Route exact path="/sensec/courses" element={<Courses />} />
        <Route exact path="/sensec/contact" element={<Contact />} />
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
        <Route
          exact
          path="/sensec/admin"
          element={
            (staffInfo && staffInfo.staffRole === "Admin") ||
            (staffInfo && staffInfo.staffRole === "Admin/Teacher") ? (
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
            element={<DashboardContent openSidebar={openSidebar} />}
          />
          <Route
            exact
            path="/sensec/admin/staff_members"
            element={<AdminStaff openSidebar={openSidebar} />}
          />
          <Route
            exact
            path="/sensec/admin/teachers"
            element={<AdminTeachers openSidebar={openSidebar} />}
          />
          <Route
            path="/sensec/admin/students"
            element={<AdminStudents openSidebar={openSidebar} />}
          />
          <Route
            path="/sensec/admin/students_enrollment"
            element={<AdminStudentAdd />}
          />
          <Route
            path="/sensec/admin/all_students"
            element={<TotalStudents />}
          />
        </Route>
        <Route
          path="/sensec/staff"
          element={
            staffInfo ? (
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
        <Route
          path="/sensec/teacher"
          element={
            (staffInfo && staffInfo.staffRole === "Teacher") ||
            (staffInfo && staffInfo.staffRole === "Admin/Teacher") ? (
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
        </Route>
        <Route
          path="/sensec/student"
          element={
            studentInfo && studentInfo.isStudent ? (
              <StudentDashBoard
                toggleSidebar={toggleSidebar}
                openSidebar={openSidebar}
                studentInfo={studentInfo}
                toastOptions={toastOptions}
                toast={toast}
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
        </Route>
        <Route
          path="*"
          element={
            <div className="empty-page">
              <h2>Page Not Found!</h2>
              <div className="emptyWrap">
                <h1 className="page404">404</h1>
                <img src="/assets/sad-dog1.jpg" alt="sad dog" />
                <h1>Ooops! There is nothing in here...</h1>
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
