import React, { useEffect, useState } from "react";
import "./studentDashboard.scss";
import TvIcon from "@mui/icons-material/Tv";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import ComputerIcon from "@mui/icons-material/Computer";
import PersonIcon from "@mui/icons-material/Person";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DashBoardNav from "../../../components/navBar/DashBoardNav";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutStudent } from "../../../store/actions/authActions";
import LogoutBtn from "../../../components/logoutBtn/LogoutBtn";
import DashBoardFooter from "../../../components/footer/DashBoardFooter";
import {
  fetchSingleStudent,
  getStudentInfo,
} from "../../../features/student/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  getAllUsers,
  getUser,
} from "../../../features/allUsers/AllUsersSlice";

export default function StudentDashBoard({
  openSidebar,
  toggleSidebar,
  // StudentInfo,
}) {
  const studentInfo = useSelector(getStudentInfo);
  const userInfo = useSelector(getUser);
  const allUser = useSelector(getAllUsers);
  const userFound = allUser.find((user) => user.uniqueId === userInfo.uniqueId);
  // const singleStudent = useSelector(getSingleStudent);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userInfo = true;
  const owing = false;
  console.log(userFound);

  //THIS REMOVES THE NavHASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -200;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(fetchSingleStudent(userInfo.uniqueId));
    dispatch(fetchAllUsers());
  }, [dispatch, userInfo.uniqueId]);

  return (
    <div id="student">
      <div className="adminsWrap">
        <div className="adminsCont">
          <div className={openSidebar ? "adminLeft side" : "adminLeft"}>
            <span
              className={openSidebar ? "span icon" : "span"}
              onClick={toggleSidebar}
              style={{ cursor: "pointer", position: "relative" }}
            >
              {!openSidebar ? (
                <ArrowBackIosIcon className="sideBarIcon" />
              ) : (
                <ArrowForwardIosIcon className="sideBarIcon" />
              )}
            </span>
            <div className="adminInfo">
              <img
                onClick={() =>
                  navigate(
                    `/sensec/student/student_info/${userInfo.firstName}_${userInfo.lastName}/${userInfo.uniqueId}`
                  )
                }
                src={
                  userInfo.profilePicture
                    ? userInfo?.profilePicture
                    : "/assets/maleAvatar.png"
                }
                alt=""
              />
              <div className="infoText">
                <span>{userInfo?.fullName}</span>
                <span className="nickName">@_{userFound?.userName}</span>
                <p>( {userInfo?.program?.name} Student )</p>
              </div>
            </div>
            <div className="contentLinks">
              <HashLink
                className="links"
                title={openSidebar ? "Dashboard" : ""}
                to={"/sensec/student/#student"}
              >
                <TvIcon />
                <h4>Dashboard</h4>
              </HashLink>
              <HashLink
                to={`/sensec/student/${userInfo.program?.name}/${userInfo?.currentClassLevel?.name}/weekly_lectures`}
                className="links"
                title={openSidebar ? "Weekly Lectures" : ""}
              >
                <NoteAltIcon />
                <h4>Weekly Lectures</h4>
              </HashLink>
              <HashLink className="links" title={openSidebar ? "Teachers" : ""}>
                <SupervisedUserCircleIcon className="tvIcon" />
                <h4>Teachers</h4>
              </HashLink>
              <HashLink
                to={`/sensec/student/${userInfo.uniqueId}/coursemates/${userInfo.program?.name}`}
                className="links"
                title={openSidebar ? "Coursemates" : ""}
              >
                <SchoolOutlinedIcon />
                <h4>Coursemates</h4>
              </HashLink>
              <HashLink
                to={`/sensec/student/${userInfo.uniqueId}/attendance`}
                className="links"
                title={openSidebar ? "My Attendance" : ""}
              >
                <ListAltOutlinedIcon />
                <h4>My Attendance</h4>
              </HashLink>
              <HashLink
                to={"/sensec/blogs#blogs"}
                className="links"
                title={openSidebar ? "Public Notice" : ""}
                smooth
                scroll={scrollWithOffset}
              >
                <CampaignOutlinedIcon />
                <h4>Notice</h4>
              </HashLink>
              <div className="links" title={openSidebar ? "Fees Status" : ""}>
                <MoneyOutlinedIcon />
                <h4>My Fees</h4>
                <div className="feesCheck">
                  {!owing ? (
                    <QuestionMarkOutlinedIcon
                      titleAccess="Your are owing"
                      style={{
                        backgroundColor: "red",
                        borderRadius: ".4rem",
                      }}
                    />
                  ) : (
                    <CheckOutlinedIcon
                      titleAccess="All fees paid"
                      style={{
                        backgroundColor: "green",
                        borderRadius: ".4rem",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <LogoutBtn openSidebar={openSidebar} />
          </div>
          <div className={openSidebar ? "adminRight side" : "adminRight"}>
            <Outlet />
            <DashBoardFooter openSidebar={openSidebar} />
          </div>
        </div>
      </div>
    </div>
  );
}
