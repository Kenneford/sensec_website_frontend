import "./totalStudents.scss";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  studentSearch,
  getAllStudents,
  fetchGraduates,
  getAllGraduates,
  searchOldStudent,
} from "../../../../features/student/studentsSlice";
import { graduatesColumn } from "../../../../options/options";
import {
  fetchClassLevels,
  getAllClassLevels,
} from "../../../../features/classLevels/classLevelsSlice";

export default function OldStudents({ toast, toastOptions }) {
  const {
    fetchingStudentStatus,
    searchStatus,
    studentError,
    studentSuccessMessage,
  } = useSelector((state) => state.student);
  const [searchStudent, setSearchStudent] = useState("");
  const dispatch = useDispatch();
  const { graduates } = useParams();
  const allStudents = useSelector(getAllStudents);
  const allGraduates = useSelector(getAllGraduates);
  const allClassLevels = useSelector(getAllClassLevels);

  const [filteredStudents, setFilteredStudents] = useState(allGraduates);

  const navigate = useNavigate();
  console.log(searchStudent);

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
      dispatch(searchOldStudent(searchStudent));
      navigate(
        `/sensec/admin/old_students/search_student?student_name=${searchStudent}`
      );
    }
  };

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchClassLevels());
    dispatch(fetchGraduates());
  }, [dispatch]);

  useEffect(() => {
    setFilteredStudents(filteredStudents);
  }, [filteredStudents]);

  useEffect(() => {
    const studentsFiltered = allGraduates?.filter((graduate) => {
      return graduate.lastName.toLowerCase().match(searchStudent.toLowerCase());
    });
    setFilteredStudents(studentsFiltered);
  }, [allGraduates, searchStudent]);

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
    }
  }, [
    studentError,
    studentSuccessMessage,
    searchStatus,
    fetchingStudentStatus,
    toast,
    toastOptions,
  ]);

  const oldStd = `All Graduates / Total = 
              ${allGraduates?.length}`;
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
            <p className="searchInfo">Total Students = {allGraduates.length}</p>
          )}
          {allGraduates?.length === 0 &&
            location.pathname === `/sensec/admin/old_students/${graduates}` && (
              <p className="searchInfo">No Student Found</p>
            )}
          {allGraduates?.length === 0 &&
            location.pathname !== `/sensec/admin/old_students/${graduates}` && (
              <p className="searchInfo">
                We couldn't find any matches for "{student_name}"
              </p>
            )}
        </div>
        {searchStatus && (
          <button
            className="goBack-btn"
            onClick={() => {
              navigate(`/sensec/admin/old_students/${graduates}`);
              window.location.reload();
            }}
          >
            Go back
          </button>
        )}
        <div className="totalStudentsCont">
          <div className="totalStudentsContWrap">
            <div className="batches">
              <span
                onClick={() => navigate(`/sensec/admin/students`)}
                className=""
              >
                All Enrolled Students
              </span>
              {allClassLevels.map((cLevel) => (
                <span
                  key={cLevel._id}
                  onClick={() =>
                    navigate(`/sensec/admin/students/${cLevel.name}`)
                  }
                  className=""
                >
                  {cLevel.name}
                </span>
              ))}
              <span
                onClick={() => navigate(`/sensec/admin/old_students/graduates`)}
                className={graduates && "greenBackground"}
              >
                All Graduates
              </span>
            </div>
          </div>
          <>
            {/* <h3>All Graduates / Total = {allGraduates?.length}</h3> */}
            <DataTable
              title={oldStd}
              columns={graduatesColumn}
              data={filteredStudents}
              customStyles={customStyle}
              pagination
            />
          </>
        </div>
      </div>
    </div>
  );
}
