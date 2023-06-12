import React, { useState } from "react";
import "./currentUser.scss";
import LogoutBtn from "../logoutBtn/LogoutBtn";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
// import { useSelector } from "react-redux";

export default function CurrentUser() {
  // const { studentInfo } = useSelector((state) => state.auth);
  // const { staffInfo } = useSelector((state) => state.auth);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openTeacher, setOpenTeacher] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const navigate = useNavigate();
  const studentInfo = true;
  const staffInfo = true;
  return (
    <div className="user">
      <div className="userActions">
        {!staffInfo && !studentInfo ? (
          <div className="login">
            <button onClick={() => setOpenLogin(!openLogin)}>Login</button>
            {openLogin && (
              <div className="loginOptions">
                <div
                  className="loginWrap"
                  onClick={() => navigate("/sensec/admin/login")}
                >
                  <p>Admins Login</p>
                  <LoginIcon className="loginIcon" />
                </div>
                <div
                  className="loginWrap"
                  onClick={() => navigate("/sensec/teacher/login")}
                >
                  <p>Teachers Login</p>
                  <LoginIcon className="loginIcon" />
                </div>
                <div
                  className="loginWrap"
                  onClick={() => navigate("/sensec/student/login")}
                >
                  <p>Students Login</p>
                  <LoginIcon className="loginIcon" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="userInfo">
              {staffInfo ? (
                <p>Welcome, {staffInfo.firstName}</p>
              ) : (
                <p>Welcome, {studentInfo.firstName}</p>
              )}
              <div className="icon">
                {staffInfo ? (
                  <img
                    src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt=""
                  />
                ) : studentInfo ? (
                  <img
                    src="https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt=""
                  />
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt=""
                  />
                  // <PersonIcon />
                )}
                {/* <PersonIcon /> */}
              </div>
            </div>
            {<LogoutBtn />}
          </>
        )}
      </div>
    </div>
  );
}
