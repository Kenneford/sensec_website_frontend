// import React, { useState } from "react";
// import "./dashboardNav.scss";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { HashLink } from "react-router-hash-link";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import PersonIcon from "@mui/icons-material/Person";
// import CoursesNavBar from "../SubNavBar/coursesNavBar/CoursesNavBar";
// import AboutNavBar from "../SubNavBar/aboutNavBar/AboutNavBar";
// import ContactNavBar from "../SubNavBar/contactNavBar/ContactNavBar";
// import { logoutStaff, logoutStudent } from "../../store/actions/authActions";
// import { useDispatch, useSelector } from "react-redux";

// export default function DashBoardNav() {
//   const { studentInfo } = useSelector((state) => state.auth);
//   const { staffInfo } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [menuVisible, setMenuVisible] = useState(false);
//   console.log("Menu Is Visible: ", menuVisible);
//   const user = false;
//   const admin = false;
//   const [navbar, setNavbar] = useState(false);

//   const scrollWithOffset = (el) => {
//     const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
//     const yOffset = -80;
//     window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
//   };

//   const changeBackground = () => {
//     // console.log(window.scrollY);
//     if (window.scrollY >= 80) {
//       setNavbar(true);
//     } else {
//       setNavbar(false);
//     }
//   };
//   window.addEventListener("scroll", changeBackground);

//   const showMenu = () => setMenuVisible((menu) => !menu);
//   const closeMenu = () => {};

//   const handleLogout = (e) => {
//     e.preventDefault();
//     if (studentInfo) {
//       dispatch(logoutStudent());
//     }
//     if (staffInfo.isStaff) {
//       dispatch(logoutStaff());
//     }
//   };

//   return (
//     <div className={navbar ? "dashboardNavCont active" : "dashboardNavCont"}>
//       <div className="logoFlex">
//         <HashLink
//           to={"/#home"}
//           smooth
//           scroll={scrollWithOffset}
//           className="logoText"
//         >
//           <img src="/assets/sensec-logo1.png" alt="" />
//           <p>
//             Sen<span>sec</span>
//           </p>
//         </HashLink>
//         <button id="openMenuBtn" onClick={showMenu}>
//           {!menuVisible ? <MenuIcon /> : <CloseIcon />}
//         </button>
//         <div className="navWrap">
//           <ul className={!menuVisible ? "navMenu" : "navMenu1"}>
//             <li>
//               <HashLink to={"/#home"} smooth scroll={scrollWithOffset}>
//                 Home
//               </HashLink>
//             </li>
//             <li>
//               <HashLink
//                 to={"/sensec/about#about"}
//                 smooth
//                 scroll={scrollWithOffset}
//               >
//                 About
//               </HashLink>
//               <AboutNavBar />
//             </li>
//             <li>
//               <HashLink
//                 to={"/sensec/courses#courses"}
//                 smooth
//                 scroll={scrollWithOffset}
//               >
//                 Courses
//               </HashLink>
//               <CoursesNavBar />
//             </li>
//             <li>
//               <HashLink
//                 to={"/sensec/contact#contact"}
//                 smooth
//                 scroll={scrollWithOffset}
//               >
//                 Contact
//               </HashLink>
//               <ContactNavBar />
//             </li>
//             {staffInfo.isAdmin && (
//               <li>
//                 <HashLink
//                   to={"/sensec/admin#admin"}
//                   smooth
//                   scroll={scrollWithOffset}
//                 >
//                   Admin
//                 </HashLink>
//                 <ContactNavBar />
//               </li>
//             )}
//             {staffInfo.isTeacher && (
//               <li>
//                 <HashLink
//                   to={"/sensec/teacher#teacherDashboard"}
//                   smooth
//                   scroll={scrollWithOffset}
//                 >
//                   Teacher
//                 </HashLink>
//                 <ContactNavBar />
//               </li>
//             )}
//             {studentInfo && (
//               <li>
//                 <HashLink
//                   to={"/sensec/student#studentDashboard"}
//                   smooth
//                   scroll={scrollWithOffset}
//                 >
//                   Student
//                 </HashLink>
//                 <ContactNavBar />
//               </li>
//             )}
//           </ul>
//         </div>
//         <div className="user">
//           {staffInfo || studentInfo ? (
//             <div>
//               {staffInfo ? (
//                 <div className="userInfo">
//                   <p>Welcome, Staff</p>
//                   <div className="icon">
//                     <PersonIcon />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="userInfo">
//                   <p>Welcome, Kenn</p>
//                   <div className="icon">
//                     <PersonIcon />
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="userActions">
//               <button onClick={handleLogout}>Logout</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
