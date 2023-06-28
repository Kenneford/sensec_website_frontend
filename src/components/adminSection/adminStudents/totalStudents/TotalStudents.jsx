import axios from "axios";
import "./totalStudents.scss";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { format } from "timeago.js";
import EditButton from "../../../editButton/EditButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  getStudentInfo,
  studentSearch,
} from "../../../../features/student/studentsSlice";
import { getAllStudents } from "../../../../features/student/studentsSlice";
import { getAllStaffs } from "../../../../features/staff/staffSlice";

const API_ENDPOINT = "http://localhost:7000/api";

export default function TotalStudents({ setNewStudent, toast, toastOptions }) {
  const { fetchingStatus, searchStatus, error, successMessage } = useSelector(
    (state) => state.student
  );
  const [searchStudent, setSearchStudent] = useState("");
  const dispatch = useDispatch();
  const allStudents = useSelector(getAllStudents);
  const studentInfo = useSelector(getStudentInfo);
  const staffs = useSelector(getAllStaffs);
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  // const [allStudents, setAllStudents] = useState("");
  // const students = useSelector(getStudents)

  // console.log(getAllStudents);
  // console.log(studentss);
  console.log(searchStudent);
  console.log(staffs);
  console.log(studentInfo);
  console.log(allStudents);

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
  }, [dispatch]);
  // console.log(renderStudents);
  useEffect(() => {
    if (fetchingStatus === "rejected") {
      error.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (searchStatus === "rejected") {
      error.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    } // if (fetchingStatus === "success") {
    //   // navigate("/sensec/admin/all_students");
    //   toast.success(successMessage, {
    //     position: "top-right",
    //     theme: "dark",
    //     // toastId: successId,
    //   });
    // }
  }, [
    error,
    successMessage,
    searchStatus,
    fetchingStatus,
    toast,
    toastOptions,
  ]);

  const column = [
    {
      name: "Image",
      selector: (row) =>
        row.profilePicture ? (
          <img className="studentImg" src={row.profilePicture} alt="" />
        ) : (
          "none"
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
      name: "Course",
      selector: (row) => (row.courseStudy ? row.courseStudy : "Unknown"),
    },
    { name: "Student-ID", selector: (row) => row.studentId, sortable: true },
    { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
    { name: "Enrolled Date", selector: (row) => row.registedDate },
    {
      name: "Level",
      selector: (row) =>
        row.level ? (
          <div
            className={
              row.level === "1"
                ? "firstYearTag"
                : row.level === "2"
                ? "secondYearTag"
                : "thirdYearTag"
            }
            title={
              row.level === "1"
                ? "1st Year"
                : row.level === "2"
                ? "2nd Year"
                : "3rd Year"
            }
          ></div>
        ) : (
          "Unknown"
        ),
    },
  ];

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
      {/* <button onClick={() => dispatch(fetchStudents())}>Students</button> */}
      {/* <div>{renderStudents}</div> */}
      <div className="totalStudentsWrap">
        <div className="searchDetails">
          {!searchStatus && (
            <p className="searchInfo">Total Students = {allStudents.length}</p>
          )}
          {allStudents?.length === 0 &&
            location.pathname === "/sensec/admin/all_students" && (
              <p className="searchInfo">No Student Found</p>
            )}
          {allStudents?.length === 0 &&
            location.pathname !== "/sensec/admin/all_students" && (
              <p className="searchInfo">
                We couldn't find any matches for "{student_name}"
              </p>
            )}
        </div>
        {searchStatus && (
          <button
            className="goBack-btn"
            onClick={() => {
              navigate("/sensec/admin/all_students");
              window.location.reload();
            }}
          >
            Go back
          </button>
        )}
        <div className="totalStudentsCont">
          <DataTable
            columns={column}
            data={allStudents}
            customStyles={customStyle}
            pagination
          ></DataTable>
          {/* <div className="studentWrapper">
            {allStudents &&
              allStudents.map((student) => (
                <div key={student._id}>
                  <div
                    className="student"
                    onClick={() => {
                      setOpen(true);
                      // navigate(
                      //   `/sensec/admin/all_students/${student.firstName}`
                      // );
                    }}
                  >
                    <EditButton
                      setNewStudent={setNewStudent}
                      firstName={student.firstName}
                      lastName={student.lastName}
                      studentId={student._id}
                      student={student}
                    />
                    <div
                      className={
                        student.level === "1"
                          ? "firstYearTag"
                          : student.level === "2"
                          ? "secondYearTag"
                          : "thirdYearTag"
                      }
                      title={
                        student.level === "1"
                          ? "1st Year"
                          : student.level === "2"
                          ? "2nd Year"
                          : "3rd Year"
                      }
                    ></div>
                    <img src={student.profilePicture} alt="" />
                    <div className="studentInfo">
                      <div className="left">
                        <div className="info">
                          <h4>First Name:</h4>
                          <p>{student.firstName} </p>
                        </div>
                        <div className="info">
                          <h4>Date of Birth:</h4>
                          <p>{student.dateOfBirth}</p>
                        </div>
                        <div className="info">
                          <h4>Course Study:</h4>
                          <p>{student.courseStudy}</p>
                        </div>
                      </div>
                      <div className="right">
                        <div className="info">
                          <h4>Surname:</h4>
                          <p>{student.lastName}</p>
                        </div>
                        <div className="info">
                          <h4>Enrolled Date:</h4>
                          <p>{format(student.createdAt)}</p>
                        </div>
                        <div className="info">
                          <h4>ID:</h4>
                          <p>{student.studentId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {open && student.studentId ? (
                    <div className="modal" onClick={handleModalClose}>
                      <div
                        className="modalContent"
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                        <div className="studentInfo">
                          <div className="left">
                            <div className="info">
                              <h4>First Name:</h4>
                              <p>{student.firstName}</p>
                            </div>
                            <div className="info">
                              <h4>Surname:</h4>
                              <p>{student.lastName}</p>
                            </div>
                            <div className="info">
                              <h4>Date of Birth:</h4>
                              <p>{student.dateOfBirth}</p>
                            </div>
                          </div>
                          <div className="middle">
                            <div className="info">
                              <h4>Home Town:</h4>
                              <p>{student.homeTown}</p>
                            </div>
                            <div className="info">
                              <h4>Mother Tongue:</h4>
                              <p>{student.motherTongue}</p>
                            </div>
                            <div className="info">
                              <h4>Course Study:</h4>
                              <p>{student.courseStudy}</p>
                            </div>
                          </div>
                          <div className="right">
                            <div className="info">
                              <h4>Religion:</h4>
                              <p>{student.religion}</p>
                            </div>
                            <div className="info">
                              <h4>Enrolled Date:</h4>
                              <p>{student.registedDate}</p>
                            </div>
                            <div className="info">
                              <h4>ID:</h4>
                              <p>{student.studentId}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
