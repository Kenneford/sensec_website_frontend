import React, { useEffect, useState } from "react";
import "./adminLogin.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getStaffInfo } from "../../../features/staff/staffSlice";
import { CircularProgress } from "@mui/material";

export default function AdminLoginPage({ toast, toastOptions }) {
  const dispatch = useDispatch();
  const [passLengthError, setPassLengthError] = useState("");
  const [idLengthError, setIdLengthError] = useState("");
  const [keyLengthError, setKeyLengthError] = useState("");
  const { loginStatus, error, successMessage } = useSelector(
    (state) => state.staff
  );
  const [staff, setStaff] = useState({
    staffId: "",
    adminSecret: "",
    password: "",
  });

  //PASSWORD INPUT CONTROLL
  const pass = staff.password.length > 0;
  const passCheck = staff.password.length < 6;

  //STAFF-ID INPUT CONTROLL
  const id = staff.staffId.length > 0;
  const idCheck = staff.staffId.length < 16;

  //ADMIN KEY INPUT CONTROLL
  const key = staff.adminSecret.length > 0;
  const keyCheck = staff.adminSecret.length < 14;

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
    if (!staff.staffId && !staff.adminSecret && !staff.password) {
      toast.error(
        "Authentication failed! Fields can't be empty!",
        toastOptions
      );
      return;
    } else {
      dispatch(adminLogin(staff));
      console.log(staff);
    }
  };

  useEffect(() => {
    if (loginStatus === "rejected") {
      error.errorMessage.message.map((err) => toast.error(err, toastOptions));
      return;
    }
    if (loginStatus === "success") {
      navigate("/sensec/admin/#admin");
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
            <h1>Welcome, Cherised Admin.</h1>
            <p>
              The Great Sensec is glad to have you here. Kindly login to access
              your dashboard.
            </p>
          </div>
          <div className="right">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <input
                className="loginInput"
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
                    fontSize: ".8rem",
                    fontWeight: "400",
                    fontStyle: "italic",
                  }}
                >
                  {idLengthError}
                </p>
              )}
              <input
                className="loginInput"
                type="text"
                placeholder="Your Admin Key"
                onChange={handleInputValues}
                name="adminSecret"
                value={staff.adminSecret}
              />
              {key && keyCheck && (
                <p
                  style={{
                    color: "red",
                    position: "relative",
                    marginTop: "-1.5rem",
                    fontSize: ".8rem",
                    fontWeight: "400",
                    fontStyle: "italic",
                  }}
                >
                  {keyLengthError}
                </p>
              )}
              <div className="staffId">
                <input
                  className="loginInput"
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
                    fontSize: ".8rem",
                    fontWeight: "400",
                    fontStyle: "italic",
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
                    fontSize: ".8rem",
                    fontWeight: "400",
                    fontStyle: "italic",
                  }}
                >
                  {passLengthError}
                </p>
              )}
              <button type="submit" className="loginBtn">
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
