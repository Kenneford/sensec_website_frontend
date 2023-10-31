import React, { useEffect, useState } from "react";
import "./adminStudentsAttendance.scss";
import { useParams } from "react-router-dom";
import {
  fetchSingleStudentAttendance,
  fetchStudentAbsentAttendance,
  fetchStudentHolidayAttendance,
  fetchStudentPresentAttendance,
  getSingleStudentAttendance,
  getStudentAbsentAttendance,
  getStudentHolidayAttendance,
  getStudentPresentAttendance,
} from "../../../../features/attedanceSlice/attedanceSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleStudent,
  getStudentInfo,
} from "../../../../features/student/studentsSlice";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  fetchAllClassLevelSections,
  getAllClassLevelSections,
} from "../../../../features/classLevels/classLevelSectionSlice";
import { classLevelOptions } from "../../../../options/options";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export default function AdminStudentsAttendance() {
  const studentInfo = useSelector(getStudentInfo);
  console.log(studentInfo);
  //   const allClassLevelSections = useSelector(getAllClassLevelSections);
  const allStudentAttendance = useSelector(getSingleStudentAttendance);
  const allStudentPresentAttendance = useSelector(getStudentPresentAttendance);
  const allStudentAbsentAttendance = useSelector(getStudentAbsentAttendance);
  const allStudentHolidayAttendance = useSelector(getStudentHolidayAttendance);

  const pieData = [
    {
      name: "Presents",
      value: allStudentPresentAttendance.length,
      color: "#00C49F",
    },
    {
      name: "Absents",
      value: allStudentAbsentAttendance.length,
      color: "#ff6347",
    },
    {
      name: "Holidays",
      value: allStudentHolidayAttendance.length,
      color: "#0088FE",
    },
  ];
  const COLORS = ["#00C49F", "#ff6347", "#0088FE"];
  const totalAttendances = allStudentAttendance;
  const weekLyPercentage = (totalAttendances.length * 100) / 10 + 65;
  const presentPercentage =
    (allStudentPresentAttendance.length / totalAttendances.length) * 100;
  const absentPercentage =
    (allStudentAbsentAttendance.length / totalAttendances.length) * 100;
  const holidayPercentage =
    (allStudentHolidayAttendance.length / totalAttendances.length) * 100;

  const { studentId } = useParams();
  const dispatch = useDispatch();
  const date = new Date().toLocaleDateString();

  const [searchAttendance, setSearchAttendance] = useState(false);
  const [viewAttendance, setViewAttendance] = useState(false);
  const [viewChart, setViewChart] = useState(false);
  const [viewAllPresents, setViewAllPresents] = useState(false);
  const [viewAllAbsents, setViewAllAbsents] = useState(false);
  const [viewAllHolidays, setViewAllHolidays] = useState(false);
  const [selectedStudent, setselectedStudent] = useState(studentInfo);
  console.log(selectedStudent);

  useEffect(() => {
    setselectedStudent(selectedStudent);
  }, [selectedStudent]);
  useEffect(() => {
    dispatch(fetchAllClassLevelSections());
    dispatch(fetchSingleStudent(studentId));
    dispatch(fetchSingleStudentAttendance(studentId));
    dispatch(fetchStudentAbsentAttendance(studentId));
    dispatch(fetchStudentPresentAttendance(studentId));
    dispatch(fetchStudentHolidayAttendance(studentId));
  }, [dispatch, studentId]);

  return (
    <>
      <h1 className="atth1">Attendance Data</h1>
      <div className="topAttendance">
        <div className="takeViewAttendance">
          {searchAttendance ? (
            <div className="textView">
              <SearchIcon className="attIcons" />
              <div className="text">Search Attendance</div>
            </div>
          ) : (
            <div className="textView">
              <CalendarMonthIcon className="attIcons" />
              <div className="actionBtnView">View Attendance</div>
            </div>
          )}
          {!searchAttendance ? (
            <div
              className="actionWrap"
              onClick={() =>
                setSearchAttendance(true, setViewAttendance(false))
              }
            >
              <SearchIcon className="attIcons" />
              <div className="text">Search Attendance</div>
            </div>
          ) : (
            <div
              className="actionWrap"
              onClick={() =>
                setViewAttendance(true, setSearchAttendance(false))
              }
            >
              <CalendarMonthIcon className="attIcons" />
              <div className="actionBtnView">View Attendance</div>
            </div>
          )}
        </div>
      </div>
      {!viewAttendance && !searchAttendance && (
        <>
          {!viewChart ? (
            <div className="middleAttendance">
              <div className="manageAttendance">
                <h3>Your Daily Attendance Recordings</h3>
                <div className="flex4Wrap">
                  <div className="classlevelInfo">
                    <h4>Class Level:</h4>
                    <p>
                      {studentInfo.currentClassLevelSection?.label ===
                        "Level_100" && "Level 100"}
                    </p>
                    <p>
                      {studentInfo.currentClassLevelSection?.label ===
                        "Level_200" && "Level 200"}
                    </p>
                    <p>
                      {studentInfo.currentClassLevelSection?.label ===
                        "Level_300" && "Level 300"}
                    </p>
                  </div>
                  <div className="classlevelInfo">
                    <h4>Class Section:</h4>
                    <p>{studentInfo.currentClassLevelSection?.sectionName}</p>
                  </div>
                  <div className="classlevelInfo">
                    <h4>Class Teacher:</h4>
                    <p>
                      {selectedStudent.classTeacher?.gender === "Male"
                        ? "Mr."
                        : selectedStudent.classTeacher?.gender === "Female"
                        ? "Mrs."
                        : ""}{" "}
                      {selectedStudent.classTeacher?.fullName}
                    </p>
                  </div>
                  <div className="attendanceDate">
                    <h4>Date:</h4>
                    <p>{date}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="middleChartAttendance">
              <div className="manageAttendance">
                <h3>Your Chart Attendance Recordings</h3>
                <div className="flex4 chartFlex">
                  <div className="classlevelInfo">
                    <div className="chartWrap">
                      <div class="chartInfo">
                        <h4>Presents Data</h4>
                        <p>{allStudentPresentAttendance?.length} Days</p>
                        <button
                          onClick={() =>
                            setViewAllPresents(
                              !viewAllPresents,
                              setViewAllAbsents(false),
                              setViewAllHolidays(false)
                            )
                          }
                          className={
                            viewAllPresents ? "viewingAttBtn" : "viewAttBtn"
                          }
                        >
                          {viewAllPresents ? "Viewing" : "View All"}
                        </button>
                      </div>
                      <div class="chart">
                        <div class="chartLine">
                          <ResponsiveContainer width="100%" height="80%">
                            <LineChart data={data}>
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  // border: "1px solid #555",
                                  //   borderRadius: ".4rem",
                                }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 30, y: 30 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="pv"
                                stroke="#8884d8"
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div class="chartText">
                          {presentPercentage <= 44 && (
                            <p className="lessPercentage">
                              {presentPercentage.toFixed(2)}%
                            </p>
                          )}
                          {presentPercentage >= 45 &&
                            presentPercentage <= 59 && (
                              <p className="averagePercentage">
                                {presentPercentage}%
                              </p>
                            )}
                          {presentPercentage >= 60 &&
                            presentPercentage <= 100 && (
                              <p className="percentage">{presentPercentage}%</p>
                            )}
                          <p className="week">this week</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="classlevelInfo">
                    <div class="chartWrap">
                      <div class="chartInfo">
                        <h4>Absents Data</h4>
                        <p>
                          {allStudentAbsentAttendance &&
                            allStudentAbsentAttendance?.length}{" "}
                          Days
                        </p>
                        <button
                          onClick={() =>
                            setViewAllAbsents(
                              !viewAllAbsents,
                              setViewAllPresents(false),
                              setViewAllHolidays(false)
                            )
                          }
                          className={
                            viewAllAbsents ? "viewingAttBtn" : "viewAttBtn"
                          }
                        >
                          {viewAllAbsents ? "Viewing" : "View All"}
                        </button>
                      </div>
                      <div class="chart">
                        <div class="chartLine">
                          <ResponsiveContainer width="100%" height="80%">
                            <LineChart data={data}>
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  // border: "1px solid #555",
                                  //   borderRadius: ".4rem",
                                }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 30, y: 30 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="pv"
                                stroke="#8884d8"
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div class="chartText">
                          <p className="absentPercentage">
                            {absentPercentage.toFixed(2)}%
                          </p>
                          <p className="week">this week</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="classlevelInfo">
                    <div class="chartWrap">
                      <div class="chartInfo">
                        <h4>Holidays Data</h4>
                        <p>{allStudentHolidayAttendance?.length} Days</p>
                        <button
                          onClick={() =>
                            setViewAllHolidays(
                              !viewAllHolidays,
                              setViewAllAbsents(false),
                              setViewAllPresents(false)
                            )
                          }
                          className={
                            viewAllHolidays ? "viewingAttBtn" : "viewAttBtn"
                          }
                        >
                          {viewAllHolidays ? "viewing" : "View All"}
                        </button>
                      </div>
                      <div class="chart">
                        <div class="chartLine">
                          <ResponsiveContainer width="100%" height="80%">
                            <LineChart data={data}>
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  // border: "1px solid #555",
                                  //   borderRadius: ".4rem",
                                }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 30, y: 30 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="pv"
                                stroke="#8884d8"
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div class="chartText">
                          <p className="holidayPercentage">
                            {holidayPercentage.toFixed(2)}%
                          </p>
                          <p className="week">this week</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pieChart">
                    <ResponsiveContainer
                      className="pieCont"
                      width="100%"
                      height={100}
                    >
                      <PieChart>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "transparent",
                            border: "none",
                            // border: "1px solid #555",
                            //   borderRadius: ".4rem",
                          }}
                          labelStyle={{ display: "none" }}
                          position={{ x: 30, y: 30 }}
                        />
                        <Pie
                          data={pieData}
                          cy={40}
                          innerRadius={20}
                          outerRadius={40}
                          fill="#8884d8"
                          color="#fff"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="options">
                      {pieData.map((item) => (
                        <div className="option" key={item.name}>
                          <div className="title">
                            <div
                              className="dot"
                              style={{ backgroundColor: item.color }}
                            />
                            <span>{item.name}</span>
                          </div>
                          <span>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="saveAttendance">
            <button type="submit" onClick={() => setViewChart(!viewChart)}>
              {viewChart ? "Viewing Chart" : "View Chart"}
            </button>
          </div>
        </>
      )}
      {viewAttendance && !searchAttendance && (
        <>
          {!viewChart ? (
            <div className="middleAttendance">
              <div className="manageAttendance">
                <h3>Your Daily Attendance Recordings</h3>
                <div className="flex4Wrap">
                  <div className="classlevelInfo">
                    <h4>Class Level:</h4>
                    <p>
                      {studentInfo.currentClassLevelSection?.label ===
                        "Level_100" && "Level 100"}
                    </p>
                    <p>
                      {studentInfo.currentClassLevelSection?.label ===
                        "Level_200" && "Level 200"}
                    </p>
                    <p>
                      {studentInfo.currentClassLevelSection?.label ===
                        "Level_300" && "Level 300"}
                    </p>
                  </div>
                  <div className="classlevelInfo">
                    <h4>Class Section:</h4>
                    <p>{studentInfo.currentClassLevelSection?.sectionName}</p>
                  </div>
                  <div className="classlevelInfo">
                    <h4>Class Teacher:</h4>
                    <p>
                      {studentInfo.classTeacher?.gender === "Male"
                        ? "Mr."
                        : studentInfo.classTeacher?.gender === "Female"
                        ? "Mrs."
                        : ""}{" "}
                      {studentInfo.classTeacher?.fullName}
                    </p>
                  </div>
                  <div className="attendanceDate">
                    <h4>Date:</h4>
                    <p>{date}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="middleChartAttendance">
              <div className="manageAttendance">
                <h3>Your Chart Attendance Recordings</h3>
                <div className="flex4 chartFlex">
                  <div className="classlevelInfo">
                    <div className="chartWrap">
                      <div class="chartInfo">
                        <h4>Presents Data</h4>
                        <p>{allStudentPresentAttendance?.length} Days</p>
                        <button
                          onClick={() =>
                            setViewAllPresents(
                              !viewAllPresents,
                              setViewAllAbsents(false),
                              setViewAllHolidays(false)
                            )
                          }
                          className={
                            viewAllPresents ? "viewingAttBtn" : "viewAttBtn"
                          }
                        >
                          {viewAllPresents ? "Viewing" : "View All"}
                        </button>
                      </div>
                      <div class="chart">
                        <div class="chartLine">
                          <ResponsiveContainer width="100%" height="80%">
                            <LineChart data={data}>
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  // border: "1px solid #555",
                                  //   borderRadius: ".4rem",
                                }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 30, y: 30 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="pv"
                                stroke="#8884d8"
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div class="chartText">
                          {presentPercentage <= 44 && (
                            <p className="lessPercentage">
                              {presentPercentage.toFixed(2)}%
                            </p>
                          )}
                          {presentPercentage >= 45 &&
                            presentPercentage <= 59 && (
                              <p className="averagePercentage">
                                {presentPercentage}%
                              </p>
                            )}
                          {presentPercentage >= 60 &&
                            presentPercentage <= 100 && (
                              <p className="percentage">{presentPercentage}%</p>
                            )}
                          <p className="week">this week</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="classlevelInfo">
                    <div class="chartWrap">
                      <div class="chartInfo">
                        <h4>Absents Data</h4>
                        <p>
                          {allStudentAbsentAttendance &&
                            allStudentAbsentAttendance?.length}{" "}
                          Days
                        </p>
                        <button
                          onClick={() =>
                            setViewAllAbsents(
                              !viewAllAbsents,
                              setViewAllPresents(false),
                              setViewAllHolidays(false)
                            )
                          }
                          className={
                            viewAllAbsents ? "viewingAttBtn" : "viewAttBtn"
                          }
                        >
                          {viewAllAbsents ? "Viewing" : "View All"}
                        </button>
                      </div>
                      <div class="chart">
                        <div class="chartLine">
                          <ResponsiveContainer width="100%" height="80%">
                            <LineChart data={data}>
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  // border: "1px solid #555",
                                  //   borderRadius: ".4rem",
                                }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 30, y: 30 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="pv"
                                stroke="#8884d8"
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div class="chartText">
                          <p className="absentPercentage">
                            {absentPercentage.toFixed(2)}%
                          </p>
                          <p className="week">this week</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="classlevelInfo">
                    <div class="chartWrap">
                      <div class="chartInfo">
                        <h4>Holidays Data</h4>
                        <p>{allStudentHolidayAttendance?.length} Days</p>
                        <button
                          onClick={() =>
                            setViewAllHolidays(
                              !viewAllHolidays,
                              setViewAllAbsents(false),
                              setViewAllPresents(false)
                            )
                          }
                          className={
                            viewAllHolidays ? "viewingAttBtn" : "viewAttBtn"
                          }
                        >
                          {viewAllHolidays ? "viewing" : "View All"}
                        </button>
                      </div>
                      <div class="chart">
                        <div class="chartLine">
                          <ResponsiveContainer width="100%" height="80%">
                            <LineChart data={data}>
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  // border: "1px solid #555",
                                  //   borderRadius: ".4rem",
                                }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 30, y: 30 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="pv"
                                stroke="#8884d8"
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="chartText">
                          <p className="holidayPercentage">
                            {holidayPercentage.toFixed(2)}%
                          </p>
                          <p className="week">this week</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pieChart">
                    <ResponsiveContainer
                      className="pieCont"
                      width="100%"
                      height={100}
                    >
                      <PieChart>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "transparent",
                            border: "none",
                            // border: "1px solid #555",
                            //   borderRadius: ".4rem",
                          }}
                          labelStyle={{ display: "none" }}
                          position={{ x: 30, y: 30 }}
                        />
                        <Pie
                          data={pieData}
                          cy={40}
                          innerRadius={20}
                          outerRadius={40}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="options">
                      {pieData.map((item) => (
                        <div className="option" key={item.name}>
                          <div className="title">
                            <div
                              className="dot"
                              style={{ backgroundColor: item.color }}
                            />
                            <span>{item.name}</span>
                          </div>
                          <span>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="saveAttendance">
            <button type="submit" onClick={() => setViewChart(!viewChart)}>
              {viewChart ? "Viewing Chart" : "View Chart"}
            </button>
          </div>
        </>
      )}
      {searchAttendance && (
        <>
          <div className="middleAttendance">
            <div className="manageAttendance">
              <h3>Search For Attendance Recording</h3>
              <div className="flex4Wrap">
                <div className="classlevelInfo">
                  <div className="selector">
                    <label htmlFor="currentClassLevel">Class Level</label>
                    <select
                      className="select"
                      //   value={newStudent.currentClassLevel}
                      //   onChange={handleInputValues}
                      name="currentClassLevel"
                      id=""
                    >
                      {classLevelOptions.map((classLevel) => (
                        <option
                          key={classLevel.label}
                          value={classLevel.value}
                          style={{
                            backgroundColor: "#292929",
                            color: "#fff",
                          }}
                        >
                          {classLevel.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="classlevelInfo">
                  <h4>Class Section:</h4>
                  <p>{studentInfo.currentClassLevelSection?.sectionName}</p>
                </div>
                <div className="classlevelInfo">
                  <h4>Class Teacher:</h4>
                  <p>
                    {studentInfo.classTeacher?.gender === "Male"
                      ? "Mr."
                      : studentInfo.classTeacher?.gender === "Female"
                      ? "Mrs."
                      : ""}{" "}
                    {studentInfo.classTeacher?.fullName}
                  </p>
                </div>
                <div className="attendanceDate">
                  <h4>Date:</h4>
                  <p>{date}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="saveAttendance">
            <button type="submit">Search Attendance</button>
          </div>
        </>
      )}
      <div className="attendanceTable">
        {/* View All Attendances */}
        {allStudentAttendance &&
          !searchAttendance &&
          !viewAllPresents &&
          !viewAllAbsents &&
          !viewAllHolidays && (
            <table>
              <thead>
                <tr>
                  <th className="alignHeaderLeft">Date</th>
                  <th className="alignHeaderLeft">Day</th>
                  <th className="alignHeaderLeft">First Name</th>
                  <th className="alignHeaderLeft">Surname</th>
                  <th className="alignHeaderLeft">Student-ID</th>
                  <th className="alignHeaderLeft">Program</th>
                  <th className="alignHeaderLeft">
                    <p>Status:</p>
                  </th>
                </tr>
              </thead>
              {allStudentAttendance &&
                allStudentAttendance.map((att) => (
                  <tbody key={att._id}>
                    <tr>
                      <td className="alignTextLeft">{att.date}</td>
                      <td className="alignTextLeft">{att.dayOfTheWeek}</td>
                      <td className="alignTextLeft">
                        {studentInfo?.firstName}
                      </td>
                      <td className="alignTextLeft">{studentInfo?.lastName}</td>
                      <td className="alignTextLeft">
                        {studentInfo?.studentId}
                      </td>
                      <td className="alignTextLeft">
                        {studentInfo.program?.name}
                      </td>
                      <td className="alignTextLeft">
                        <div className="statusValueWrap">
                          <div className="statusValue">{att.status}</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          )}
        {/* View only Present Attendances */}
        {allStudentPresentAttendance &&
          viewAllPresents &&
          !searchAttendance && (
            <>
              <table>
                <thead>
                  <tr>
                    <th className="alignHeaderLeft">Date</th>
                    <th className="alignHeaderLeft">Day</th>
                    <th className="alignHeaderLeft">First Name</th>
                    <th className="alignHeaderLeft">Surname</th>
                    <th className="alignHeaderLeft">Student-ID</th>
                    <th className="alignHeaderLeft">Program</th>
                    <th className="alignHeaderLeft">
                      <p>Status:</p>
                    </th>
                  </tr>
                </thead>
                {allStudentPresentAttendance &&
                  allStudentPresentAttendance.map((att) => (
                    <tbody key={att._id}>
                      <tr>
                        <td className="alignTextLeft">{att.date}</td>
                        <td className="alignTextLeft">{att.dayOfTheWeek}</td>
                        <td className="alignTextLeft">
                          {studentInfo.firstName}
                        </td>
                        <td className="alignTextLeft">
                          {studentInfo.lastName}
                        </td>
                        <td className="alignTextLeft">
                          {studentInfo.studentId}
                        </td>
                        <td className="alignTextLeft">
                          {studentInfo.program?.name}
                        </td>
                        <td className="alignTextLeft">
                          <div className="statusValueWrap">
                            <div className="statusValue">{att.status}</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
              {presentPercentage === 0 && (
                <div className="noAttRecords">
                  No attendance record(s) available.
                </div>
              )}
            </>
          )}
        {/* View only Absent Attendances */}
        {allStudentAbsentAttendance && viewAllAbsents && !searchAttendance && (
          <>
            <table>
              <thead>
                <tr>
                  <th className="alignHeaderLeft">Date</th>
                  <th className="alignHeaderLeft">Day</th>
                  <th className="alignHeaderLeft">First Name</th>
                  <th className="alignHeaderLeft">Surname</th>
                  <th className="alignHeaderLeft">Student-ID</th>
                  <th className="alignHeaderLeft">Program</th>
                  <th className="alignHeaderLeft">
                    <p>Status:</p>
                  </th>
                </tr>
              </thead>
              {allStudentAbsentAttendance &&
                allStudentAbsentAttendance.map((att) => (
                  <tbody key={att._id}>
                    <tr>
                      <td className="alignTextLeft">{att.date}</td>
                      <td className="alignTextLeft">{att.dayOfTheWeek}</td>
                      <td className="alignTextLeft">{studentInfo.firstName}</td>
                      <td className="alignTextLeft">{studentInfo.lastName}</td>
                      <td className="alignTextLeft">{studentInfo.studentId}</td>
                      <td className="alignTextLeft">
                        {studentInfo.program?.name}
                      </td>
                      <td className="alignTextLeft">
                        <div className="statusValueWrap">
                          <div className="statusValue">{att.status}</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
            {absentPercentage === 0 && (
              <div className="noAttRecords">
                No attendance record(s) available.
              </div>
            )}
          </>
        )}
        {/* View only Holiday Attendances */}
        {allStudentHolidayAttendance &&
          viewAllHolidays &&
          !searchAttendance && (
            <>
              <table>
                <thead>
                  <tr>
                    <th className="alignHeaderLeft">Date</th>
                    <th className="alignHeaderLeft">Day</th>
                    <th className="alignHeaderLeft">First Name</th>
                    <th className="alignHeaderLeft">Surname</th>
                    <th className="alignHeaderLeft">Student-ID</th>
                    <th className="alignHeaderLeft">Program</th>
                    <th className="alignHeaderLeft">
                      <p>Status:</p>
                    </th>
                  </tr>
                </thead>
                {allStudentHolidayAttendance &&
                  allStudentHolidayAttendance.map((att) => (
                    <tbody key={att._id}>
                      <tr>
                        <td className="alignTextLeft">{att.date}</td>
                        <td className="alignTextLeft">{att.dayOfTheWeek}</td>
                        <td className="alignTextLeft">
                          {studentInfo.firstName}
                        </td>
                        <td className="alignTextLeft">
                          {studentInfo.lastName}
                        </td>
                        <td className="alignTextLeft">
                          {studentInfo.studentId}
                        </td>
                        <td className="alignTextLeft">
                          {studentInfo.program?.name}
                        </td>
                        <td className="alignTextLeft">
                          <div className="statusValueWrap">
                            <div className="statusValue">{att.status}</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
              {holidayPercentage === 0 && (
                <div className="noAttRecords">
                  No attendance record(s) available.
                </div>
              )}
            </>
          )}
        {searchAttendance && (
          <div className="noAttRecords">No attendance record(s) available.</div>
        )}
        {/* <div className="saveAttendance">
        <div className="date">
          <h4>Attendance Date:</h4>
          <p> {date}</p>
        </div>
        <button type="submit">Save Attendance</button>
      </div> */}
      </div>
    </>
  );
}
