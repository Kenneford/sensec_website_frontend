import React, { useEffect, useState } from "react";
import "./studentLogin.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { studentLogin } from "../../../features/student/studentsSlice";
import { getUser, userLogin } from "../../../features/allUsers/AllUsersSlice";

export default function StudentLoginPage({ toastOptions, toast }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(getUser);
  const [showpass, setShowPass] = useState(false);
  const [passLengthError, setPassLengthError] = useState("");
  const [idLengthError, setIdLengthError] = useState("");

  const showPassword = () => setShowPass((show) => !show);

  const { loginUserStatus, error, successMessage } = useSelector(
    (state) => state.user
  );

  const [student, setStudent] = useState({
    uniqueId: "",
    password: "",
  });

  //PASSWORD INPUT CONTROLL
  const pass = student.password.length > 0;
  const passCheck = student.password.length < 6;

  //STUDENT-ID INPUT CONTROLL
  const id = student.uniqueId.length > 0;
  const idCheck = student.uniqueId.length < 20;

  const handleInputValues = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!student.uniqueId && !student.password) {
      toast.error(
        "Authentication failed! Fields cannot be empty!",
        toastOptions
      );
      return;
    } else {
      dispatch(userLogin(student));
      // console.log(student);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isStudent) {
      navigate("/sensec/student");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (loginUserStatus === "rejected") {
      error.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (loginUserStatus === "success") {
      navigate("/sensec/student/#student");
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [
    loginUserStatus,
    error,
    successMessage,
    toast,
    // toastOptions,
    navigate,
  ]);

  useEffect(() => {
    setPassLengthError("Password must be at least 6 characters long!");
    setIdLengthError("Your ID length is too short!");
  }, []);

  return (
    <div className="loginWrap">
      <div className="login">
        <div className="card">
          <div className="left">
            <h1>Welcome, Cherised Student.</h1>
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
                name="uniqueId"
                value={student.email}
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
              <div className="studentId">
                <input
                  className="loginInput"
                  type={showpass ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleInputValues}
                  name="password"
                  value={student.password}
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
                    fontSize: ".8rem",
                    fontWeight: "400",
                    fontStyle: "italic",
                  }}
                >
                  {passLengthError}
                </p>
              )}
              <button type="submit">
                {loginUserStatus === "pending" ? (
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
