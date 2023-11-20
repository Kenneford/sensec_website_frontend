import "./totalStudents.scss";
import SearchIcon from "@mui/icons-material/Search";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  studentSearch,
  getAllStudents,
  getAllPendingStudents,
  fetchPendingStudents,
} from "../../../../features/student/studentsSlice";
import {
  pendingStudentsColumn,
  studentColumn,
} from "../../../../options/options";
import {
  fetchClassLevels,
  getAllClassLevels,
} from "../../../../features/classLevels/classLevelsSlice";
import {
  fetchPendingStudentsDatas,
  getAllPendingStudentsDatas,
} from "../../../../features/pendingStudents/pendingStudentsSlice";
import { HashLink } from "react-router-hash-link";
import { API_ENDPOINT } from "../../../../apiEndPoint/api";
import axios from "axios";
import { getAdminInfo } from "../../../../features/admin/adminsSlice";

export default function PendingStudents({ toast, toastOptions }) {
  const {
    fetchingPendingStudentsStatus,
    searchStatus,
    studentError,
    studentSuccessMessage,
  } = useSelector((state) => state.student);
  const { fetchingStatus, pendingStudentsDataError, successMessage } =
    useSelector((state) => state.pendingStudentsData);
  const [searchStudent, setSearchStudent] = useState("");
  const dispatch = useDispatch();
  const authAdminInfo = useSelector(getAdminInfo);
  const allStudents = useSelector(getAllStudents);
  const allClassLevels = useSelector(getAllClassLevels);
  const allPendingStudentsDatas = useSelector(getAllPendingStudentsDatas);
  const allPendingStudents = useSelector(getAllPendingStudents);

  const navigate = useNavigate();
  const { adminUniqueId } = useParams();
  console.log(adminUniqueId);
  const { class_level } = useParams();
  console.log(searchStudent);
  console.log(allStudents);
  console.log(allClassLevels);

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -150;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  const pendingStudentsColumn = [
    {
      name: "Image",
      selector: (row) =>
        row.profilePicture ? (
          <HashLink
            scroll={scrollWithOffset}
            smooth
            to={`/sensec/admin/student_info/${row.firstName}_${row.lastName}/${row.uniqueId}/#studentInfo`}
            title="View Student Info"
          >
            <img className="studentImg" src={row.profilePicture} alt="" />
          </HashLink>
        ) : (
          <HashLink
            scroll={scrollWithOffset}
            smooth
            to={`/sensec/admin/student_info/${row.firstName}_${row.lastName}/${row.uniqueId}/#studentInfo`}
            title="View Student Info"
          >
            {row.gender === "Male" && (
              <img
                className="studentImg"
                src={"/assets/maleAvatar.png"}
                alt=""
              />
            )}
            {row.gender === "Female" && (
              <img
                className="studentImg"
                src={"/assets/femaleAvatar.png"}
                alt=""
              />
            )}
            {row.gender === "" && "No Image"}
          </HashLink>
        ),
    },
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    { name: "Surname", selector: (row) => row.lastName },
    {
      name: "Date Of Birth",
      selector: (row) => (row.dateOfBirth ? row.dateOfBirth : "Unknown"),
    },
    {
      name: "Program",
      selector: (row) => (row.program ? row.program.name : "Unknown"),
    },
    { name: "Student-ID", selector: (row) => row.uniqueId, sortable: true },
    { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
    { name: "Enrolled Date", selector: (row) => row.dateEnrolled },
    {
      name: "Batch",
      selector: (row) =>
        row.academicYear
          ? `${row.academicYear.fromYear}-${row.academicYear.toYear}`
          : "Unknown",
    },
    {
      name: "Level",
      selector: (row) =>
        row.currentClassLevel && (
          <div className="tableClassLevel">
            {row.currentClassLevel.name === "Level_100" && (
              <div className="firstYearTag" title="1st Year">
                1
              </div>
            )}
            {row.currentClassLevel.name === "Level_200" && (
              <div className="secondYearTag" title="2nd Year">
                2
              </div>
            )}
            {row.currentClassLevel.name === "Level_300" && !row.isGraduated && (
              <div className="thirdYearTag" title="3rd Year">
                3
              </div>
            )}
            {row.isGraduated && (
              <div className="isGraduated" title="Graduated">
                <SchoolOutlinedIcon />
              </div>
            )}
          </div>
        ),
    },
    {
      // name: "Promote",
      selector: (row) =>
        row.pending && (
          <HashLink
            className="approveLink"
            onClick={async () => {
              try {
                const res = await axios.put(
                  `${API_ENDPOINT}/students/${adminUniqueId}/approve_pending_student/${row._id}`
                );
                if (res) {
                  toast.success(
                    "Student's application approved successfully...",
                    {
                      position: "top-right",
                      theme: "dark",
                      // toastId: successId,
                    }
                  );
                  setTimeout(() => {
                    window.location.reload();
                  }, 5000);
                }
              } catch (error) {
                toast.error("Student approval failed! Try again later", {
                  position: "top-right",
                  theme: "light",
                  // toastId: successId,
                });
              }
            }}
            // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
          >
            Approve
          </HashLink>
        ),
    },
    {
      // name: "Edit",
      selector: (row) => (
        <HashLink
          className="rejectLink"
          onClick={async () => {
            try {
              const res = await axios.delete(
                `${API_ENDPOINT}/students/reject_student_application/${row._id}`
              );
              if (res) {
                toast.success("Student disapproved successfully...", {
                  position: "top-right",
                  theme: "dark",
                  // toastId: successId,
                });
                setTimeout(() => {
                  window.location.reload();
                }, 5000);
              }
            } catch (error) {
              toast.error("Student disapproved failed! Try again later", {
                position: "top-right",
                theme: "light",
                // toastId: successId,
              });
            }
          }}
        >
          Reject
        </HashLink>
      ),
    },
  ];
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
      navigate(`/sensec/admin/search_student?student_name=${searchStudent}`);
    }
  };

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchClassLevels());
    dispatch(fetchPendingStudents());
    dispatch(fetchPendingStudentsDatas());
  }, [dispatch]);

  useEffect(() => {
    if (fetchingPendingStudentsStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (fetchingStatus === "rejected") {
      pendingStudentsDataError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (searchStatus === "rejected") {
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
    searchStatus,
    fetchingPendingStudentsStatus,
    toast,
    toastOptions,
    fetchingStatus,
    pendingStudentsDataError,
  ]);

  return (
    <div className="studentTotal" id="allStudents">
      <h1 style={{ backgroundColor: "#383838" }}>All Pending Students</h1>
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
        {/* <div className="addTeacherBtn">
          <button onClick={() => navigate("/sensec/admin/student_enrollment")}>
            Add New Student +
          </button>
        </div> */}
        <div className="searchDetails">
          {allStudents?.length === 0 &&
            location.pathname === "/sensec/admin/students" && (
              <p className="searchInfo">No Student Found!</p>
            )}
          {!searchStatus && (
            <p className="searchInfo">
              Total Pending Students = {allPendingStudents.length}
            </p>
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
        )}
        <div className="totalStudentsCont">
          <div className="totalStudentsContWrap">
            <div className="batches">
              <span
                onClick={() => navigate(`/sensec/admin/all_pending_students`)}
                className={!class_level && "greenBackground"}
              >
                All Pending Students
              </span>
              {allPendingStudentsDatas.map((pendingData) => (
                <span
                  key={pendingData._id}
                  onClick={() =>
                    navigate(
                      `/sensec/admin/all_pending_students/${pendingData.classLevel}`
                    )
                  }
                  className={
                    pendingData.classLevel === class_level && "greenBackground"
                  }
                >
                  {pendingData.classLevel}
                </span>
              ))}
            </div>
          </div>
          <>
            <h3>All Pending Students / Total = {allPendingStudents?.length}</h3>
            <DataTable
              columns={pendingStudentsColumn}
              data={allPendingStudents}
              customStyles={customStyle}
              pagination
            />
          </>
        </div>
      </div>
    </div>
  );
}
