import React, { useEffect, useState } from "react";
import "./teacherLogin.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Navigate, useNavigate } from "react-router-dom";
import { getStaffInfo, teacherLogin } from "../../../features/staff/staffSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

export default function TeacherLoginPage({ toast, toastOptions }) {
  const dispatch = useDispatch();
  const [passLengthError, setPassLengthError] = useState("");
  const [idLengthError, setIdLengthError] = useState("");
  const [keyLengthError, setKeyLengthError] = useState("");
  const { loginStatus, error, successMessage } = useSelector(
    (state) => state.staffs
  );

  const [staff, setStaff] = useState({
    staffId: "",
    teacherSecret: "",
    password: "",
  });

  //PASSWORD INPUT CONTROLL
  const pass = staff.password.length > 0;
  const passCheck = staff.password.length < 6;

  //STAFF-ID INPUT CONTROLL
  const id = staff.staffId.length > 0;
  const idCheck = staff.staffId.length < 16;

  //ADMIN KEY INPUT CONTROLL
  const key = staff.teacherSecret.length > 0;
  const keyCheck = staff.teacherSecret.length < 14;
  const handleInputValues = (e) => {
    setStaff({
      ...staff,
      [e.target.name]: e.target.value,
    });
  };

  const [showpass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const showPassword = () => setShowPass((show) => !show);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!staff.staffId && !staff.password && !staff.teacherSecret) {
      toast.error(
        "Authentication failed! Fields can't be empty!",
        toastOptions
      );
      return;
    } else {
      dispatch(teacherLogin(staff));
      console.log(staff);
    }
  };

  useEffect(() => {
    if (loginStatus === "rejected") {
      error.errorMessage.message.map((err) => toast.error(err, toastOptions));
      return;
    }
    if (loginStatus === "success") {
      navigate("/sensec/teacher/#teacher");
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [error, successMessage, loginStatus, toast, toastOptions, navigate]);

  useEffect(() => {
    setPassLengthError("Password must be at least 6 characters long!");
    setIdLengthError("Your ID length is too short!");
    setKeyLengthError("Your Key length is too short!");
  }, []);

  return (
    <div className="loginWrap">
      <div className="login">
        <div className="card">
          <div className="left">
            <h1>Welcome, Cherised Teacher.</h1>
            <p>
              The Great Sensec is glad to have you here. Kindly login to access
              your dashboard.
            </p>
          </div>
          <div className="right">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Your ID"
                onChange={handleInputValues}
                name="staffId"
                value={staff.staffId}
              />
              {id && idCheck && (
                <p
                  style={{
                    color: "red",
                    position: "relative",
                    marginTop: "-1.5rem",
                  }}
                >
                  {idLengthError}
                </p>
              )}
              <input
                type="text"
                placeholder="Your Teacher Key"
                onChange={handleInputValues}
                name="teacherSecret"
                value={staff.teacherSecret}
              />
              {key && keyCheck && (
                <p
                  style={{
                    color: "red",
                    position: "relative",
                    marginTop: "-1.5rem",
                  }}
                >
                  {keyLengthError}
                </p>
              )}
              <div className="staffId">
                <input
                  type={showpass ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleInputValues}
                  name="password"
                  value={staff.password}
                />
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    width: "30px",
                  }}
                  onClick={showPassword}
                >
                  {showpass ? (
                    <VisibilityIcon style={{ color: "#a8a6a6" }} />
                  ) : (
                    <VisibilityOffIcon style={{ color: "#a8a6a6" }} />
                  )}
                </div>
              </div>
              {pass && passCheck && (
                <p
                  style={{
                    color: "red",
                    position: "relative",
                    marginTop: "-1.5rem",
                  }}
                >
                  {passLengthError}
                </p>
              )}
              <button type="submit">
                {loginStatus === "pending" ? (
                  <CircularProgress style={{ color: "white", size: "20px" }} />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
