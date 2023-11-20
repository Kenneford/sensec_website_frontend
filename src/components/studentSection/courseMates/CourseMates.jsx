import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllClassLevelSections,
  getAllClassLevelSections,
} from "../../../features/classLevels/classLevelSectionSlice";
import { studentCourseMatesColumn } from "../../../options/options";
import DataTable from "react-data-table-component";
import { getUser } from "../../../features/allUsers/AllUsersSlice";

export default function CourseMates() {
  const userInfo = useSelector(getUser);
  const allClassLevelSections = useSelector(getAllClassLevelSections);

  const classSection = allClassLevelSections.find(
    (section) => section._id === userInfo.currentClassLevelSection?._id
  );
  const dispatch = useDispatch();

  const [courseMates, setCourseMates] = useState(classSection?.students);

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
    setCourseMates(
      classSection?.students?.filter(
        (student) => student.uniqueId !== userInfo.uniqueId
      )
    );
  }, [classSection?.students, userInfo.uniqueId]);

  useEffect(() => {
    dispatch(fetchAllClassLevelSections());
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
        <div className="totalStudentsCont">
          <DataTable
            columns={studentCourseMatesColumn}
            data={courseMates}
            customStyles={customStyle}
            pagination
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}
