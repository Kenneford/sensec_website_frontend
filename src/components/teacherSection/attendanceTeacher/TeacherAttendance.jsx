import React, { useEffect, useState } from "react";
import "../../adminSection/adminAttendance/adminAttendance.scss";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import {
  fetchSingleStudent,
  fetchStudents,
  getAllStudents,
  getStudentInfo,
} from "../../../features/student/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  addAttendance,
  fetchClassAttendances,
  getAllClassAttendances,
} from "../../../features/attedanceSlice/attedanceSlice";
import { getTeacherInfo } from "../../../features/teacher/teachersSlice";
import {
  fetchAllClassLevelSections,
  getAllClassLevelSections,
} from "../../../features/classLevels/classLevelSectionSlice";
import axios from "axios";
import { API_ENDPOINT } from "../../../apiEndPoint/api";

let today = new Date();
let a = today.getDate();
a--;
today.setDate(a);
const yesterday = today.toLocaleDateString();
console.log(yesterday);
export default function TeacherAttendance({ toast }) {
  const { addStatus, error, successMessage } = useSelector(
    (state) => state.attendance
  );
  const allStudents = useSelector(getAllStudents);
  const allClassLevelSections = useSelector(getAllClassLevelSections);
  const allClassAttendances = useSelector(getAllClassAttendances);
  const authTeacherInfo = useSelector(getTeacherInfo);
  // const singleStudent = useSelector(getStudentInfo);
  const [takeAttendance, setTakeAttendance] = useState(false);
  const [viewAttendance, setViewAttendance] = useState(false);

  const [date] = useState(new Date().toDateString());
  const dispatch = useDispatch();
  const { teacherId } = useParams();
  console.log(teacherId);
  // const [student, setStudent] = useState("");
  // const [check, setCheck] = useState(false);
  const [absent, setAbsent] = useState(false);
  const [studentsPresent, setStudentsPresent] = useState([]);
  const [studentsAbsent, setStudentsAbsent] = useState([]);
  const [students, setStudents] = useState([]);
  // console.log(check);
  // console.log(students);
  console.log(allClassAttendances);

  const selectedClassLevelSection = allClassLevelSections.find(
    (classSection) =>
      classSection.program.name === authTeacherInfo.program.name &&
      classSection._id === authTeacherInfo.classLevelHandling
  );

  // const selectedClassAttendance = allClassAttendances.filter(
  //   (classAttendance) => classAttendance.date === yesterday
  // );
  const [studentAttendance, setStudentAttendance] = useState({
    students: selectedClassLevelSection?.students,
    teacher: `${authTeacherInfo.id}`,
    classLevelSection: `${selectedClassLevelSection?._id}`,
  });
  // console.log(selectedClassAttendance);

  useEffect(() => {
    // keeping students data in state
    setStudentAttendance({
      students: selectedClassLevelSection?.students,
    });
  }, [selectedClassLevelSection?.students]);

  useEffect(() => {
    setStudents(selectedClassLevelSection?.students);
  }, [selectedClassLevelSection?.students]);
  // const selectedStudent = allStudents.find(
  //   (stdt) => stdt.studentId === student.studentId
  // );

  // console.log(student.studentId);
  console.log(allClassLevelSections);
  console.log(selectedClassLevelSection);
  console.log(allStudents);
  console.log(studentAttendance);
  console.log(studentAttendance.classLevelSection);
  console.log(authTeacherInfo.gender);
  // console.log(selectedStudent);

  const handlePresentValues = (e, studentId) => {
    console.log(e.target.value);
    const { checked } = e.target;
    if (e.target.name === "selectAllPresent") {
      let selectedStudent = selectedClassLevelSection?.students.map(
        (student) => {
          return {
            ...student,
            isChecked: checked,
          };
        }
      );
      setStudents(selectedStudent);
    } else {
      if (e.target.name === "present") {
        let selectedStudent = selectedClassLevelSection?.students.map(
          (student) =>
            student.studentId === studentId
              ? { ...student, isChecked: checked }
              : student
        );
        setStudents(selectedStudent);
      }
    }
    // console.log(selectedStudent.studentId);
    // if (selectedStudent) {
    //   setStudentAttendance({
    //     ...studentAttendance,
    //     students: studentAttendance.students,
    //     teacher: `${authTeacherInfo.id}`,
    //     classLevelSection: selectedClassLevelSection?._id,
    //   });
    // }
  };
  const handleAbsentValues = (e, studentId) => {
    console.log(e.target.value);
    const { name, checked } = e.target;
    if (name === "selectAllAbsent") {
      let selectedStudent = selectedClassLevelSection?.students.map(
        (student) => {
          return { ...student, isChecked: checked };
        }
      );
      setStudents(selectedStudent);
    } else {
      let selectedStudent = selectedClassLevelSection?.students.map((student) =>
        student.studentId === studentId
          ? { ...student, isChecked: checked }
          : student
      );
      setStudents(selectedStudent);
    }
    // console.log(selectedStudent.studentId);
    // if (selectedStudent) {
    //   setStudentAttendance({
    //     ...studentAttendance,
    //     students: studentAttendance.students,
    //     teacher: `${authTeacherInfo.id}`,
    //     classLevelSection: selectedClassLevelSection?._id,
    //   });
    // }
  };
  const handleHolidayValues = (e, studentId) => {
    console.log(e.target.value);
    const { name, checked } = e.target;
    if (name === "selectAllHoliday") {
      let selectedStudent = selectedClassLevelSection?.students.map(
        (student) => {
          return { ...student, isChecked: checked };
        }
      );
      setStudents(selectedStudent);
    } else {
      let selectedStudent = selectedClassLevelSection?.students.map((student) =>
        student.studentId === studentId
          ? { ...student, isChecked: checked }
          : student
      );
      setStudents(selectedStudent);
    }
    // console.log(selectedStudent.studentId);
    // if (selectedStudent) {
    //   setStudentAttendance({
    //     ...studentAttendance,
    //     students: studentAttendance.students,
    //     teacher: `${authTeacherInfo.id}`,
    //     classLevelSection: selectedClassLevelSection?._id,
    //   });
    // }
  };

  const attendanceStatus = [
    { value: "Present" },
    { value: "Absent" },
    { value: "Holiday" },
  ];

  const handleAttendance = (e) => {
    e.preventDefault();
    console.log(studentAttendance);
    const formData = new FormData();
    // formData.append("studentId", studentAttendance.studentId);
    // formData.append("status", studentAttendance.status);
    // formData.append("teacher", studentAttendance.teacher);
    dispatch(addAttendance(studentAttendance));
    // handleAttendanceValues(e);
    // addAttendance(studentAttendance);
  };

  const handleMarkAllPresent = () => {};
  const handleMarkAllAbsent = () => {};
  const handleMarkAllHoliday = () => {};
  useEffect(() => {
    if (addStatus === "rejected") {
      error.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (addStatus === "success") {
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [error, successMessage, addStatus, toast]);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchAllClassLevelSections());
    dispatch(fetchClassAttendances());
  }, [dispatch]);

  return (
    <div>
      <h1>Students Attendance</h1>
      <div className="attendanceWrap">
        <div className="topAttendance">
          <div className="takeViewAttendance">
            {takeAttendance ? (
              <div className="textView">
                <AccessTimeFilledIcon className="attIcons" />
                <div className="text">Take Attendance</div>
              </div>
            ) : (
              <div className="textView">
                <CalendarMonthIcon className="attIcons" />
                <div className="actionBtnView">View Attendance</div>
              </div>
            )}
            {!takeAttendance ? (
              <div
                className="actionWrap"
                onClick={() =>
                  setTakeAttendance(true, setViewAttendance(false))
                }
              >
                <AccessTimeFilledIcon className="attIcons" />
                <div className="text">Take Attendance</div>
              </div>
            ) : (
              <div
                className="actionWrap"
                onClick={() =>
                  setViewAttendance(true, setTakeAttendance(false))
                }
              >
                <CalendarMonthIcon className="attIcons" />
                <div className="actionBtnView">View Attendance</div>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleAttendance}>
          <div className="middleAttendance">
            <div className="manageAttendance">
              <h3>Daily Students Attendance Recordings</h3>
              <div className="flex4">
                <div className="classlevelInfo">
                  <h4>Class Level:</h4>
                  <p>
                    {selectedClassLevelSection?.classLevel.name ===
                      "Level_100" && "Level 100"}
                  </p>
                  <p>
                    {selectedClassLevelSection?.classLevel.name ===
                      "Level_200" && "Level 200"}
                  </p>
                  <p>
                    {selectedClassLevelSection?.classLevel.name ===
                      "Level_300" && "Level 300"}
                  </p>
                </div>
                <div className="classlevelInfo">
                  <h4>Class Section:</h4>
                  <p>{selectedClassLevelSection?.sectionName}</p>
                </div>
                <div className="classlevelInfo">
                  <h4>Class Teacher:</h4>
                  <p>
                    {authTeacherInfo.gender === "Male"
                      ? "Mr."
                      : authTeacherInfo.gender === "Female"
                      ? "Mrs."
                      : ""}{" "}
                    {selectedClassLevelSection?.currentTeacher?.fullName}
                  </p>
                </div>
                <div className="attendanceDate">
                  <h4>Date:</h4>
                  <p>{date}</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="manageActionWrap">
          <button className="manageActionBtn">Manage Attendance</button>
        </div> */}
          {takeAttendance && (
            <div className="attendanceTable">
              <table>
                <thead>
                  <tr>
                    <th className="alignHeaderLeft">Image</th>
                    <th className="alignHeaderLeft">First Name</th>
                    <th className="alignHeaderLeft">Surname</th>
                    <th className="alignHeaderLeft">Student-ID</th>
                    <th className="alignHeaderLeft">Program</th>
                    <th className="alignHeaderLeft">
                      <div className="statusWrap">
                        <p>Status:</p>
                        <div className="status">
                          <div className="statusActionBtn">
                            {/* <CheckIcon className="statusIcons" /> */}
                            <input
                              type="checkbox"
                              // name={"status"}
                              name={"selectAllPresent"}
                              // value={"Present"}
                              onChange={handlePresentValues}
                              style={{ outline: "none" }}
                              // checked={studentAttendance.status === "Present"}
                            />
                            <label htmlFor="present">Mark All Present</label>
                            {/* <button onClick={handleMarkAllPresent}>
                              Mark All Present
                            </button> */}
                          </div>
                          <div className="statusActionBtn">
                            {/* <CloseIcon className="statusIcons" /> */}
                            <input
                              type="checkbox"
                              // name={"status"}
                              name={"selectAllAbsent"}
                              // value={"Present"}
                              onChange={handleAbsentValues}
                              style={{ outline: "none" }}
                              // checked={studentAttendance.status === "Present"}
                            />
                            <label htmlFor="absent">Mark All Absent</label>
                          </div>
                          <div className="statusActionBtn">
                            {/* <HolidayVillageIcon className="statusIcons" /> */}
                            <input
                              type="checkbox"
                              // name={"status"}
                              name={"selectAllHoliday"}
                              // value={"Present"}
                              onChange={handleHolidayValues}
                              style={{ outline: "none" }}
                              // checked={studentAttendance.status === "Present"}
                            />
                            <label htmlFor="holiday">Mark All Holiday</label>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                {students?.map((student) => {
                  return (
                    <tbody key={student.studentId}>
                      <tr>
                        <td>
                          <img src={student.profilePicture} alt="" />
                        </td>
                        <td className="alignTextLeft">{student.firstName}</td>
                        <td className="alignTextLeft">{student.lastName}</td>
                        <td className="alignTextLeft">{student.studentId}</td>
                        <td className="alignTextLeft">
                          {student.program?.name}
                        </td>
                        {/* <td
                          className="alignTextLeft statusFlex"
                          // style={{
                          //   display: "flex",
                          //   gap: "1rem",
                          //   padding: "1rem",
                          // }}
                        >
                          {attendanceStatus.map((status) => (
                            <div className="statusValueWrap" key={status.value}>
                              <div className="statusValue">
                                <input
                                  type="checkbox"
                                  name="status"
                                  value={status.value}
                                  onChange={ =>
                                    handleAttendanceValues(e, student.studentId)
                                  }
                                  style={{ outline: "none" }}
                                  checked={
                                    studentAttendance.status === status.value
                                  }
                                />
                                <label htmlFor="present">{status.value}</label>
                              </div>
                            </div>
                            // <p key={status.value}>{status.value}</p>
                          ))}
                        </td> */}
                        <td className="alignTextLeft">
                          <div className="statusValueWrap">
                            <div className="statusValue">
                              <input
                                type="checkbox"
                                // name={"status"}
                                name={"present"}
                                value={"Present"}
                                onChange={(e) =>
                                  handlePresentValues(e, student.studentId)
                                }
                                style={{ outline: "none" }}
                                checked={student?.isChecked || false}
                              />
                              <label htmlFor="present">Present</label>
                            </div>
                            <div className="statusValue">
                              <input
                                type="checkbox"
                                // name="status"
                                name={"absent"}
                                value={"Absent"}
                                onChange={(e) =>
                                  handleAbsentValues(e, student.studentId)
                                }
                                style={{ outline: "none" }}
                                checked={student?.isChecked || false}
                              />
                              <label htmlFor="absent">Absent</label>
                            </div>
                            <div className="statusValue">
                              <input
                                type="checkbox"
                                // name="status"
                                name={"holiday"}
                                value={"Holiday"}
                                onChange={(e) =>
                                  handleHolidayValues(e, student.studentId)
                                }
                                style={{ outline: "none" }}
                                checked={student?.isChecked || false}
                              />
                              <label htmlFor="holiday">Holiday</label>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <div className="saveAttendance">
                <div className="date">
                  <h4>Attendance Date:</h4>
                  <p> {date}</p>
                </div>
                <button type="submit">Save Attendance</button>
              </div>
            </div>
          )}
          {viewAttendance && (
            <div className="attendanceTable">
              <table>
                <thead>
                  <tr>
                    <th className="alignHeaderLeft">Image</th>
                    <th className="alignHeaderLeft">First Name</th>
                    <th className="alignHeaderLeft">Surname</th>
                    <th className="alignHeaderLeft">Student-ID</th>
                    <th className="alignHeaderLeft">Program</th>
                    <th className="alignHeaderLeft">
                      <p>Status:</p>
                    </th>
                  </tr>
                </thead>
                {allClassAttendances &&
                  allClassAttendances?.map((att) => {
                    return (
                      <tbody key={att.student.studentId}>
                        <tr>
                          <td>
                            <img src={att.student.profilePicture} alt="" />
                          </td>
                          <td className="alignTextLeft">
                            {att.student.firstName}
                          </td>
                          <td className="alignTextLeft">
                            {att.student.lastName}
                          </td>
                          <td className="alignTextLeft">
                            {att.student.studentId}
                          </td>
                          <td className="alignTextLeft">
                            {att.student.program?.name}
                          </td>
                          <td className="alignTextLeft">
                            <div className="statusValueWrap">
                              <div className="statusValue">{att.status}</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
              <div className="saveAttendance">
                <div className="date">
                  <h4>Attendance Date:</h4>
                  <p> {date}</p>
                </div>
                <button type="submit">Save Attendance</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
