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
  getAllLevel100Students,
} from "../../../../features/student/studentsSlice";
import {
  classLevelStudentsColumn,
  pendingStudentsColumn,
} from "../../../../options/options";
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
import {
  fetchPendingStudentsDatas,
  fetchSinglePendingStudentsData,
  getAllPendingStudentsDatas,
  getSinglePendingStudentsData,
} from "../../../../features/pendingStudents/pendingStudentsSlice";

export default function PendingClassLevelStudents({ toast, toastOptions }) {
  const {
    fetchingStudentStatus,
    searchStatus,
    studentError,
    studentSuccessMessage,
  } = useSelector((state) => state.student);
  const { fetchingStatus, pendingStudentsDataError, successMessage } =
    useSelector((state) => state.pendingStudentsData);
  const allPendingStudentsData = useSelector(getAllPendingStudentsDatas);

  const [searchStudent, setSearchStudent] = useState("");
  const dispatch = useDispatch();
  const { class_level } = useParams();
  console.log(class_level);
  const allStudents = useSelector(getAllStudents);
  const allClassLevels = useSelector(getAllClassLevels);
  const allLevel100Students = useSelector(getAllLevel100Students);
  const allClassLevelSections = useSelector(getAllClassLevelSections);
  const singlePendingStudentsData = useSelector(getSinglePendingStudentsData);

  const selectedClassLevel = allClassLevels.map(
    (cLevel) => cLevel.name === class_level
  );

  console.log(allClassLevelSections);
  console.log(JSON.stringify(selectedClassLevel));
  console.log(allLevel100Students);
  console.log(singlePendingStudentsData);

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
    dispatch(fetchPendingStudentsDatas());
    dispatch(fetchSinglePendingStudentsData(class_level));
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
      <h1 style={{ backgroundColor: "#383838" }}>Pending Students Data</h1>
      <form onSubmit={handleStudentSearch} className="studentSearch">
        <input
          type="text"
          value={searchStudent}
          onChange={(e) => setSearchStudent(e.target.value)}
          placeholder="Search for a student..."
          autoComplete="off"
          id="search"
        />
        <button type="submit ">
          <SearchIcon className="searchIcon" />
        </button>
      </form>
      <div className="totalStudentsWrap pendingTotalStudentsWrap">
        <div className="searchDetails">
          {!searchStatus && (
            <p className="searchInfo ">
              Total Students = {singlePendingStudentsData.students?.length}
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
          {allPendingStudentsData && (
            <div className="totalStudentsContWrap">
              <div className="batches">
                <span
                  onClick={() => navigate(`/sensec/admin/all_pending_students`)}
                  className=""
                >
                  All Pending Students
                </span>
                {allPendingStudentsData?.map((pendingData) => (
                  <span
                    key={pendingData._id}
                    onClick={() =>
                      navigate(
                        `/sensec/admin/all_pending_students/${pendingData.classLevel}`
                      )
                    }
                    className={
                      pendingData.classLevel === class_level &&
                      "greenBackground"
                    }
                  >
                    {pendingData.classLevel}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* <div className="classLeveSections">
            <div className="levelSections">
              {allPendingStudentsData.map((pendingData) => (
                <span key={pendingData._id}>
                  {pendingData.classLevel === class_level &&
                    pendingData.students.map((c) => (
                      <p
                        key={c._id}
                        className={
                          pendingData.classLevel === class_level &&
                          "greenBackground"
                        }
                        onClick={() =>
                          navigate(
                            `/sensec/admin/all_pending_students/${pendingData.classLevel}`
                          )
                        }
                      >
                        {c.fullName}
                      </p>
                    ))}
                </span>
              ))}
            </div>
            <h3>
              {pendingStudentsColumn.classLevel} Students / Total ={" "}
              {pendingStudentsColumn.students?.length}
            </h3>
          </div> */}
          <DataTable
            columns={pendingStudentsColumn}
            data={singlePendingStudentsData.students}
            customStyles={customStyle}
            pagination
            selectableRows
            selectableRowsHighlight
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}
