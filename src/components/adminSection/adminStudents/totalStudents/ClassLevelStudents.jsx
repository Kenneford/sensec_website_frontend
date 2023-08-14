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
} from "../../../../features/student/studentsSlice";
import { classLevelStudentsColumn } from "../../../../options/options";
import {
  fetchClassLevel100,
  fetchClassLevel200,
  fetchClassLevel300,
  fetchClassLevels,
  fetchSingleClassLevel,
  getAllClassLevels,
  getSingleClassLevel,
} from "../../../../features/classLevels/classLevelsSlice";
import {
  fetchAllClassLevelSections,
  getAllClassLevelSections,
} from "../../../../features/classLevels/classLevelSectionSlice";

export default function ClassLevelStudents({ toast, toastOptions }) {
  const {
    fetchingStudentStatus,
    searchStatus,
    studentError,
    studentSuccessMessage,
  } = useSelector((state) => state.student);
  const { fetchingSingleStatus, error, successMessage } = useSelector(
    (state) => state.classLevel
  );
  const [searchStudent, setSearchStudent] = useState("");
  const dispatch = useDispatch();
  const { class_level } = useParams();
  console.log(class_level);
  const allStudents = useSelector(getAllStudents);
  const allClassLevels = useSelector(getAllClassLevels);
  const allClassLevelSections = useSelector(getAllClassLevelSections);
  const singleClassLevel = useSelector(getSingleClassLevel);

  const selectedClassLevel = allClassLevels.map(
    (cLevel) => cLevel.name === class_level
  );

  console.log(allClassLevelSections);
  console.log(JSON.stringify(selectedClassLevel));

  const navigate = useNavigate();

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
      dispatch(studentSearch(searchStudent));
      navigate(`/sensec/admin/search_student?student_name=${searchStudent}`);
    }
  };

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchClassLevels());
    dispatch(fetchAllClassLevelSections());
    dispatch(fetchSingleClassLevel(class_level));
    dispatch(fetchClassLevel100());
    dispatch(fetchClassLevel200());
    dispatch(fetchClassLevel300());
    dispatch(fetchGraduates());
  }, [dispatch, class_level]);

  useEffect(() => {
    if (fetchingStudentStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
        })
      );
      return;
    }
    if (searchStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
        })
      );
    }
    if (studentError) {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
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
            <p className="searchInfo">
              Total Students = {singleClassLevel?.students?.length}
            </p>
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
            <div className="totalStudentsContWrap">
              <div className="batches">
                <span
                  onClick={() => navigate(`/sensec/admin/students`)}
                  className=""
                >
                  All Enrolled Students
                </span>
                {allClassLevels?.map((cLevel) => (
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
                  onClick={() =>
                    navigate(`/sensec/admin/old_students/graduates`)
                  }
                  className=""
                >
                  Past Students
                </span>
              </div>
            </div>
          )}
          <div className="classLeveSections">
            <div className="levelSections">
              {allClassLevels.map((cLevel) => (
                <span key={cLevel._id}>
                  {cLevel.name === class_level &&
                    cLevel.sections.map((c) => (
                      <p
                        key={c._id}
                        className={
                          cLevel.name === class_level && "greenBackground"
                        }
                        onClick={() =>
                          navigate(
                            `/sensec/admin/students/${cLevel.name}/${c.sectionName}_Students`
                          )
                        }
                      >
                        {c.sectionName}
                      </p>
                    ))}
                </span>
              ))}
            </div>
            <h3>
              {singleClassLevel?.name} Students / Total ={" "}
              {singleClassLevel?.students?.length}
            </h3>
          </div>
          <DataTable
            columns={classLevelStudentsColumn}
            data={singleClassLevel.students}
            customStyles={customStyle}
            pagination
          />
        </div>
      </div>
    </div>
  );
}
