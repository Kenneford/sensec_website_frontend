import React, { useState } from "react";
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

export default function StudentDashBoard({
  openSidebar,
  toggleSidebar,
  studentInfo,
}) {
  // const studentInfo = useSelector(getStudentInfo);
  const navigate = useNavigate();
  // const studentInfo = true;
  const owing = false;
  console.log(studentInfo);

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
                src={
                  studentInfo.profilePicture
                    ? studentInfo.profilePicture
                    : "/assets/maleAvatar.png"
                }
                alt=""
              />
              <div className="infoText">
                <span>
                  {studentInfo.isMale ? "Bro." : "Sis."} {studentInfo.lastName}
                </span>
                <p>( {studentInfo.courseStudy} Student )</p>
              </div>
            </div>
            {/* <div className="adminInfo">
              <img
                src={
                  studentInfo.profilePicture
                    ? studentInfo.profilePicture
                    : "/assets/maleAvatar.png"
                }
                alt=""
              />
              <div className="infoText">
                <span>
                  {studentInfo && studentInfo.firstName}{" "}
                  {studentInfo && studentInfo.lastName}
                </span>
                <p>
                  ( {studentInfo.courseStudy ? studentInfo.courseStudy : ""}{" "}
                  Student )
                </p>
              </div>
            </div> */}
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
              <div className="links" title={openSidebar ? "My Attendance" : ""}>
                <ListAltOutlinedIcon />
                <h4>My Attendance</h4>
              </div>
              <div className="links" title={openSidebar ? "Public Notice" : ""}>
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
