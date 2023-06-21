import axios from "axios";
import "./totalStudents.scss";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";
import EditButton from "../../../editButton/EditButton";
import { useSelector } from "react-redux";
import { getStudentInfo } from "../../../../features/student/studentsSlice";
import { getAllStudents } from "../../../../features/allStudents/allStudents";
import { getAllStaffs } from "../../../../features/staff/staffSlice";

const API_ENDPOINT = "http://localhost:7000/api";

export default function TotalStudents() {
  const students = useSelector(getAllStudents);
  const studentInfo = useSelector(getStudentInfo);
  const staffs = useSelector(getAllStaffs);
  const studentsState = useSelector((state) => state.student.allStudents);
  const [open, setOpen] = React.useState(false);
  const [allStudents, setAllStudents] = useState(false);
  // console.log(allStudents);
  console.log(students);
  console.log(staffs);
  console.log(studentInfo);
  console.log(studentsState);
  // const { name } = useParams();
  // console.log(name);
  // console.log(props.students);
  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT}/authusers/get_all_students`
        );
        // const data = await res.json();
        console.log(res.data.students);
        setAllStudents(res.data.students);
      } catch (err) {
        console.log(err);
      }
    };
    getStudents();
  }, []);

  const renderStudents =
    students &&
    students.map((std) => (
      <div key={std.id}>
        <h3>{std.name}</h3>
        <p>{std.course}</p>
      </div>
    ));

  return (
    <div className="studentTotal">
      <h1 style={{ backgroundColor: "#383838" }}>All Enrolled Students</h1>
      <div className="studentSearch">
        <input type="text" placeholder="Search for a student..." id="search" />
        <SearchIcon className="searchIcon" />
      </div>
      <div className="totalStudentsWrap">
        <div className="totalStudentsCont">
          <div className="studentWrapper">
            {/* <div className="studentInfo">{renderStudents}</div> */}
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
                    key={student.studentId}
                  >
                    <EditButton
                      firstName={student.firstName}
                      lastName={student.lastName}
                      studentId={student.studentId}
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
