import React, { useState } from "react";
import "./currentUser.scss";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { getStaffInfo, staffLogout } from "../../features/staff/staffSlice";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout, getAdminInfo } from "../../features/admin/adminsSlice";
import {
  getTeacherInfo,
  teacherLogout,
} from "../../features/teacher/teachersSlice";
import {
  getStudentInfo,
  studentLogout,
} from "../../features/student/studentsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser, userLogout } from "../../features/allUsers/AllUsersSlice";

export default function CurrentUser({
  openLogin,
  setOpenLogin,
  showOptions,
  setShowOptions,
  // toast,
}) {
  const userInfo = useSelector(getUser);
  const authStaffInfo = useSelector(getStaffInfo);
  const authAdminInfo = useSelector(getAdminInfo);
  const authTeacherInfo = useSelector(getTeacherInfo);
  const studentInfo = useSelector(getStudentInfo);

  // const [showOptions, setShowOptions] = useState(false);

  const currentUser =
    authAdminInfo || authStaffInfo || authTeacherInfo || userInfo;

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
    <div className="user">
      <div className="userActions">
        {!currentUser && (
          <div className="login">
            <button onClick={() => setOpenLogin(!openLogin)}>Login</button>
            <button onClick={() => navigate("sensec/sign_up")}>Sign-Up</button>
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

        {currentUser.isAdmin && (
          <div className="userInfo">
            <p className="currentUserName">
              Welcome, {authAdminInfo.firstName}
            </p>
            <div className="icon">
              {authAdminInfo.profilePicture ? (
                <img
                  onClick={() => setShowOptions(!showOptions)}
                  src={authAdminInfo.profilePicture}
                  alt=""
                />
              ) : (
                <img
                  onClick={() => setShowOptions(!showOptions)}
                  src={
                    authAdminInfo.isMale
                      ? "/assets/maleAvatar.png"
                      : "/assets/femaleAvatar.png"
                  }
                  alt=""
                />
              )}
            </div>
            {showOptions && (
              <div className="navLogout">
                <span className="profileView">View Pofile</span>
                <span className="adminConer">Admins Coner</span>
                <span className="logUserOutWrap">
                  <p className="logUserOut" onClick={handleLogout}>
                    Logout
                  </p>
                  <LogoutIcon className="logoutIcon" />
                </span>
              </div>
            )}
          </div>
        )}

        {currentUser.isTeacher && (
          <div className="userInfo">
            <p className="currentUserName">
              Welcome, {authTeacherInfo.firstName}
            </p>
            <div className="icon">
              {authTeacherInfo.profilePicture ? (
                <img
                  onClick={() => setShowOptions(!showOptions)}
                  src={authTeacherInfo.profilePicture}
                  alt=""
                />
              ) : (
                <img
                  onClick={() => setShowOptions(!showOptions)}
                  src={
                    authTeacherInfo.isMale
                      ? "/assets/maleAvatar.png"
                      : "/assets/femaleAvatar.png"
                  }
                  alt=""
                />
              )}
            </div>
            {showOptions && (
              <div className="navLogout">
                <span className="profileView">View Pofile</span>
                <span className="adminConer">Teachers Coner</span>
                <span className="logUserOutWrap">
                  <p className="logUserOut" onClick={handleLogout}>
                    Logout
                  </p>
                  <LogoutIcon className="logoutIcon" />
                </span>
              </div>
            )}
          </div>
        )}

        {currentUser.role === "Non-Teaching Staff" && (
          <div className="userInfo">
            <p className="currentUserName">
              Welcome, {authStaffInfo.firstName}
            </p>
            <div className="icon">
              {authStaffInfo.profilePicture ? (
                <img
                  onClick={() => setShowOptions(!showOptions)}
                  src={authStaffInfo.profilePicture}
                  alt=""
                />
              ) : (
                <img
                  onClick={() => setShowOptions(!showOptions)}
                  src={
                    authStaffInfo.isMale
                      ? "/assets/maleAvatar.png"
                      : "/assets/femaleAvatar.png"
                  }
                  alt=""
                />
              )}
            </div>
            {showOptions && (
              <div className="navLogout">
                <span className="profileView">View Pofile</span>
                <span className="logUserOutWrap">
                  <p className="logUserOut" onClick={handleLogout}>
                    Logout
                  </p>
                  <LogoutIcon className="logoutIcon" />
                </span>
              </div>
            )}
          </div>
        )}

        {userInfo.isStudent && (
          <div className="userInfo">
            <p className="currentUserName">Welcome, {userInfo.firstName}</p>
            <div className="icon">
              {userInfo.profilePicture ? (
                <img
                  onClick={() => setShowOptions(!showOptions)}
                  src={userInfo.profilePicture}
                  alt=""
                />
              ) : (
                <img
                  onClick={() => setShowOptions(!showOptions)}
                  src={
                    userInfo.gender === "Male"
                      ? "/assets/maleAvatar.png"
                      : "/assets/femaleAvatar.png"
                  }
                  alt=""
                />
              )}
            </div>
            {showOptions && (
              <div className="navLogout">
                <span
                  className="profileView"
                  onClick={() =>
                    navigate(
                      `/sensec/student/student_info/${userInfo.firstName}_${userInfo.lastName}/${userInfo.uniqueId}`
                    )
                  }
                >
                  View Pofile
                </span>
                <span className="adminConer">Students Coner</span>
                <span className="adminConer">Settings</span>
                <span className="logUserOutWrap">
                  <p className="logUserOut" onClick={handleLogout}>
                    Logout
                  </p>
                  <LogoutIcon className="logoutIcon" />
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
