import React, { useState } from "react";
import "./navbar.scss";
import { useNavigate } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CurrentUser from "../currentUser/CurrentUser";
import { useSelector } from "react-redux";
import { getStudentInfo } from "../../features/student/studentsSlice";
import { getStaffInfo } from "../../features/staff/staffSlice";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { getTeacherInfo } from "../../features/teacher/teachersSlice";
import { getUser } from "../../features/allUsers/AllUsersSlice";

export default function NavBar({
  setOpenLogin,
  openLogin,
  showOptions,
  setShowOptions,
  toast,
}) {
  const authAdminInfo = useSelector(getAdminInfo);
  const studentInfo = useSelector(getStudentInfo);
  const authStaffInfo = useSelector(getStaffInfo);
  const authTeacherInfo = useSelector(getTeacherInfo);
  const userInfo = useSelector(getUser);
  // console.log(userInfo);
  // const [showOptions, setShowOptions] = useState(false);

  const currentUser =
    authAdminInfo || authStaffInfo || authTeacherInfo || userInfo;

  console.log(authTeacherInfo);
  const [menuVisible, setMenuVisible] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const navigate = useNavigate();

  //THIS REMOVES THE NavHASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  //FUNCTION TO CHANGE THE NAVBAR BACKGROUND COLOR ON SCROLL
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  const showMenu = () => setMenuVisible((menu) => !menu);
  // const clear = () => {
  //   if (showOptions) {
  //     setShowOptions(false);
  //   }
  // };

  return (
    <div
      className={navbar ? "homeNavCont active" : "homeNavCont"}
      // onClick={clear}
    >
      <div className="logoFlex">
        <NavHashLink
          to={"/sensec/homepage#homepage"}
          smooth
          scroll={scrollWithOffset}
          className="logoText"
        >
          <img src="/assets/sensec-logo1.png" alt="" />
          <div>
            <p>
              Sen<span>sec</span>
            </p>
          </div>
        </NavHashLink>
      </div>
      <div className="navWrap">
        <button id="openMenuBtn" onClick={showMenu}>
          {!menuVisible ? <MenuIcon /> : <CloseIcon />}
        </button>
        <ul className={!menuVisible ? "navMenu" : "navMenu1"}>
          <li>
            <NavHashLink
              to={"/sensec/homepage#homepage"}
              smooth
              scroll={scrollWithOffset}
            >
              Home
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              to={"/sensec/about#about"}
              smooth
              scroll={scrollWithOffset}
            >
              About
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              to={"/sensec/courses#courses"}
              smooth
              scroll={scrollWithOffset}
            >
              Courses
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              to={"/sensec/contact#contact"}
              smooth
              scroll={scrollWithOffset}
            >
              Contact
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              to={"/sensec/student_enrollment/online_application#apply"}
              smooth
              scroll={scrollWithOffset}
            >
              Apply
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              to={"/sensec/blogs#blog"}
              smooth
              scroll={scrollWithOffset}
            >
              Blog
            </NavHashLink>
          </li>
          {currentUser.isAdmin && (
            <li>
              <NavHashLink
                to={"/sensec/admin#admin"}
                smooth
                scroll={scrollWithOffset}
              >
                Admin
              </NavHashLink>
            </li>
          )}
          {currentUser.isTeacher && (
            <li>
              <NavHashLink
                to={"/sensec/teacher#teacher"}
                smooth
                scroll={scrollWithOffset}
              >
                Teacher
              </NavHashLink>
            </li>
          )}
          {currentUser.role === "Non-Teaching Staff" && (
            <li>
              <NavHashLink
                to={"/sensec/staff#staff"}
                smooth
                scroll={scrollWithOffset}
              >
                Staff
              </NavHashLink>
            </li>
          )}
          {userInfo.isStudent && (
            <li>
              <NavHashLink
                to={"/sensec/student#student"}
                smooth
                scroll={scrollWithOffset}
              >
                Student
              </NavHashLink>
            </li>
          )}
        </ul>
        <CurrentUser
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          setOpenLogin={setOpenLogin}
          openLogin={openLogin}
          studentInfo={studentInfo}
          toast={toast}
        />
      </div>
      <div className="navBottomLines">
        <div className="bottomLine"></div>
        <div className="bottomLine"></div>
        <div className="bottomLine"></div>
      </div>
    </div>
  );
}
