import React, { useEffect } from "react";
import "./verifyEmail.scss";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  getAllUsers,
  getUser,
  userEmailVerification,
} from "../../features/allUsers/AllUsersSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { emailToken } = useParams();
  console.log(emailToken);
  const allUser = useSelector(getAllUsers);
  const userInfo = useSelector(getUser);
  console.log(userInfo);
  console.log(allUser);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(userEmailVerification(emailToken));
  }, [dispatch, emailToken]);
  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        toast.success("Verification successful", {
          position: "top-right",
          theme: "dark",
        });
        navigate("/sensec/student");
      }, 3000);
    }
  }, [navigate, userInfo]);
  return (
    <div className="verifiedCont">
      <div className="verifiedWrap">
        <div className="verifiedContent">
          <div className="verifyFlex">
            <h1>Verified</h1>
            <TaskAltIcon className="checkIcon" />
          </div>
          <p>Redirecting...</p>
        </div>
      </div>
    </div>
  );
}
