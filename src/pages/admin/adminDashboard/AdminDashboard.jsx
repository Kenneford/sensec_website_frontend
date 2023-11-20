import React, { useState } from "react";
import "./adminDashboard.scss";
import { HashLink } from "react-router-hash-link";
import PersonIcon from "@mui/icons-material/Person";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import TvIcon from "@mui/icons-material/Tv";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import ConstructionIcon from "@mui/icons-material/Construction";
import DashboardContent from "../../../components/adminSection/dashboardContent/DashboardContent";
import { Outlet, useParams } from "react-router-dom";
import DashBoardFooter from "../../../components/footer/DashBoardFooter";
import LogoutBtn from "../../../components/logoutBtn/LogoutBtn";
import { getStaffInfo } from "../../../features/staff/staffSlice";
import { useSelector } from "react-redux";
import { getAdminInfo } from "../../../features/admin/adminsSlice";

export default function AdminDashboard({ openSidebar, toggleSidebar }) {
  // const staffInfo = true;
  const authAdminInfo = useSelector(getAdminInfo);
  const staffInfo = useSelector(getStaffInfo);

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  const scrollWithOffset1 = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -200;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  return (
    <div id="admin">
      <div className="adminWrap">
        <div className="adminCont">
          <div
            className={
              openSidebar && authAdminInfo ? "adminLeft side" : "adminLeft"
            }
          >
            <button
              className="span"
              onClick={(e) => toggleSidebar(e)}
              style={{ cursor: "pointer", position: "relative" }}
            >
              {!openSidebar ? (
                <ArrowBackIosIcon className="sideBarIcon" />
              ) : (
                <ArrowForwardIosIcon className="sideBarIcon" />
              )}
            </button>
            <div className="adminInfo">
              <img src={authAdminInfo.profilePicture} alt="" />
              <div className="infoText">
                <span>
                  {authAdminInfo.isMale ? "Mr." : "Mrs."}{" "}
                  {authAdminInfo.lastName}
                </span>
                <p>( {authAdminInfo.role} )</p>
              </div>
            </div>
            <div className="contentLinks">
              <HashLink
                to={"/sensec/admin#admin"}
                className="links"
                smooth
                title={openSidebar && "Dashboard"}
              >
                <TvIcon className="icon" />
                <h4>Dashboard</h4>
              </HashLink>
              <HashLink
                to={"/sensec/admin/register#admin"}
                className="links"
                smooth
                title={openSidebar && "Register"}
              >
                <AppRegistrationIcon className="icon" />
                <h4>Register</h4>
              </HashLink>
              <HashLink
                to={"/sensec/admin/create_data#admin"}
                className="links"
                smooth
                title={openSidebar && "Create Data"}
              >
                <ConstructionIcon />
                <h4>Create</h4>
              </HashLink>
              <HashLink
                to={"/sensec/admin/all_admins#admin"}
                className="links"
                smooth
                title={openSidebar && "Admins"}
              >
                <AdminPanelSettingsIcon />
                <h4>Admins</h4>
              </HashLink>
              <HashLink
                to={"/sensec/admin/staff_members#admin"}
                className="links"
                smooth
                title={openSidebar && "Staff Members"}
              >
                <Diversity3Icon />
                <h4>Staff Members</h4>
              </HashLink>
              <HashLink
                to={"/sensec/admin/all_teachers#admin"}
                className="links"
                smooth
                title={openSidebar && "Teachers"}
              >
                <div className="teacherIcons">
                  <SupervisedUserCircleIcon className="tvIcon" />
                </div>
                <h4>Teachers</h4>
              </HashLink>
              <HashLink
                to={"/sensec/admin/students#admin"}
                className="links"
                smooth
                title={openSidebar && "Students"}
              >
                <SchoolOutlinedIcon />
                <h4>Students</h4>
              </HashLink>
              <HashLink
                to={"/sensec/admin/team#admin"}
                className="links"
                smooth
                title={openSidebar && "Team"}
              >
                <Diversity2Icon />
                <h4>Team</h4>
              </HashLink>
              <HashLink
                to={"/sensec/admin/programs&subjects#admin"}
                className="links"
                smooth
                title={openSidebar && "Programs/Subjects"}
              >
                <AutoStoriesIcon />
                {/* <HistoryEduIcon /> */}
                <h4>Programs/Subjects</h4>
              </HashLink>
              {/* <HashLink
                to={"/sensec/admin/attendance/#admin"}
                className="links"
                smooth
              >
                <ListAltOutlinedIcon />
                <h4>Attendance</h4>
              </HashLink> */}
              <HashLink
                to={"/sensec/blogs#blogs"}
                className="links"
                smooth
                scroll={scrollWithOffset1}
                title={openSidebar && "Notice"}
              >
                <CampaignOutlinedIcon />
                <h4>Notice</h4>
              </HashLink>
            </div>
            <div className="sideBarLogoutBtn">
              <LogoutBtn openSidebar={openSidebar} />
            </div>
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
