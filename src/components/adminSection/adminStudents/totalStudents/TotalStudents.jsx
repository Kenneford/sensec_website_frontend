import "./totalStudents.scss";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  getStudentInfo,
  studentSearch,
  getAllStudents,
  fetchGraduates,
  getAllGraduates,
} from "../../../../features/student/studentsSlice";
import { getAllStaffs } from "../../../../features/staff/staffSlice";
import { graduatesColumn, studentColumn } from "../../../../options/options";
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

export default function TotalStudents({ setNewStudent, toast, toastOptions }) {
  const {
    fetchingStudentStatus,
    searchStatus,
    studentError,
    studentSuccessMessage,
  } = useSelector((state) => state.student);
  const [searchStudent, setSearchStudent] = useState("");
  const dispatch = useDispatch();
  const allStudents = useSelector(getAllStudents);
  const allGraduates = useSelector(getAllGraduates);
  const studentInfo = useSelector(getStudentInfo);
  const staffs = useSelector(getAllStaffs);
  const allClassLevels = useSelector(getAllClassLevels);
  const classLevel100 = useSelector(getClassLevel100);
  const classLevel200 = useSelector(getClassLevel200);
  const classLevel300 = useSelector(getClassLevel300);
  const [level100, setLevel100] = useState(false);
  const [level200, setLevel200] = useState(false);
  const [level300, setLevel300] = useState(false);
  const [isGraduated, setIsGraduated] = useState(false);

  const navigate = useNavigate();
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
  const location = useLocation();

  const handleFirstYears = () => {
    setLevel100(
      !level100,
      setLevel200(false),
      setLevel300(false),
      setIsGraduated(false)
    );
    if (!level100) {
      navigate(`/sensec/admin/students?batch=1st_Years`);
    } else {
      navigate(`/sensec/admin/students`);
    }
  };
  const handleSecondYears = () => {
    setLevel200(
      !level200,
      setLevel100(false),
      setLevel300(false),
      setIsGraduated(false)
    );
    if (!level200) {
      navigate(`/sensec/admin/students?batch=2nd_Years`);
    } else {
      navigate(`/sensec/admin/students`);
    }
  };
  const handleThirdYears = () => {
    setLevel300(
      !level300,
      setLevel100(false),
      setLevel200(false),
      setIsGraduated(false)
    );
    if (!level300) {
      navigate(`/sensec/admin/students?batch=3rd_Years`);
    } else {
      navigate(`/sensec/admin/students`);
    }
  };
  const handleOldStudents = () => {
    setIsGraduated(
      !isGraduated,
      setLevel100(false),
      setLevel200(false),
      setLevel300(false)
    );
    if (!isGraduated) {
      navigate(`/sensec/admin/students?old_students`);
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
    dispatch(fetchGraduates());
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
          {allStudents && (
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
              <span
                onClick={handleOldStudents}
                className={isGraduated && "greenBackground"}
              >
                Past Students
              </span>
            </div>
          )}
          {level100 && (
            <>
              <h3>Level 100 Students / Total = {classLevel100.length}</h3>
              <DataTable
                columns={studentColumn}
                data={classLevel100}
                customStyles={customStyle}
                pagination
              />
            </>
          )}{" "}
          {level200 && (
            <>
              <h3>Level 200 Students / Total = {classLevel200.length}</h3>
              <DataTable
                columns={studentColumn}
                data={classLevel200}
                customStyles={customStyle}
                pagination
              />
            </>
          )}{" "}
          {level300 && (
            <>
              <h3>Level 300 Students / Total = {classLevel300.length}</h3>
              <DataTable
                columns={studentColumn}
                data={classLevel300}
                customStyles={customStyle}
                pagination
              />
            </>
          )}
          {isGraduated && (
            <>
              <h3>Graduated Students / Total = {allGraduates.length}</h3>
              <DataTable
                columns={graduatesColumn}
                data={allGraduates}
                customStyles={customStyle}
                pagination
              />
            </>
          )}
          {allStudents &&
            !level100 &&
            !level200 &&
            !level300 &&
            !isGraduated && (
              <DataTable
                columns={studentColumn}
                data={allStudents}
                customStyles={customStyle}
                pagination
              />
            )}
        </div>
      </div>
    </div>
  );
}
