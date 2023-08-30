import React, { useEffect, useState } from "react";
import "./studentLogin.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { studentLogin } from "../../../features/student/studentsSlice";

export default function StudentLoginPage({ toastOptions, toast }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showpass, setShowPass] = useState(false);
  const [passLengthError, setPassLengthError] = useState("");
  const [idLengthError, setIdLengthError] = useState("");
  console.log(passLengthError);

  const showPassword = () => setShowPass((show) => !show);

  const errorId = "error";
  const successId = "success";

  const { studentLoginStatus, studentError, studentSuccessMessage } =
    useSelector((state) => state.student);
  console.log(studentError);
  console.log(studentSuccessMessage);

  const [student, setStudent] = useState({
    studentId: "",
    password: "",
  });

  //PASSWORD INPUT CONTROLL
  const pass = student.password.length > 0;
  const passCheck = student.password.length < 6;

  //STUDENT-ID INPUT CONTROLL
  const id = student.studentId.length > 0;
  const idCheck = student.studentId.length < 20;

  const handleInputValues = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!student.studentId && !student.password) {
      toast.error(
        "Authentication failed! Fields cannot be empty!",
        toastOptions
      );
      return;
    } else {
      dispatch(studentLogin(student));
      // console.log(student);
    }
  };

  useEffect(() => {
    if (studentLoginStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (studentLoginStatus === "success") {
      setStudent({
        studentId: "",
        password: "",
      });
      navigate("/sensec/student/#student");
      toast.success(studentSuccessMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [
    studentError,
    studentSuccessMessage,
    studentLoginStatus,
    toast,
    toastOptions,
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
                name="studentId"
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
                {studentLoginStatus === "pending" ? (
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
