import React from "react";
import "./currentUser.scss";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { getStaffInfo } from "../../features/staff/staffSlice";
import { useSelector } from "react-redux";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { getTeacherInfo } from "../../features/teacher/teachersSlice";
import { getStudentInfo } from "../../features/student/studentsSlice";

export default function CurrentUser({ openLogin, setOpenLogin }) {
  const authStaffInfo = useSelector(getStaffInfo);
  const authAdminInfo = useSelector(getAdminInfo);
  const authTeacherInfo = useSelector(getTeacherInfo);
  const studentInfo = useSelector(getStudentInfo);

  const navigate = useNavigate();

  return (
    <div className="user">
      <div className="userActions">
        {!authAdminInfo &&
          !authTeacherInfo &&
          !authStaffInfo &&
          !studentInfo && (
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
                    onClick={() => navigate("/sensec/staff/login")}
                  >
                    <p>Staffs Login</p>
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
          )}

        {authAdminInfo && (
          <div className="userInfo">
            <p>Welcome, {authAdminInfo.firstName}</p>
            <div className="icon">
              {authAdminInfo.profilePicture ? (
                <img src={authAdminInfo.profilePicture} alt="" />
              ) : (
                <img
                  src={
                    authAdminInfo.isMale
                      ? "/assets/maleAvatar.png"
                      : "/assets/femaleAvatar.png"
                  }
                  alt=""
                />
              )}
            </div>
          </div>
        )}

        {authTeacherInfo && (
          <div className="userInfo">
            <p>Welcome, {authTeacherInfo.firstName}</p>
            <div className="icon">
              {authTeacherInfo.profilePicture ? (
                <img src={authTeacherInfo.profilePicture} alt="" />
              ) : (
                <img
                  src={
                    authTeacherInfo.isMale
                      ? "/assets/maleAvatar.png"
                      : "/assets/femaleAvatar.png"
                  }
                  alt=""
                />
              )}
            </div>
          </div>
        )}

        {authStaffInfo && (
          <div className="userInfo">
            <p>Welcome, {authStaffInfo.firstName}</p>
            <div className="icon">
              {authStaffInfo.profilePicture ? (
                <img src={authStaffInfo.profilePicture} alt="" />
              ) : (
                <img
                  src={
                    authStaffInfo.isMale
                      ? "/assets/maleAvatar.png"
                      : "/assets/femaleAvatar.png"
                  }
                  alt=""
                />
              )}
            </div>
          </div>
        )}

        {studentInfo && (
          <div className="userInfo">
            <p>Welcome, {studentInfo.firstName}</p>
            <div className="icon">
              {studentInfo.profilePicture ? (
                <img src={studentInfo.profilePicture} alt="" />
              ) : (
                <img
                  src={
                    studentInfo.isMale
                      ? "/assets/maleAvatar.png"
                      : "/assets/femaleAvatar.png"
                  }
                  alt=""
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
