import React, { useEffect, useState } from "react";
import "./resetPassword.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  forgotPassword,
  getAllUsers,
  getUser,
  resetPassword,
} from "../../features/allUsers/AllUsersSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function ResetPassword() {
  const verifiedUser = localStorage.getItem("verifiedUser");
  const users = useSelector(getAllUsers);
  const userInfo = useSelector(getUser);
  const {
    // userInfo,
    resetPasswordStatus,
    resetPasswordSuccessMessage,
    resetPasswordError,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token, uniqueId } = useParams();
  console.log(id);
  console.log(uniqueId);
  //   console.log(users);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showpass, setShowPass] = useState(false);
  const [showConfirmpass, setShowConfirmPass] = useState(false);
  const [passLengthError, setPassLengthError] = useState("");

  const selectedUser = users.find((user) => user.uniqueId === uniqueId);
  console.log(selectedUser);

  const showPassword = () => setShowPass(!showpass);
  const showConfirmPassword = () => setShowConfirmPass(!showConfirmpass);

  //PASSWORD INPUT CONTROLL
  const pass = password.length > 0;
  const passCheck = password.length < 6;

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("New password required!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    if (!confirmPassword) {
      toast.error("Confirm your new password", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password doesn't match!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    if (
      //Query against injection
      (verifiedUser && !selectedUser) ||
      selectedUser === undefined
    ) {
      toast.error("User not found!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    } else {
      dispatch(resetPassword({ id, token, uniqueId, password }));
    }
  };

  useEffect(() => {
    setPassLengthError("Password must be at least 6 characters long!");
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (resetPasswordStatus === "rejected") {
      resetPasswordError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
        })
      );
      return;
    }
    if (resetPasswordStatus === "success") {
      toast.success(resetPasswordSuccessMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
      setTimeout(() => {
        localStorage.removeItem("verifiedUser");
      }, 5000);
      if (userInfo && userInfo?.isStudent) {
        navigate("/sensec/student");
      }
      if (userInfo && userInfo?.isAmin) {
        navigate("/sensec/admin");
      }
      if (userInfo && userInfo?.isTeacher) {
        navigate("/sensec/teacher");
      }
    }
  }, [
    resetPasswordStatus,
    resetPasswordSuccessMessage,
    resetPasswordError,
    navigate,
    userInfo,
  ]);
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
            <h1>Reset Password</h1>
            <form onSubmit={handleResetPassword}>
              <div className="studentId">
                <input
                  className="loginInput"
                  type={showpass ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  value={password}
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
              <div className="studentId">
                <input
                  className="loginInput"
                  type={showConfirmpass ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="password"
                  value={confirmPassword}
                />
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    width: "30px",
                  }}
                  onClick={showConfirmPassword}
                >
                  {showConfirmpass ? (
                    <VisibilityIcon style={{ color: "#a8a6a6" }} />
                  ) : (
                    <VisibilityOffIcon style={{ color: "#a8a6a6" }} />
                  )}
                </div>
              </div>
              <button type="submit">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
