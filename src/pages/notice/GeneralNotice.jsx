import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TvIcon from "@mui/icons-material/Tv";
import { HashLink } from "react-router-hash-link";
import LogoutBtn from "../../components/logoutBtn/LogoutBtn";
import DashBoardFooter from "../../components/footer/DashBoardFooter";
import { getStudentInfo } from "../../features/student/studentsSlice";
import { getTeacherInfo } from "../../features/teacher/teachersSlice";
import { getStaffInfo } from "../../features/staff/staffSlice";
import { getAdminInfo } from "../../features/admin/adminsSlice";

export default function GeneralNotice({ openSidebar, toggleSidebar }) {
  const studentInfo = useSelector(getStudentInfo);
  const authStaffInfo = useSelector(getStaffInfo);
  const authTeacherInfo = useSelector(getTeacherInfo);
  const authAdminInfo = useSelector(getAdminInfo);

  const owing = false;
  return (
    <div id="staff">
      <div className="adminsWrap">
        <div className="adminsCont">
          {authAdminInfo && (
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
                {authAdminInfo.profilePicture ? (
                  <img src={authAdminInfo.profilePicture} alt="" />
                ) : (
                  <img
                    src={
                      authAdminInfo.isMale
                        ? "/assets/maleAvatar.png"
                        : "/assets/femaleAvatar.png"
                    }
                    alt=""
                  />
                )}
                <div className="infoText">
                  <span>{authAdminInfo.isMale ? "Mr. " : "Mrs. "}</span>
                  <p>( {authAdminInfo.role} )</p>
                </div>
              </div>
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
                <HashLink to={"/sensec/general_announcement"} className="links">
                  <CampaignOutlinedIcon />
                  <h4>Notice</h4>
                </HashLink>
              </div>
              <LogoutBtn openSidebar={openSidebar} />
            </div>
          )}

          {authTeacherInfo && (
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
                {authTeacherInfo.profilePicture ? (
                  <img src={authTeacherInfo.profilePicture} alt="" />
                ) : (
                  <img
                    src={
                      authTeacherInfo.isMale
                        ? "/assets/maleAvatar.png"
                        : "/assets/femaleAvatar.png"
                    }
                    alt=""
                  />
                )}
                <div className="infoText">
                  <span>{authTeacherInfo.isMale ? "Mr. " : "Mrs. "}</span>
                  <p>( {authTeacherInfo.role} )</p>
                </div>
              </div>
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
                <HashLink to={"/sensec/general_announcement"} className="links">
                  <CampaignOutlinedIcon />
                  <h4>Notice</h4>
                </HashLink>
              </div>
              <LogoutBtn openSidebar={openSidebar} />
            </div>
          )}

          {authStaffInfo && (
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
                  <img src={authStaffInfo.profilePicture} alt="" />
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
                    {authStaffInfo.isMale ? "Mr. " : "Mrs. "}{" "}
                    {authStaffInfo.lastName}
                  </span>
                  <p>( {authStaffInfo.role} )</p>
                </div>
              </div>
              <div className="contentLinks">
                <HashLink to={"/sensec/staff"} className="links">
                  <TvIcon />
                  <h4>Dashboard</h4>
                </HashLink>
                <HashLink to={"/sensec/staff/all_teachers"} className="links">
                  <div className="teacherIcons">
                    <PanoramaOutlinedIcon className="tvIcon" />
                    <PersonIcon
                      style={{ backgroundColor: "#292929", zIndex: 1 }}
                    />
                  </div>
                  <h4>Teachers</h4>
                </HashLink>
                <HashLink to={"/sensec/staff/school_staff"} className="links">
                  <Diversity3Icon />
                  <h4>Staff Members</h4>
                </HashLink>
                <HashLink to={"/sensec/staff/students"} className="links">
                  <SchoolOutlinedIcon />
                  <h4>Students</h4>
                </HashLink>
                <HashLink to={"/sensec/staff/students"} className="links">
                  <HistoryEduIcon />
                  <h4>Courses</h4>
                </HashLink>
                <HashLink to={"/sensec/staff/attendance"} className="links">
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
          )}

          {studentInfo && (
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
                {studentInfo.profilePicture ? (
                  <img src={studentInfo.profilePicture} alt="" />
                ) : (
                  <img
                    src={
                      studentInfo.isMale
                        ? "/assets/maleAvatar.png"
                        : "/assets/femaleAvatar.png"
                    }
                    alt=""
                  />
                )}
                <div className="infoText">
                  <span>
                    {studentInfo.isMale ? "Mr. " : "Mrs. "}{" "}
                    {studentInfo.lastName}
                  </span>
                  <p>( {studentInfo.courseStudy} Student )</p>
                </div>
              </div>
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
                <HashLink to={"/sensec/general_announcement"} className="links">
                  <CampaignOutlinedIcon />
                  <h4>Notice</h4>
                </HashLink>
              </div>
              <LogoutBtn openSidebar={openSidebar} />
            </div>
          )}

          {!studentInfo &&
            !authStaffInfo &&
            !authTeacherInfo &&
            !authAdminInfo && (
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
                  <img src="/assets/noAvatar.png" alt="" />
                  <div className="infoText">
                    <span>Guest</span>
                  </div>
                </div>
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
                </div>
              </div>
            )}
          <div className={openSidebar ? "adminRight side" : "adminRight"}>
            <Outlet />
            <DashBoardFooter openSidebar={openSidebar} />
          </div>
        </div>
      </div>
    </div>
  );
}
