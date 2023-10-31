import "./totalStudents.scss";
import SearchIcon from "@mui/icons-material/Search";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  studentSearch,
  getAllStudents,
} from "../../../../features/student/studentsSlice";
// import { studentColumn } from "../../../../options/options";
import {
  fetchClassLevels,
  getAllClassLevels,
} from "../../../../features/classLevels/classLevelsSlice";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../../../../apiEndPoint/api";
import { studentColumn } from "../../../../options/options";

export default function TotalStudents({ toast, toastOptions }) {
  const {
    fetchingStudentStatus,
    searchStudentStatus,
    studentError,
    studentSuccessMessage,
  } = useSelector((state) => state.student);
  const [searchStudent, setSearchStudent] = useState("");
  // const [students, setStudents] = useState([]);
  const dispatch = useDispatch();
  const allStudents = useSelector(getAllStudents);
  const allClassLevels = useSelector(getAllClassLevels);

  const [filteredStudents, setFilteredStudents] = useState(allStudents);
  const navigate = useNavigate();
  const { class_level } = useParams();
  console.log(searchStudent);
  console.log(allStudents);
  console.log(allClassLevels);

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "#555",
        color: "#fff",
      },
    },
    headColumn: {
      style: {
        border: "1rem solid red",
        // color: "#fff",
      },
    },
    headCells: {
      style: {
        fontSize: "1.2rem",
        // borderLeft: ".2rem solid red",
        // backgroundColor: "blue",
        // color: "#fff",
      },
    },
    cells: {
      style: {
        // backgroundColor: "#cccc",
        // color: "#fff",
        paddingTop: ".5rem",
        paddingBottom: ".5rem",
        // marginTop: ".5rem",
        // marginBottom: ".5rem",
      },
    },
  };

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -150;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  // useEffect(() => {
  //   setStudents(allStudents);
  // }, [allStudents]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const student_name = query.get("student_name");
  const location = useLocation();

  const handleStudentSearch = (e) => {
    e.preventDefault();
    if (searchStudent) {
      dispatch(studentSearch(searchStudent));
    } else {
      toast.error("Search field is empty!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchClassLevels());
  }, [dispatch]);

  useEffect(() => {
    if (fetchingStudentStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (searchStudentStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
    }
  }, [
    studentError,
    studentSuccessMessage,
    searchStudentStatus,
    fetchingStudentStatus,
    toast,
    toastOptions,
  ]);

  useEffect(() => {
    const studentsFiltered = allStudents?.filter((student) => {
      return student.lastName.toLowerCase().match(searchStudent.toLowerCase());
    });
    setFilteredStudents(studentsFiltered);
  }, [searchStudent, allStudents]);

  useEffect(() => {
    setFilteredStudents(filteredStudents);
  }, [filteredStudents]);
  // const studentColumn = [
  //   // {
  //   //   name: (
  //   //     <>
  //   //       <p>All</p>{" "}
  //   //       <input
  //   //         type="checkbox"
  //   //         name={"selectAll"}
  //   //         style={{ marginLeft: "1rem" }}
  //   //         onChange={handleSelectAll}
  //   //       />
  //   //     </>
  //   //   ),
  //   //   selector: (row) => (
  //   //     <div>
  //   //       <input
  //   //         type="checkbox"
  //   //         name={"select"}
  //   //         // value={"Present"}
  //   //         onChange={(e) => handleSelectAll(e, row.studentId)}
  //   //         checked={row?.isChecked}
  //   //       />
  //   //     </div>
  //   //   ),
  //   // },
  //   {
  //     name: "Image",
  //     selector: (row) =>
  //       row.profilePicture ? (
  //         <HashLink
  //           scroll={scrollWithOffset}
  //           smooth
  //           to={`/sensec/admin/student_info/${row.firstName}_${row.lastName}/${row.studentId}/#studentInfo`}
  //           title="View Student Info"
  //         >
  //           <img className="studentImg" src={row.profilePicture} alt="" />
  //         </HashLink>
  //       ) : (
  //         <HashLink
  //           scroll={scrollWithOffset}
  //           className="noImgLink"
  //           to={`/sensec/admin/student_info/${row.firstName}_${row.lastName}/${row.studentId}/#studentInfo`}
  //           title="View Student Info"
  //         >
  //           {row.gender === "Male" && (
  //             <img
  //               className="studentImg"
  //               src={"/assets/maleAvatar.png"}
  //               alt=""
  //             />
  //           )}
  //           {row.gender === "Female" && (
  //             <img
  //               className="studentImg"
  //               src={"/assets/femaleAvatar.png"}
  //               alt=""
  //             />
  //           )}
  //           {row?.gender === "" && (
  //             <div className="noImg">
  //               <p>No</p>
  //               <p>Image</p>
  //             </div>
  //           )}
  //         </HashLink>
  //       ),
  //   },
  //   {
  //     name: "First Name",
  //     selector: (row) => row.firstName,
  //     sortable: true,
  //   },
  //   { name: "Surname", selector: (row) => row.lastName },
  //   {
  //     name: "Date Of Birth",
  //     selector: (row) => (row.dateOfBirth ? row.dateOfBirth : "Unknown"),
  //   },
  //   {
  //     name: "Program",
  //     selector: (row) => (row.program ? row.program.name : "Unknown"),
  //   },
  //   { name: "Student-ID", selector: (row) => row.studentId, sortable: true },
  //   { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  //   { name: "Enrolled Date", selector: (row) => row.dateEnrolled },
  //   {
  //     name: "Batch",
  //     selector: (row) =>
  //       row.academicYear
  //         ? `${row.academicYear.fromYear}-${row.academicYear.toYear}`
  //         : "Unknown",
  //   },
  //   {
  //     name: "Level",
  //     selector: (row) =>
  //       row.currentClassLevel && (
  //         <div className="tableClassLevel">
  //           {row.currentClassLevel.name === "Level_100" && (
  //             <div className="firstYearTag" title="1st Year">
  //               1
  //             </div>
  //           )}
  //           {row.currentClassLevel.name === "Level_200" && (
  //             <div className="secondYearTag" title="2nd Year">
  //               2
  //             </div>
  //           )}
  //           {row.currentClassLevel.name === "Level_300" && !row.isGraduated && (
  //             <div className="thirdYearTag" title="3rd Year">
  //               3
  //             </div>
  //           )}
  //           {row.isGraduated && (
  //             <div className="isGraduated" title="Graduated">
  //               <SchoolOutlinedIcon />
  //             </div>
  //           )}
  //         </div>
  //       ),
  //   },
  //   {
  //     name: "Promote",
  //     selector: (row) =>
  //       row.currentClassLevel && (
  //         <>
  //           {row.currentClassLevel.name === "Level_100" && (
  //             <Link
  //               className="editLink"
  //               onClick={async () => {
  //                 try {
  //                   const res = await axios.put(
  //                     `${API_ENDPOINT}/students/promote_student_200/${row._id}`
  //                   );
  //                   if (res) {
  //                     toast.success("Student promoted successfully...", {
  //                       position: "top-right",
  //                       theme: "dark",
  //                       // toastId: successId,
  //                     });
  //                     setTimeout(() => {
  //                       window.location.reload();
  //                     }, 5000);
  //                   }
  //                 } catch (error) {
  //                   toast.error(
  //                     "Student promotion failed! Class level or section not found!",
  //                     {
  //                       position: "top-right",
  //                       theme: "light",
  //                       // toastId: successId,
  //                     }
  //                   );
  //                 }
  //               }}
  //               // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
  //             >
  //               P-L200
  //             </Link>
  //           )}
  //           {row.currentClassLevel.name === "Level_200" && (
  //             <Link
  //               className="editLink"
  //               onClick={async () => {
  //                 try {
  //                   const res = await axios.put(
  //                     `${API_ENDPOINT}/students/promote_student_300/${row._id}`
  //                   );
  //                   if (res) {
  //                     toast.success("Student promoted successfully...", {
  //                       position: "top-right",
  //                       theme: "dark",
  //                       // toastId: successId,
  //                     });
  //                     setTimeout(() => {
  //                       window.location.reload();
  //                     }, 5000);
  //                   }
  //                 } catch (error) {
  //                   toast.error(
  //                     "Student promotion failed! Class level or section not found!",
  //                     {
  //                       position: "top-right",
  //                       theme: "light",
  //                       // toastId: successId,
  //                     }
  //                   );
  //                 }
  //               }}
  //               // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
  //             >
  //               P-L300
  //             </Link>
  //           )}
  //           {row.currentClassLevel.name === "Level_300" && !row.isGraduated && (
  //             <Link
  //               className="editLink"
  //               onClick={async () => {
  //                 try {
  //                   const res = await axios.put(
  //                     `${API_ENDPOINT}/students/isgraduated/${row._id}`
  //                   );
  //                   if (res) {
  //                     toast.success("Student graduated successfully...", {
  //                       position: "top-right",
  //                       theme: "dark",
  //                       // toastId: successId,
  //                     });
  //                     setTimeout(() => {
  //                       window.location.reload();
  //                     }, 5000);
  //                   }
  //                 } catch (error) {
  //                   toast.error("Student graduation failed! Try again later.", {
  //                     position: "top-right",
  //                     theme: "light",
  //                     // toastId: successId,
  //                   });
  //                 }
  //               }}
  //             >
  //               Graduate
  //             </Link>
  //           )}
  //           {row.isGraduated && (
  //             <Link
  //               className="editLink"
  //               // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
  //             >
  //               Graduated
  //             </Link>
  //           )}
  //         </>
  //       ),
  //   },
  //   {
  //     name: "Edit",
  //     selector: (row) => (
  //       <Link
  //         className="editLink"
  //         to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row.studentId}`}
  //       >
  //         <EditIcon />
  //       </Link>
  //     ),
  //   },
  // ];

  const [inFocus, setInFocus] = useState(false);
  const allStd = `All Enrolled Students / Total = ${allStudents?.length}`;
  return (
    <div className="studentTotal" id="allStudents">
      <h1 style={{ backgroundColor: "#383838" }}>All Enrolled Students</h1>
      <form onSubmit={handleStudentSearch} className="studentSearch">
        <input
          type="text"
          value={searchStudent}
          onChange={(e) => setSearchStudent(e.target.value)}
          placeholder="Search for a student..."
          autoComplete="off"
          id="search"
        />
        <button type="submit">
          <SearchIcon className="searchIcon" />
        </button>
      </form>
      <div className="totalStudentsWrap">
        <div className="addTeacherBtn">
          <button onClick={() => navigate("/sensec/admin/student_enrollment")}>
            Add New Student +
          </button>
        </div>
        {/* <div className="searchDetails">
          {allStudents?.length === 0 &&
            location.pathname === "/sensec/admin/students" && (
              <p className="searchInfo">No Student Found!</p>
            )}
          {!searchStatus && (
            <p className="searchInfo">Total Students = {allStudents.length}</p>
          )}
          {allStudents?.length === 0 &&
            location.pathname !== "/sensec/admin/students" && (
              <p className="searchInfo">
                We couldn't find any matches for "{student_name}"
              </p>
            )}
        </div>
        {searchStatus && (
          <button
            className="goBack-btn"
            onClick={() => {
              navigate("/sensec/admin/students");
              window.location.reload();
            }}
          >
            Go back
          </button>
        )} */}
        <div className="totalStudentsCont">
          <div
            className="totalStudentsContWrap"
            onClick={() => setInFocus(false)}
          >
            <div className="batches">
              <span
                onClick={() => navigate(`/sensec/admin/students`)}
                className={!class_level && "greenBackground"}
              >
                All Enrolled Students
              </span>
              {allClassLevels.map((cLevel) => (
                <span
                  key={cLevel._id}
                  onClick={() =>
                    navigate(`/sensec/admin/students/${cLevel.name}`)
                  }
                  className={cLevel.name === class_level && "greenBackground"}
                >
                  {cLevel.name}
                </span>
              ))}
              <span
                onClick={() => navigate(`/sensec/admin/old_students/graduates`)}
                className=""
              >
                All Graduates
              </span>
            </div>
          </div>
          <h3>{!searchStudent === "" && "No result found!"}</h3>
          <>
            {/* <h3>All Enrolled Students / Total = {allStudents?.length}</h3> */}
            <DataTable
              title={allStd}
              columns={studentColumn}
              data={allStudents}
              customStyles={customStyle}
              pagination
              selectableRows
              selectableRowsHighlight
              highlightOnHover
              // subHeader
              // subHeaderComponent={
              //   <>
              //     <input
              //       type="text"
              //       value={searchStudent}
              //       onClick={() => setInFocus(true)}
              //       onChange={(e) => setSearchStudent(e.target.value)}
              //       placeholder="Search for a student..."
              //       autoComplete="off"
              //       className={inFocus ? "inFocusSearchInput" : "searchInput"}
              //     />
              //     <button type="submit">
              //       <SearchIcon
              //         className={inFocus ? "inFocusSearchIcon" : "searchIcon"}
              //       />
              //     </button>
              //   </>
              // }
            />
          </>
        </div>
      </div>
    </div>
  );
}
