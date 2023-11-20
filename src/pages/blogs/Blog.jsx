import React from "react";
import "./blog.scss";
import { Outlet, useNavigate } from "react-router-dom";
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
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ConstructionIcon from "@mui/icons-material/Construction";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { HashLink } from "react-router-hash-link";
import LogoutBtn from "../../components/logoutBtn/LogoutBtn";
import DashBoardFooter from "../../components/footer/DashBoardFooter";
import { getStudentInfo } from "../../features/student/studentsSlice";
import { getTeacherInfo } from "../../features/teacher/teachersSlice";
import { getStaffInfo } from "../../features/staff/staffSlice";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import BlogItem from "./BlogItem";
import { getAllUsers, getUser } from "../../features/allUsers/AllUsersSlice";

export default function Blog({ openSidebar, toggleSidebar }) {
  const userInfo = useSelector(getUser);
  const allUser = useSelector(getAllUsers);
  const userFound = allUser.find((user) => user.uniqueId === userInfo.uniqueId);
  console.log(userInfo);
  const studentInfo = useSelector(getStudentInfo);
  const authStaffInfo = useSelector(getStaffInfo);
  const authTeacherInfo = useSelector(getTeacherInfo);
  const authAdminInfo = useSelector(getAdminInfo);

  const navigate = useNavigate();

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const scrollWithOffset1 = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -200;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const owing = false;
  return (
    <div id="generalNotice">
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
                  <span>
                    {authAdminInfo.isMale ? "Mr. " : "Mrs. "}{" "}
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
                  <span>
                    {authTeacherInfo.isMale ? "Mr. " : "Mrs. "}{" "}
                    {authTeacherInfo.lastName}
                  </span>
                  <p>( {authTeacherInfo.role} )</p>
                </div>
              </div>
              <div className="contentLinks">
                <HashLink
                  to={"/sensec/teacher/#teacher"}
                  className="links"
                  title={openSidebar ? "Dashboard" : ""}
                >
                  <TvIcon />
                  <h4>Dashboard</h4>
                </HashLink>
                <HashLink
                  to={"/sensec/teacher/all_teachers"}
                  className="links"
                  title={openSidebar ? "Teachers" : ""}
                >
                  <div className="teacherIcons">
                    <PanoramaOutlinedIcon className="tvIcon" />
                    <PersonIcon
                      style={{ backgroundColor: "#292929", zIndex: 1 }}
                    />
                  </div>
                  <h4>Teachers</h4>
                </HashLink>
                <HashLink
                  to={"/sensec/teacher/school_staff"}
                  className="links"
                  title={openSidebar ? "Staff Members" : ""}
                >
                  <Diversity3Icon />
                  <h4>Staff Members</h4>
                </HashLink>
                <HashLink
                  to={"/sensec/teacher/students"}
                  className="links"
                  title={openSidebar ? "Students" : ""}
                >
                  <SchoolOutlinedIcon />
                  <h4>Students</h4>
                </HashLink>
                <HashLink
                  to={"/sensec/teacher/students"}
                  className="links"
                  title={openSidebar ? "Courses" : ""}
                >
                  <HistoryEduIcon />
                  <h4>Courses</h4>
                </HashLink>
                <HashLink
                  to={"/sensec/teacher/attendance"}
                  className="links"
                  title={openSidebar ? "Attendance" : ""}
                >
                  <ListAltOutlinedIcon />
                  <h4>Attendance</h4>
                </HashLink>
                <HashLink
                  to={"/sensec/general_announcement/#generalNotice"}
                  className="links"
                  smooth
                  title={openSidebar ? "Notice" : ""}
                >
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
                <HashLink
                  to={"/sensec/staff"}
                  className="links"
                  title={openSidebar ? "Dashboard" : ""}
                >
                  <TvIcon />
                  <h4>Dashboard</h4>
                </HashLink>
                <HashLink
                  to={"/sensec/staff/all_teachers"}
                  className="links"
                  title={openSidebar ? "Teachers" : ""}
                >
                  <div className="teacherIcons">
                    <PanoramaOutlinedIcon className="tvIcon" />
                    <PersonIcon
                      style={{ backgroundColor: "#292929", zIndex: 1 }}
                    />
                  </div>
                  <h4>Teachers</h4>
                </HashLink>
                <HashLink
                  to={"/sensec/staff/school_staff"}
                  className="links"
                  title={openSidebar ? "Staff Members" : ""}
                >
                  <Diversity3Icon />
                  <h4>Staff Members</h4>
                </HashLink>
                <HashLink
                  to={"/sensec/staff/students"}
                  className="links"
                  title={openSidebar ? "Students" : ""}
                >
                  <SchoolOutlinedIcon />
                  <h4>Students</h4>
                </HashLink>
                <HashLink
                  to={"/sensec/staff/students"}
                  className="links"
                  title={openSidebar ? "Courses" : ""}
                >
                  <HistoryEduIcon />
                  <h4>Courses</h4>
                </HashLink>
                <HashLink
                  to={"/sensec/staff/attendance"}
                  className="links"
                  title={openSidebar ? "Attendance" : ""}
                >
                  <ListAltOutlinedIcon />
                  <h4>Attendance</h4>
                </HashLink>
                <HashLink
                  to={"/sensec/general_announcement/#generalNotice"}
                  className="links"
                  smooth
                  title={openSidebar ? "Notice" : ""}
                >
                  <CampaignOutlinedIcon />
                  <h4>Notice</h4>
                </HashLink>
              </div>
              <LogoutBtn openSidebar={openSidebar} />
            </div>
          )}

          {userInfo?.isStudent && (
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
                {userInfo.profilePicture ? (
                  <img
                    onClick={() =>
                      navigate(
                        `/sensec/student/student_info/${userInfo.firstName}_${userInfo.lastName}/${userInfo.studentId}`
                      )
                    }
                    src={userInfo.profilePicture}
                    alt=""
                  />
                ) : (
                  <img
                    onClick={() =>
                      navigate(
                        `/sensec/student/student_info/${userInfo.firstName}_${userInfo.lastName}/${userInfo.studentId}`
                      )
                    }
                    src={
                      userInfo.isMale
                        ? "/assets/maleAvatar.png"
                        : "/assets/femaleAvatar.png"
                    }
                    alt=""
                  />
                )}
                <div className="infoText">
                  <span>
                    {/* {studentInfo.isMale ? "Bro. " : "Sis. "}{" "} */}
                    {userInfo.fullName}
                  </span>
                  <span className="nickName">@{userFound?.userName}</span>
                  <p>( {userInfo.program?.name} Student )</p>
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
                  to={`/sensec/student/${userInfo.program?.name}/${userInfo.currentClassLevel?.name}/weekly_lectures`}
                  className="links"
                  title={openSidebar ? "Weekly Lectures" : ""}
                >
                  <NoteAltIcon />
                  <h4>Weekly Lectures</h4>
                </HashLink>
                <HashLink
                  className="links"
                  title={openSidebar ? "Teachers" : ""}
                >
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
                  scroll={scrollWithOffset1}
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
          )}

          {/* {!studentInfo &&
            !authStaffInfo &&
            !authTeacherInfo &&
            !authAdminInfo && (
              <BlogItem/>
            )} */}

          <div className={openSidebar ? "adminRight side" : "adminRight"}>
            <Outlet />
            <DashBoardFooter openSidebar={openSidebar} />
          </div>
          {/* <div className={openSidebar ? "adminRight side" : "adminRight"}>
            <Outlet />
            <DashBoardFooter openSidebar={openSidebar} />
          </div> */}
        </div>
      </div>
    </div>
  );
}
