import React from "react";
// import "./staffDashboard.scss";
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
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import TvIcon from "@mui/icons-material/Tv";
import { HashLink } from "react-router-hash-link";
import { getStaffInfo } from "../../features/staff/staffSlice";
import LogoutBtn from "../../components/logoutBtn/LogoutBtn";
import DashBoardFooter from "../../components/footer/DashBoardFooter";
import { getStudentInfo } from "../../features/student/studentsSlice";

export default function GeneralNotice({ openSidebar, toggleSidebar }) {
  const studentInfo = useSelector(getStudentInfo);
  const authStaffInfo = useSelector(getStaffInfo);
  const owing = false;
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
              <img
                src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"
                alt=""
              />
              <div className="infoText">
                <span>
                  {authStaffInfo.isMale ? "Mr." : "Mrs."}{" "}
                  {authStaffInfo.lastName}
                </span>
                <p>( {authStaffInfo.staffRole} )</p>
              </div>
            </div>
            {authStaffInfo ? (
              <div className="contentLinks">
                <HashLink to={"/sensec/admin"} className="links">
                  <TvIcon />
                  <h4>Dashboard</h4>
                </HashLink>
                <HashLink to={"/sensec/admin/all_teachers"} className="links">
                  <div className="teacherIcons">
                    <PanoramaOutlinedIcon className="tvIcon" />
                    <PersonIcon
                      style={{ backgroundColor: "#292929", zIndex: 1 }}
                    />
                  </div>
                  <h4>Teachers</h4>
                </HashLink>
                <HashLink to={"/sensec/admin/school_staff"} className="links">
                  <Diversity3Icon />
                  <h4>Staff Members</h4>
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
            ) : (
              <div className="contentLinks">
                <div className="links" title={openSidebar ? "Dashboard" : ""}>
                  <TvIcon />
                  <h4>Dashboard</h4>
                </div>
                <div className="links" title={openSidebar ? "Teachers" : ""}>
                  <div className="teacherIcons">
                    <PanoramaOutlinedIcon className="tvIcon" />
                    <PersonIcon
                      style={{ backgroundColor: "#292929", zIndex: 1 }}
                    />
                  </div>
                  <h4>Teachers</h4>
                </div>
                <HashLink
                  to={"/sensec/student/weekly_lectures"}
                  className="links"
                  title={openSidebar ? "Weekly Lectures" : ""}
                >
                  <NoteAltIcon />
                  <h4>Weekly Lectures</h4>
                </HashLink>
                <div className="links" title={openSidebar ? "Coursemates" : ""}>
                  <SchoolOutlinedIcon />
                  <h4>Coursemates</h4>
                </div>
                <div
                  className="links"
                  title={openSidebar ? "My Attendance" : ""}
                >
                  <ListAltOutlinedIcon />
                  <h4>My Attendance</h4>
                </div>
                <div
                  className="links"
                  title={openSidebar ? "Public Notice" : ""}
                >
                  <CampaignOutlinedIcon />
                  <h4>Public Notice</h4>
                </div>
                <div className="links" title={openSidebar ? "Fees Status" : ""}>
                  <MoneyOutlinedIcon />
                  <h4>My Fees</h4>
                  <div className="feesCheck">
                    {owing ? (
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
            )}
            <LogoutBtn />
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
