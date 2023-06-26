import axios from "axios";
// import "./totalStudents.scss";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
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

export default function SearchStudent({ setNewStudent, toast, toastOptions }) {
  const { searchStatus, error, successMessage } = useSelector(
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

  const handleModalClose = () => {
    setOpen(false);
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  const handleStudentSearch = (e) => {
    e.preventDefault();
    if (searchStudent) {
      dispatch(studentSearch(searchStudent));
      navigate(`/sensec/admin/search_student?searchQuery=${searchStudent}`);
    }
  };

  // useEffect(() => {
  //   const getStudents = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${API_ENDPOINT}/students/get_all_students`
  //       );
  //       // const data = await res.json();
  //       console.log(res.data.students);
  //       setAllStudents(res.data.students);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getStudents();
  // }, []);

  // const renderStudents = students.map((std) => (
  //   <div key={std.studentId}>
  //     <h3>{std.lastName}</h3>
  //     <p>{std.courseStudy}</p>
  //   </div>
  // ));

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  // console.log(renderStudents);
  useEffect(() => {
    if (searchStatus === "rejected") {
      error.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
  }, [error, successMessage, searchStatus, toast, toastOptions]);

  return (
    <div className="studentTotal" id="allStudents">
      <h1 style={{ backgroundColor: "#383838" }}>All Enrolled Students</h1>
      <form onSubmit={handleStudentSearch} className="studentSearch">
        <input
          type="text"
          value={searchStudent}
          onChange={(e) => setSearchStudent(e.target.value)}
          placeholder="Search for a student..."
          id="search"
        />
        <button type="submit">
          <SearchIcon className="searchIcon" />
        </button>
      </form>
      <button onClick={() => dispatch(fetchStudents())}>Students</button>
      {/* <p>Total Student is {allStudents.length}</p> */}
      {/* <div>{renderStudents}</div> */}
      <div className="totalStudentsWrap">
        <div className="totalStudentsCont">
          <div className="studentWrapper">
            {allStudents.length === 0 &&
              location.pathname === "/sensec/admin/search_student" && (
                <p>No Student Found</p>
              )}
            {allStudents.length === 0 &&
              location.pathname !== "/sensec/admin/search_student" && (
                <p>We couldn't find any matches for "{searchQuery}"</p>
              )}
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
          </div>
        </div>
      </div>
    </div>
  );
}
