import React, { useState } from "react";
import "./teacherLogin.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Navigate, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { teacherLogin } from "../../../store/actions/authActions";

export default function TeacherLoginPage({ staffInfo }) {
  const [inputToggle, setInputToggle] = useState(false);
  // const dispatch = useDispatch();
  // const alert = useAlert();
  //   const { loading, authenticated, error, successMessage, userInfo } =
  //     useSelector((state) => state.auth);
  const [staff, setStaff] = useState({
    staffId: "",
    teacherSecret: "",
    password: "",
  });
  const handleInputValues = (e) => {
    setStaff({
      ...staff,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputToggle = () => setInputToggle(!inputToggle);

  const [showpass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const showPassword = () => setShowPass((show) => !show);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (staff.staffId || staff.password || staff.teacherSecret) {
      // dispatch(teacherLogin(staff));
      console.log(staff);
    } else {
      console.log("Invalid credentials!");
    }
  };

  if (
    (staffInfo && staffInfo.staffRole === "Teacher") ||
    (staffInfo && staffInfo.staffRole === "Admin/Teacher")
  ) {
    return <Navigate to="/sensec/teacher" />;
  }
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
            {/* <span>Don't have an account?</span>
              <Link to="/sensosa_chat/register">
                <button>Register</button>
              </Link> */}
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
              <input
                type="text"
                placeholder="Your Teacher Key"
                onChange={handleInputValues}
                name="teacherSecret"
                value={staff.teacherSecret}
              />
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
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
