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

export default function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openChatBox, setOpenChatBox] = useState(false);
  const toggleSidebar = (e) => setOpenSidebar(!openSidebar);
  const authUser = true;

  const clearLogOptions = () => {
    if (openLogin) {
      setOpenLogin(false);
    }
  };

  const openChat = () => setOpenChatBox(!openChatBox);

  return (
    <div className="app" onClick={clearLogOptions}>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Navigate to="/sensec/homepage" />} />
        <Route exact path="/sensec/homepage" element={<Home />} />
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
