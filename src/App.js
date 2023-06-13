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

export default function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openChatBox, setOpenChatBox] = useState(false);
  const toggleSidebar = (e) => setOpenSidebar(!openSidebar);
  const authUser = true;

  const navigate = useNavigate();
  const clearLogOptions = () => {
    if (openLogin) {
      setOpenLogin(false);
    }
  };

  const openChat = () => setOpenChatBox(!openChatBox);

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
        <Route path="/sensec/admin/login" element={<AdminLoginPage />} />
        <Route path="/sensec/staff/login" element={<StaffLogin />} />
        <Route path="/sensec/teacher/login" element={<TeacherLoginPage />} />
        <Route path="/sensec/student/login" element={<StudentLoginPage />} />
        <Route
          exact
          path="/sensec/admin"
          element={
            <AdminDashboard
              toggleSidebar={toggleSidebar}
              openSidebar={openSidebar}
            />
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
        </Route>
        <Route
          path="/sensec/staff"
          element={
            <StaffDashboard
              toggleSidebar={toggleSidebar}
              openSidebar={openSidebar}
            />
          }
        />
        <Route
          path="/sensec/teacher"
          element={
            <TeacherDashBoard
              toggleSidebar={toggleSidebar}
              openSidebar={openSidebar}
            />
          }
        />
        <Route
          path="/sensec/student"
          element={
            <StudentDashBoard
              toggleSidebar={toggleSidebar}
              openSidebar={openSidebar}
            />
          }
        />
        <Route
          path="*"
          element={
            <div className="empty-page">
              <h1 className="page404">404</h1>
              <img src="/assets/sad-dog1.jpg" alt="sad dog" />
              <h1>Ooops! There is nothing in here...</h1>
              <button className="empty-page-btn" onClick={() => navigate(-1)}>
                Go back
              </button>
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
    </div>
  );
}
