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

export default function NavBar({ setOpenLogin, openLogin }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const studentInfo = useSelector(getStudentInfo);
  const authStaffInfo = useSelector(getStaffInfo);
  const authTeacherInfo = useSelector(getTeacherInfo);

  const [menuVisible, setMenuVisible] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const navigate = useNavigate();

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
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

  return (
    <div className={navbar ? "homeNavCont active" : "homeNavCont"}>
      <div className="logoFlex">
        <NavHashLink
          to={"/sensec/homepage/#homepage"}
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
        <button id="openMenuBtn" onClick={showMenu}>
          {!menuVisible ? <MenuIcon /> : <CloseIcon />}
        </button>
      </div>
      <div className="navWrap">
        <ul className={!menuVisible ? "navMenu" : "navMenu1"}>
          <li>
            <NavHashLink
              to={"/sensec/homepage/#homepage"}
              smooth
              scroll={scrollWithOffset}
            >
              Home
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              to={"/sensec/about/#about"}
              smooth
              scroll={scrollWithOffset}
            >
              About
            </NavHashLink>
            {/* <AboutNavBar /> */}
          </li>
          <li>
            <NavHashLink
              to={"/sensec/courses/#courses"}
              smooth
              scroll={scrollWithOffset}
            >
              Courses
            </NavHashLink>
            {/* <CoursesNavBar /> */}
          </li>
          <li>
            <NavHashLink
              to={"/sensec/contact/#contact"}
              smooth
              scroll={scrollWithOffset}
            >
              Contact
            </NavHashLink>
            {/* <ContactNavBar /> */}
          </li>
          {!authAdminInfo &&
            !studentInfo &&
            !authTeacherInfo &&
            !authStaffInfo && (
              <li>
                <NavHashLink
                  to={"/sensec/general_announcement/#notice"}
                  smooth
                  scroll={scrollWithOffset}
                >
                  General Notice
                </NavHashLink>
                {/* <ContactNavBar /> */}
              </li>
            )}
          {authAdminInfo && (
            <li>
              <NavHashLink
                to={"/sensec/admin/#admin"}
                smooth
                scroll={scrollWithOffset}
              >
                Admin
              </NavHashLink>
            </li>
          )}
          {authTeacherInfo && (
            <li>
              <NavHashLink
                to={"/sensec/teacher/#teacher"}
                smooth
                scroll={scrollWithOffset}
              >
                Teacher
              </NavHashLink>
            </li>
          )}
          {authStaffInfo && (
            <li>
              <NavHashLink
                to={"/sensec/staff/#staff"}
                smooth
                scroll={scrollWithOffset}
              >
                Staff
              </NavHashLink>
            </li>
          )}
          {studentInfo && (
            <li>
              <NavHashLink
                to={"/sensec/student/#student"}
                smooth
                scroll={scrollWithOffset}
              >
                Student
              </NavHashLink>
            </li>
          )}
        </ul>
        <CurrentUser
          setOpenLogin={setOpenLogin}
          openLogin={openLogin}
          studentInfo={studentInfo}
        />
      </div>
    </div>
  );
}
