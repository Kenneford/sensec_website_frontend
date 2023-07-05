import React, { useState } from "react";
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
import AddStaffMember from "./components/adminSection/adminStaff/addStaffMember/AddStaffMember";
import UpdateStudent from "./components/adminSection/adminStudents/updateStudent/UpdateStudent";
import GeneralNotice from "./pages/notice/GeneralNotice";
import AllNotices from "./components/noticeSection/AllNotices";
import SingleNotice from "./pages/notice/SingleNotice";
import EmailTemplate from "./components/emailTemplate/EmailTemplate";
import StudentInfos from "./components/adminSection/adminStudents/studentInfos/StudentInfos";

export default function App() {
  const studentInfo = useSelector(getStudentInfo);
  const authStaffInfo = useSelector(getStaffInfo);
  console.log(authStaffInfo);
  const [openLogin, setOpenLogin] = useState(false);
  const [postOptions, setPostOptions] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openChatBox, setOpenChatBox] = useState(false);
  const currentYear = new Date().getFullYear();
  // const { staffInfo } = useSelector((state) => state.staff);
  const [num] = useState(Math.floor(1000000 + Math.random() * 9000000));
  const [date] = useState(new Date().toDateString());
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    password: `${currentYear}-${num}`,
    confirmPassword: `${currentYear}-${num}`,
    email: "",
    studentId: `STDSSHS-${num}-${currentYear}`,
    courseStudy: "",
    studentRegistrar: {
      registrarFirstName: `${authStaffInfo.firstName}`,
      registrarlastName: `${authStaffInfo.lastName}`,
      registrarRole: `${authStaffInfo.staffRole}`,
      registrarId: `${authStaffInfo.staffId}`,
    },
    level: "",
    // isStudent: "",
    isMale: "",
    studentImage: "",
    profilePicture: "",
    address: "",
    currentCity: "",
    homeTown: "",
    region: "",
    religion: "",
    height: "",
    weight: "",
    mother: {
      motherName: "",
      motherOccupation: "",
      motherPhoneNumber: "",
      motherEmail: "",
    },
    father: {
      fatherName: "",
      fatherOccupation: "",
      fatherPhoneNumber: "",
      fatherEmail: "",
    },
    guardian: {
      guardianName: "",
      guardianOccupation: "",
      guardianPhoneNumber: "",
      guardianEmail: "",
    },
    motherTongue: "",
    otherTongue: "",
    complexion: "",
    registedDate: date,
  });
  const toggleSidebar = (e) => setOpenSidebar(!openSidebar);

  const navigate = useNavigate();

  const clearLogOptions = () => {
    if (openLogin) {
      setOpenLogin(false);
    }
    if (postOptions) {
      setPostOptions(false);
    }
  };
  const [open, setOpen] = useState(false);
  const clearOptions = () => {
    if (open) {
      setOpen(false);
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
        <Route path="/sensec/email" element={<EmailTemplate />} />
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
          path="/sensec/general_announcement"
          element={
            <GeneralNotice
              openSidebar={openSidebar}
              toggleSidebar={toggleSidebar}
              open={open}
              setOpen={setOpen}
              clearOptions={clearOptions}
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
                open={open}
                setOpen={setOpen}
                clearOptions={clearOptions}
              />
            }
          />
          <Route
            exact
            path="/sensec/general_announcement/:title"
            element={
              <SingleNotice
                openSidebar={openSidebar}
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          />
        </Route>
        <Route
          exact
          path="/sensec/admin"
          element={
            (authStaffInfo && authStaffInfo.staffRole === "Admin") ||
            (authStaffInfo && authStaffInfo.staffRole === "Admin/Teacher") ? (
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
          <Route
            exact
            path="/sensec/admin/add_staff_member"
            element={
              <AddStaffMember
                openSidebar={openSidebar}
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          />
          <Route
            exact
            path="/sensec/admin/staff_members"
            element={<AllStaffMembers openSidebar={openSidebar} />}
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
            element={
              <AdminStudentAdd
                newStudent={newStudent}
                setNewStudent={setNewStudent}
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          />
          <Route
            path="/sensec/admin/edit_student/:studentId"
            element={
              <UpdateStudent
                newStudent={newStudent}
                setNewStudent={setNewStudent}
              />
            }
          />
          <Route
            path="/sensec/admin/all_students"
            element={
              <TotalStudents
                setNewStudent={setNewStudent}
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          />
          <Route
            path="/sensec/admin/search_student"
            element={
              <TotalStudents
                setNewStudent={setNewStudent}
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          />
          <Route
            path="/sensec/admin/student_info/:studentId"
            element={
              <StudentInfos
                setNewStudent={setNewStudent}
                toastOptions={toastOptions}
                toast={toast}
              />
            }
          />
        </Route>
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
        <Route
          path="/sensec/teacher"
          element={
            (authStaffInfo && authStaffInfo.staffRole === "Teacher") ||
            (authStaffInfo && authStaffInfo.staffRole === "Admin/Teacher") ? (
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
