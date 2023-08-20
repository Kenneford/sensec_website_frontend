import React, { useState } from "react";
import "./teacherDash.scss";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import TvIcon from "@mui/icons-material/Tv";
import { HashLink } from "react-router-hash-link";
import DashBoardFooter from "../../../components/footer/DashBoardFooter";
import LogoutBtn from "../../../components/logoutBtn/LogoutBtn";
import { getTeacherInfo } from "../../../features/teacher/teachersSlice";

export default function TeacherDashBoard({ openSidebar, toggleSidebar }) {
  const staffInfo = true;
  const authTeacherInfo = useSelector(getTeacherInfo);
  console.log(authTeacherInfo);
  return (
    <div id="teacher">
      <div className="adminsWrap">
        <div className="adminsCont">
          <div className={openSidebar ? "adminLeft side" : "adminLeft"}>
            <span
              className={openSidebar ? "span icon" : "span"}
              onClick={(e) => toggleSidebar(e)}
              style={{ cursor: "pointer", position: "relative" }}
            >
              {!openSidebar ? (
                <ArrowBackIosIcon className="sideBarIcon" />
              ) : (
                <ArrowForwardIosIcon className="sideBarIcon" />
              )}
            </span>
            <div className="adminInfo">
              <img src={authTeacherInfo.profilePicture} alt="" />
              <div className="infoText">
                <span>
                  {authTeacherInfo.gender === "Male"
                    ? "Mr."
                    : authTeacherInfo.gender === "Female"
                    ? "Mrs."
                    : ""}
                  {authTeacherInfo.fullName}
                </span>
                <p>( {authTeacherInfo?.program?.name})</p>
              </div>
            </div>
            <div className="contentLinks">
              <HashLink to={"/sensec/teacher#teacher"} className="links">
                <TvIcon />
                <h4>Dashboard</h4>
              </HashLink>
              <HashLink to={"#"} className="links">
                <div className="teacherIcons">
                  <SupervisedUserCircleIcon />
                </div>
                <h4>Teachers</h4>
              </HashLink>
              <HashLink to={"#"} className="links">
                <Diversity3Icon />
                <h4>Staff Members</h4>
              </HashLink>
              <HashLink to={"#"} className="links">
                <SchoolOutlinedIcon />
                <h4> Course Students</h4>
              </HashLink>
              <HashLink
                to={"/sensec/teacher/students_attendance"}
                className="links"
              >
                <ListAltOutlinedIcon />
                <h4>Students Attendance</h4>
              </HashLink>
              <HashLink to={"/sensec/general_announcement"} className="links">
                <CampaignOutlinedIcon />
                <h4>Public Notice</h4>
              </HashLink>
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
