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

export default function TeacherAttendance() {
  const allStudents = useSelector(getAllStudents);
  const singleStudent = useSelector(getStudentInfo);
  const [takeAttendance, setTakeAttendance] = useState(false);
  const [viewAttendance, setViewAttendance] = useState(false);

  const [date] = useState(new Date().toDateString());
  const dispatch = useDispatch();
  const [students, setStudents] = useState(useSelector(getAllStudents));
  const [studentAttendance, setStudentAttendance] = useState({
    student: "",
    status: "",
  });

  console.log(allStudents);
  console.log(students);
  console.log(singleStudent);
  console.log(studentAttendance);

  const handleInputValues = (e) => {
    setStudentAttendance({
      ...studentAttendance,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchSingleStudent());
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
        <form>
          <div className="middleAttendance">
            <div className="manageAttendance">
              <h3>Daily Students Attendance Recordings</h3>
              <div className="flex3">
                <div className="classlevel">
                  <h4>Class Level:</h4>
                  <p>100</p>
                </div>
                <div className="classSection">
                  <h4>Class Section:</h4>
                  <p>A</p>
                </div>
                <div className="attendanceDate">
                  <h4>Date:</h4>
                  <input type="text" value={date} />
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
                <tr>
                  <th className="alignTextLeft">Image</th>
                  <th className="alignTextLeft">First Name</th>
                  <th className="alignTextLeft">Surname</th>
                  <th className="alignTextLeft">Student-ID</th>
                  <th className="alignTextLeft">Program</th>
                  <th className="alignTextLeft">
                    <div className="statusWrap">
                      <p>Status:</p>
                      <div className="status">
                        <div className="statusActionBtn">
                          <CheckIcon className="statusIcons" />
                          <button>Mark All Present</button>
                        </div>
                        <div className="statusActionBtn">
                          <CloseIcon className="statusIcons" />
                          <button>Mark All Absent</button>
                        </div>
                        <div className="statusActionBtn">
                          <HolidayVillageIcon className="statusIcons" />
                          <button>Mark All Holiday</button>
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
                {allStudents.map((student) => (
                  <tr key={student._id}>
                    <td>
                      <img src={student.profilePicture} alt="" />
                    </td>
                    <td className="alignTextLeft">{student.firstName}</td>
                    <td className="alignTextLeft">{student.lastName}</td>
                    <td className="alignTextLeft">{student.studentId}</td>
                    <td className="alignTextLeft">{student.program.name}</td>
                    <td className="alignTextLeft">
                      <div className="statusValueWrap">
                        <div className="statusValue">
                          <input
                            type="radio"
                            name="status"
                            value={"present"}
                            onChange={(e) => handleInputValues(e, student._id)}
                            style={{ outline: "none" }}
                            checked={studentAttendance.status === "present"}
                          />
                          <label htmlFor="present">Present</label>
                        </div>
                        <div className="statusValue">
                          <input
                            type="radio"
                            name="status"
                            value={"absent"}
                            onChange={(e) => handleInputValues(e, student._id)}
                            style={{ outline: "none" }}
                            checked={studentAttendance.status === "absent"}
                          />
                          <label htmlFor="absent">Absent</label>
                        </div>
                        <div className="statusValue">
                          <input
                            type="radio"
                            name="status"
                            value={"holiday"}
                            onChange={(e) => handleInputValues(e, student._id)}
                            style={{ outline: "none" }}
                            checked={studentAttendance.status === "holiday"}
                          />
                          <label htmlFor="holiday">Holiday</label>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
              <div className="saveAttendance">
                <div className="date">
                  <h4>Attendance Date:</h4>
                  <p> {date}</p>
                </div>
                <button>Save Attendance</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
