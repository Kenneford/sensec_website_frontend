import React, { useEffect } from "react";
import "./logout.scss";
import { useDispatch, useSelector } from "react-redux";
// import { logoutStaff, logoutStudent } from "../../store/actions/authActions";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getStudentInfo,
  studentLogout,
} from "../../features/student/studentsSlice";
import {
  getStaffInfo,
  logoutStaff,
  staffLogout,
} from "../../features/staff/staffSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  adminLogout,
  getAdminInfo,
  logoutAdmin,
} from "../../features/admin/adminsSlice";
import {
  getTeacherInfo,
  teacherLogout,
} from "../../features/teacher/teachersSlice";
import { getUser, userLogout } from "../../features/allUsers/AllUsersSlice";

export default function LogoutBtn({ openSidebar }) {
  const userInfo = useSelector(getUser);
  // const { studentInfo } = useSelector((state) => state.auth);
  // const { staffInfo } = useSelector((state) => state.auth);
  const staffInfo = useSelector(getStaffInfo);
  const authAdminInfo = useSelector(getAdminInfo);
  const studentInfo = useSelector(getStudentInfo);
  const authTeacherInfo = useSelector(getTeacherInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    if (userInfo.isStudent) {
      dispatch(userLogout());
      navigate("/sensec/homepage");
      toast.success("You logged out Successfully...", {
        position: "top-right",
        theme: "dark",
      });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else if (authAdminInfo) {
      dispatch(adminLogout());
      navigate("/sensec/homepage");
      toast.success("You logged out Successfully...", {
        position: "top-right",
        theme: "dark",
      });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else if (authTeacherInfo) {
      dispatch(teacherLogout());
      navigate("/sensec/homepage");
      toast.success("You logged out Successfully...", {
        position: "top-right",
        theme: "dark",
      });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else {
      dispatch(staffLogout());
      navigate("/sensec/homepage");
      toast.success("You logged out Successfully...", {
        position: "top-right",
        theme: "dark",
      });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  };

  return (
    <button
      //   style={{ color: "red" }}
      className={!openSidebar ? "lgtBtn" : "lgtBtn closed"}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
