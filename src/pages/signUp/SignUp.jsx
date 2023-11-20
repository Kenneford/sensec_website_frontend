import React, { useEffect, useState } from "react";
import "./signUp.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../features/allUsers/AllUsersSlice";
import { CircularProgress } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { toast } from "react-toastify";

export default function SignUp() {
  const { signUpUserStatus, signUpError, successMessage } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    uniqueId: "",
    email: "",
    password: "",
  });
  console.log(user);
  const handleInputValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpUser = (e) => {
    e.preventDefault();
    dispatch(signUpUser(user));
  };

  useEffect(() => {
    if (signUpUserStatus === "success") {
      setTimeout(() => {
        navigate("/sensec/sign_up/successful");
      }, 1000);
    }
    if (signUpUserStatus === "rejected") {
      signUpError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "dark",
          // toastId: successId,
        })
      );
      return;
    }
  }, [navigate, signUpUserStatus, signUpError]);

  return (
    <div className="signUpCont" style={{ paddingTop: "10rem" }}>
      <h1>SignUp</h1>
      <form onSubmit={handleSignUpUser}>
        <input
          type="text"
          placeholder="First Name"
          id=""
          name="firstName"
          onChange={handleInputValue}
        />
        <input
          type="text"
          placeholder="Surname"
          id=""
          name="lastName"
          onChange={handleInputValue}
        />
        <input
          type="text"
          placeholder="Username"
          id=""
          name="userName"
          onChange={handleInputValue}
        />
        <input
          type="text"
          placeholder="Unique-Id"
          id=""
          name="uniqueId"
          onChange={handleInputValue}
        />
        <input
          type="text"
          placeholder="Email"
          id=""
          name="email"
          onChange={handleInputValue}
        />
        <input
          type="text"
          placeholder="password"
          id=""
          name="password"
          onChange={handleInputValue}
        />
        <button type="submit">
          {signUpUserStatus === "pending" ? (
            <CircularProgress style={{ color: "white", size: "20px" }} />
          ) : signUpUserStatus === "success" ? (
            <>
              <span>Successful</span> <TaskAltIcon />
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
}
