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

export default function LogoutBtn() {
  // const { studentInfo } = useSelector((state) => state.auth);
  // const { staffInfo } = useSelector((state) => state.auth);
  const staffInfo = useSelector(getStaffInfo);
  const studentInfo = useSelector(getStudentInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    if (studentInfo) {
      dispatch(studentLogout());
      navigate("/sensec/homepage");
      toast.success("You logged out Successfully...", {
        position: "top-right",
        theme: "dark",
      });
    } else {
      dispatch(staffLogout());
      navigate("/sensec/homepage");
      toast.success("You logged out Successfully...", {
        position: "top-right",
        theme: "dark",
      });
    }
  };

  return (
    <button
      //   style={{ color: "red" }}
      className="lgtBtn"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
