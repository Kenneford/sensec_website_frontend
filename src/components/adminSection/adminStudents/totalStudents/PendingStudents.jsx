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
  getAllPendingStudents,
  fetchPendingStudents,
} from "../../../../features/student/studentsSlice";
import {
  pendingStudentsColumn,
  studentColumn,
} from "../../../../options/options";
import {
  fetchClassLevels,
  getAllClassLevels,
} from "../../../../features/classLevels/classLevelsSlice";
import {
  fetchPendingStudentsDatas,
  getAllPendingStudentsDatas,
} from "../../../../features/pendingStudents/pendingStudentsSlice";

export default function PendingStudents({ toast, toastOptions }) {
  const {
    fetchingPendingStudentsStatus,
    searchStatus,
    studentError,
    studentSuccessMessage,
  } = useSelector((state) => state.student);
  const { fetchingStatus, pendingStudentsDataError, successMessage } =
    useSelector((state) => state.pendingStudentsData);
  const [searchStudent, setSearchStudent] = useState("");
  const dispatch = useDispatch();
  const allStudents = useSelector(getAllStudents);
  const allClassLevels = useSelector(getAllClassLevels);
  const allPendingStudentsDatas = useSelector(getAllPendingStudentsDatas);
  const allPendingStudents = useSelector(getAllPendingStudents);

  const navigate = useNavigate();
  const { class_level } = useParams();
  console.log(searchStudent);
  console.log(allStudents);
  console.log(allClassLevels);

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
    dispatch(fetchPendingStudents());
    dispatch(fetchPendingStudentsDatas());
  }, [dispatch]);

  useEffect(() => {
    if (fetchingPendingStudentsStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (fetchingStatus === "rejected") {
      pendingStudentsDataError.errorMessage.message.map((err) =>
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
    fetchingPendingStudentsStatus,
    toast,
    toastOptions,
    fetchingStatus,
    pendingStudentsDataError,
  ]);

  return (
    <div className="studentTotal" id="allStudents">
      <h1 style={{ backgroundColor: "#383838" }}>All Pending Students</h1>
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
        {/* <div className="addTeacherBtn">
          <button onClick={() => navigate("/sensec/admin/student_enrollment")}>
            Add New Student +
          </button>
        </div> */}
        <div className="searchDetails">
          {allStudents?.length === 0 &&
            location.pathname === "/sensec/admin/students" && (
              <p className="searchInfo">No Student Found!</p>
            )}
          {!searchStatus && (
            <p className="searchInfo">
              Total Pending Students = {allPendingStudents.length}
            </p>
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
          <div className="totalStudentsContWrap">
            <div className="batches">
              <span
                onClick={() => navigate(`/sensec/admin/all_pending_students`)}
                className={!class_level && "greenBackground"}
              >
                All Pending Students
              </span>
              {allPendingStudentsDatas.map((pendingData) => (
                <span
                  key={pendingData._id}
                  onClick={() =>
                    navigate(
                      `/sensec/admin/all_pending_students/${pendingData.classLevel}`
                    )
                  }
                  className={
                    pendingData.classLevel === class_level && "greenBackground"
                  }
                >
                  {pendingData.classLevel}
                </span>
              ))}
            </div>
          </div>
          <>
            <h3>All Pending Students / Total = {allPendingStudents?.length}</h3>
            <DataTable
              columns={pendingStudentsColumn}
              data={allPendingStudents}
              customStyles={customStyle}
              pagination
            />
          </>
        </div>
      </div>
    </div>
  );
}
