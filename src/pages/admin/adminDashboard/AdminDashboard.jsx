import React, { useState } from "react";
import "./adminDashboard.scss";
import { HashLink } from "react-router-hash-link";
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
import DashboardContent from "../../../components/adminSection/dashboardContent/DashboardContent";
import { Outlet } from "react-router-dom";
import DashBoardFooter from "../../../components/footer/DashBoardFooter";
import LogoutBtn from "../../../components/logoutBtn/LogoutBtn";

export default function AdminDashboard({ openSidebar, toggleSidebar }) {
  const staffInfo = true;
  return (
    <div id="admin">
      <div className="adminWrap">
        <div className="adminCont">
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
              <img
                src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"
                alt=""
              />
              <div className="infoText">
                <span>
                  {staffInfo.isMale ? "Mr." : "Mrs."} {staffInfo.lastName}
                </span>
                <p>( {staffInfo.role} )</p>
              </div>
            </div>
            <div className="contentLinks">
              <HashLink to={"/sensec/admin"} className="links">
                <TvIcon />
                <h4>Dashboard</h4>
              </HashLink>
              <HashLink to={"/sensec/admin/staff_members"} className="links">
                <Diversity3Icon />
                <h4>Staff Members</h4>
              </HashLink>
              <HashLink to={"/sensec/admin/teachers"} className="links">
                <div className="teacherIcons">
                  <PanoramaOutlinedIcon className="tvIcon" />
                  <PersonIcon
                    style={{ backgroundColor: "#292929", zIndex: 1 }}
                  />
                </div>
                <h4>Teachers</h4>
              </HashLink>
              <HashLink to={"/sensec/admin/students"} className="links">
                <SchoolOutlinedIcon />
                <h4>Students</h4>
              </HashLink>
              <HashLink to={"/sensec/admin/students"} className="links">
                <HistoryEduIcon />
                <h4>Courses</h4>
              </HashLink>
              <HashLink to={"/sensec/admin/attendance"} className="links">
                <ListAltOutlinedIcon />
                <h4>Attendance</h4>
              </HashLink>
              <HashLink to={"/sensec/admin/public_notice"} className="links">
                <CampaignOutlinedIcon />
                <h4>Notice</h4>
              </HashLink>
            </div>
            <LogoutBtn />
          </div>
          <div className={openSidebar ? "adminRight side" : "adminRight"}>
            <Outlet />
            <DashBoardFooter openSidebar={openSidebar} />
          </div>
          {/* <DashboardContent openSidebar={openSidebar} /> */}
        </div>
      </div>
    </div>
  );
}
