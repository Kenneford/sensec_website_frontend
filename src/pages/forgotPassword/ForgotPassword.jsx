import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, getUser } from "../../features/allUsers/AllUsersSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const userInfo = useSelector(getUser);
  console.log(userInfo);
  const navigate = useNavigate();
  const {
    forgotPasswordStatus,
    forgotPasswordSuccessMessage,
    forgotPasswordError,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
  });
  console.log(user.email);
  const handleInputValues = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!user.email) {
      toast.error("Your email required!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    dispatch(forgotPassword(user));
  };

  useEffect(() => {
    if (forgotPasswordStatus === "rejected") {
      forgotPasswordError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
        })
      );
      return;
    }
    if (forgotPasswordStatus === "success") {
      toast.success(forgotPasswordSuccessMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [forgotPasswordStatus, forgotPasswordSuccessMessage, forgotPasswordError]);

  if (userInfo && userInfo.isStudent) {
    navigate("/sensec/student");
  }
  if (userInfo && userInfo.isAmin) {
    navigate("/sensec/admin");
  }
  if (userInfo && userInfo.isTeacher) {
    navigate("/sensec/teacher");
  }

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
            <h1>Forgot Password</h1>
            <form onSubmit={handleForgotPassword}>
              <input
                className="loginInput"
                type="email"
                placeholder="Your email address"
                onChange={handleInputValues}
                name="email"
                value={user.email}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
