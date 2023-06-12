import React from "react";
import "./logout.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutStaff, logoutStudent } from "../../store/actions/authActions";
// import { Navigate, useNavigate } from "react-router-dom";

export default function LogoutBtn() {
  // const { studentInfo } = useSelector((state) => state.auth);
  // const { staffInfo } = useSelector((state) => state.auth);
  const studentInfo = true;
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    // if (studentInfo) {
    //   dispatch(logoutStudent());
    //   navigate("/");
    // } else {
    //   dispatch(logoutStaff());
    //   navigate("/");
    // }
  };
  //   if (!staffInfo && !studentInfo) {
  //     return <Navigate to={"/"} />;
  //   }
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
