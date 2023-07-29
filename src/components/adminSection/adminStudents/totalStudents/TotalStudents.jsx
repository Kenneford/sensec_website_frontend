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
  getAllStudents,
} from "../../../../features/student/studentsSlice";
import { getAllStaffs } from "../../../../features/staff/staffSlice";
import { studentColumn } from "../../../../options/options";
import {
  fetchClassLevel100,
  fetchClassLevel200,
  fetchClassLevel300,
  fetchClassLevels,
  getAllClassLevels,
  getClassLevel100,
  getClassLevel200,
  getClassLevel300,
} from "../../../../features/classLevels/classLevelsSlice";

const API_ENDPOINT = "http://localhost:7000/api";

export default function TotalStudents({ setNewStudent, toast, toastOptions }) {
  const {
    fetchingStudentStatus,
    searchStatus,
    studentError,
    studentSuccessMessage,
  } = useSelector((state) => state.student);
  // const { batch } = useParams();
  const [searchStudent, setSearchStudent] = useState("");
  const dispatch = useDispatch();
  const allStudents = useSelector(getAllStudents);
  const studentInfo = useSelector(getStudentInfo);
  const staffs = useSelector(getAllStaffs);
  const allClassLevels = useSelector(getAllClassLevels);
  const classLevel100 = useSelector(getClassLevel100);
  const classLevel200 = useSelector(getClassLevel200);
  const classLevel300 = useSelector(getClassLevel300);
  const [level100, setLevel100] = useState(false);
  const [level200, setLevel200] = useState(false);
  const [level300, setLevel300] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  // const [allStudents, setAllStudents] = useState("");
  // const students = useSelector(getStudents)

  // console.log(getAllStudents);
  // console.log(studentss);
  console.log(level100);
  console.log(searchStudent);
  console.log(staffs);
  console.log(studentInfo);
  console.log(allStudents);
  console.log(allClassLevels);
  console.log(classLevel100);

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
  const batch = query.get("batch");
  const location = useLocation();

  const selectedBatch = allClassLevels.find((c) => c._id === batch);

  // const selectedStudent = allStudents.find(
  //   (std) => std.studentId === studentId.studentId
  // );
  const handleFirstYears = () => {
    setLevel100(!level100, setLevel200(false), setLevel300(false));
    if (!level100) {
      navigate(`/sensec/admin/students?batch=1st_Years`);
    } else {
      navigate(`/sensec/admin/students`);
    }
  };
  const handleSecondYears = () => {
    setLevel200(!level200, setLevel100(false), setLevel300(false));
    if (!level200) {
      navigate(`/sensec/admin/students?batch=2nd_Years`);
    } else {
      navigate(`/sensec/admin/students`);
    }
  };
  const handleThirdYears = () => {
    setLevel300(!level300, setLevel100(false), setLevel200(false));
    if (!level300) {
      navigate(`/sensec/admin/students?batch=3rd_Years`);
    } else {
      navigate(`/sensec/admin/students`);
    }
  };
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
    dispatch(fetchClassLevel100());
    dispatch(fetchClassLevel200());
    dispatch(fetchClassLevel300());
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
    if (searchStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    // if (fetchingStudentStatus === "success") {
    //   // navigate("/sensec/admin/students");
    //   toast.success(studentSuccessMessage, {
    //     position: "top-right",
    //     theme: "dark",
    //     // toastId: successId,
    //   });
    // }
  }, [
    studentError,
    studentSuccessMessage,
    searchStatus,
    fetchingStudentStatus,
    toast,
    toastOptions,
  ]);

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
        <div className="addTeacherBtn">
          <button onClick={() => navigate("/sensec/admin/student_enrollment")}>
            Add New Student +
          </button>
        </div>
        <div className="searchDetails">
          {!searchStatus && (
            <p className="searchInfo">Total Students = {allStudents.length}</p>
          )}
          {allStudents?.length === 0 &&
            location.pathname === "/sensec/admin/students" && (
              <p className="searchInfo">No Student Found</p>
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
          {allStudents.length !== 0 && (
            <div className="batches">
              <span
                onClick={handleFirstYears}
                className={level100 && "greenBackground"}
              >
                1st Years
              </span>
              <span
                onClick={handleSecondYears}
                className={level200 && "greenBackground"}
              >
                2nd Years
              </span>
              <span
                onClick={handleThirdYears}
                className={level300 && "greenBackground"}
              >
                3rd Years
              </span>
            </div>
          )}
          {level100 ? (
            <>
              <h3>Level 100 Students / Total = {classLevel100.length}</h3>
              <DataTable
                columns={studentColumn}
                data={classLevel100}
                customStyles={customStyle}
                pagination
              />
            </>
          ) : level200 ? (
            <>
              <h3>Level 200 Students / Total = {classLevel200.length}</h3>
              <DataTable
                columns={studentColumn}
                data={classLevel200}
                customStyles={customStyle}
                pagination
              />
            </>
          ) : level300 ? (
            <>
              <h3>Level 300 Students / Total = {classLevel300.length}</h3>
              <DataTable
                columns={studentColumn}
                data={classLevel300}
                customStyles={customStyle}
                pagination
              />
            </>
          ) : (
            <DataTable
              columns={studentColumn}
              data={allStudents}
              customStyles={customStyle}
              pagination
            />
          )}
          {/* <div className="studentWrapper">
            {allStudents &&
              allStudents.map((student) => (
                <div key={student._id}>
                  <div
                    className="student"
                    onClick={() => {
                      setOpen(true);
                      // navigate(
                      //   `/sensec/admin/students/${student.firstName}`
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
