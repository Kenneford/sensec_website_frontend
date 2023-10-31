import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAllClassLevelSections,
  getAllClassLevelSections,
} from "../../../features/classLevels/classLevelSectionSlice";
import { getStudentInfo } from "../../../features/student/studentsSlice";
import {
  studentColumn,
  studentCourseMatesColumn,
} from "../../../options/options";
import DataTable from "react-data-table-component";

export default function CourseMates() {
  const studentInfo = useSelector(getStudentInfo);
  const allClassLevelSections = useSelector(getAllClassLevelSections);

  const classSection = allClassLevelSections.find(
    (section) => section._id === studentInfo.currentClassLevelSection?._id
  );

  const { programName } = useParams();
  console.log(programName);
  const dispatch = useDispatch();
  const date = new Date().toLocaleDateString();

  const [courseMates, setcourseMates] = useState(classSection?.students);
  const [viewAttendance, setViewAttendance] = useState(false);
  const [viewChart, setViewChart] = useState(false);
  const [viewAllPresents, setViewAllPresents] = useState(false);
  const [viewAllAbsents, setViewAllAbsents] = useState(false);
  const [viewAllHolidays, setViewAllHolidays] = useState(false);

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

  useEffect(() => {
    // setcourseMates(courseMates);
    setcourseMates(
      classSection?.students?.filter(
        (student) => student.studentId !== studentInfo.studentId
      )
    );
  }, [classSection?.students, studentInfo.studentId]);

  useEffect(() => {
    dispatch(fetchAllClassLevelSections());
    // dispatch(fetchSingleStudentAttendance(studentId));
    // dispatch(fetchStudentAbsentAttendance(studentId));
    // dispatch(fetchStudentPresentAttendance(studentId));
    // dispatch(fetchStudentHolidayAttendance(studentId));
  }, [dispatch]);
  return (
    <div className="studentTotal" id="allStudents">
      <h1 style={{ backgroundColor: "#383838" }}>All Enrolled Students</h1>
      {/* <form onSubmit={handleStudentSearch} className="studentSearch">
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
      </form> */}
      <div className="totalStudentsWrap">
        {/* <div className="addTeacherBtn">
          <button onClick={() => navigate("/sensec/admin/student_enrollment")}>
            Add New Student +
          </button>
        </div> */}
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
          {/* <div
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
          <h3>{!searchStudent === "" && "No result found!"}</h3> */}
          <>
            {/* <h3>All Enrolled Students / Total = {allStudents?.length}</h3> */}
            <DataTable
              //   title={allStd}
              columns={studentCourseMatesColumn}
              data={courseMates}
              customStyles={customStyle}
              pagination
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
