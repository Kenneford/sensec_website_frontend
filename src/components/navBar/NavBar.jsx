import React, { useState } from "react";
import "./navbar.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HashLink, NavHashLink } from "react-router-hash-link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
// import PersonIcon from "@mui/icons-material/Person";
// import CoursesNavBar from "../SubNavBar/coursesNavBar/CoursesNavBar";
// import AboutNavBar from "../SubNavBar/aboutNavBar/AboutNavBar";
// import ContactNavBar from "../SubNavBar/contactNavBar/ContactNavBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CurrentUser from "../currentUser/CurrentUser";
import { useSelector } from "react-redux";
import { getStudentInfo } from "../../features/student/studentsSlice";
import { getStaffInfo } from "../../features/staff/staffSlice";
// import LoginIcon from "@mui/icons-material/Login";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutStaff, logoutStudent } from "../../store/actions/authActions";
// import LogoutBtn from "../logoutBtn/LogoutBtn";

export default function NavBar({ setOpenLogin, openLogin }) {
  // const { studentInfo } = useSelector((state) => state.auth);
  // const { staffInfo } = useSelector((state) => state.auth);
  const studentInfo = useSelector(getStudentInfo);
  const staffInfo = useSelector(getStaffInfo);
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openTeacher, setOpenTeacher] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [openAlert, setopenAlert] = useState(false);

  // console.log("Menu Is Visible: ", menuVisible);
  const [navbar, setNavbar] = useState(false);

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
    // console.log(window.scrollY);
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
          {(staffInfo && staffInfo.staffRole === "Admin") ||
          (staffInfo && staffInfo.staffRole === "Admin/Teacher") ? (
            <li>
              <NavHashLink
                to={"/sensec/admin/#admin"}
                smooth
                scroll={scrollWithOffset}
              >
                Admin
              </NavHashLink>
            </li>
          ) : (
            ""
          )}
          {(staffInfo && staffInfo.staffRole === "Teacher") ||
            (staffInfo && staffInfo.staffRole === "Admin/Teacher" && (
              <li>
                <NavHashLink
                  to={"/sensec/teacher/#teacher"}
                  smooth
                  scroll={scrollWithOffset}
                >
                  Teacher
                </NavHashLink>
              </li>
            ))}
          {staffInfo && (
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
