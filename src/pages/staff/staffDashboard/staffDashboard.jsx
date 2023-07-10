import React, { useEffect, useState } from "react";
import "./staffDashboard.scss";
// import AdminDashBoard from "../../components/AdminsSection/adminDashboard/AdminDashBoard";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TvIcon from "@mui/icons-material/Tv";
import { HashLink } from "react-router-hash-link";
import axios from "axios";

import { format } from "timeago.js";
import DashBoardFooter from "../../../components/footer/DashBoardFooter";
import LogoutBtn from "../../../components/logoutBtn/LogoutBtn";
import { getStaffInfo } from "../../../features/staff/staffSlice";

const API_ENDPOINT = "http://localhost:5000/api";

export default function StaffDashboard({ openSidebar, toggleSidebar }) {
  const authStaffInfo = useSelector(getStaffInfo);
  return (
    <div id="staff">
      <div className="adminsWrap">
        <div className="adminsCont">
          <div className={openSidebar ? "adminLeft side" : "adminLeft"}>
            <span
              className="span"
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
              {authStaffInfo.profilePicture ? (
                <img
                  src={authStaffInfo.profilePicture}
                  alt="Staff Member's Profile"
                />
              ) : (
                <img
                  src={
                    authStaffInfo.isMale
                      ? "/assets/maleAvatar.png"
                      : "/assets/femaleAvatar.png"
                  }
                  alt=""
                />
              )}
              <div className="infoText">
                <span>
                  {authStaffInfo.isMale ? "Mr." : "Mrs."}{" "}
                  {authStaffInfo.lastName}
                </span>
                <p>( {authStaffInfo.role} )</p>
              </div>
            </div>
            <div className="contentLinks">
              <HashLink to={"/sensec/staff/#staff"} className="links">
                <TvIcon />
                <h4>Dashboard</h4>
              </HashLink>
              <HashLink to={"/sensec/all_teachers"} className="links">
                <div className="teacherIcons">
                  <PanoramaOutlinedIcon className="tvIcon" />
                  <PersonIcon
                    style={{ backgroundColor: "#292929", zIndex: 1 }}
                  />
                </div>
                <h4>Teachers</h4>
              </HashLink>
              <HashLink to={"/sensec/school_staff"} className="links">
                <Diversity3Icon />
                <h4>Staff Members</h4>
              </HashLink>
              <HashLink to={"/sensec/students"} className="links">
                <SchoolOutlinedIcon />
                <h4>Students</h4>
              </HashLink>
              <HashLink to={"/sensec/students"} className="links">
                <HistoryEduIcon />
                <h4>Courses</h4>
              </HashLink>
              <HashLink to={"/sensec/attendance"} className="links">
                <ListAltOutlinedIcon />
                <h4>Attendance</h4>
              </HashLink>
              <HashLink to={"/sensec/general_announcement"} className="links">
                <CampaignOutlinedIcon />
                <h4>Notice</h4>
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
