import React, { useEffect, useState } from "react";
import "./adminTeachers.scss";
import { useNavigate, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeachers,
  getAllTeachers,
} from "../../../features/staff/staffSlice";
import { teachersColumn } from "../../../options/options";
// import axios from "axios";

// import { format } from "timeago.js";
// import EditButton from "../../editButton/EditButton";

const API_ENDPOINT = "http://localhost:5000/api";

export default function AdminTeachers({ openSidebar }) {
  const [open, setOpen] = React.useState(false);
  // const [allTeachers, setAllTeachers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allTeachers = useSelector(getAllTeachers);
  const { member_name } = useParams();
  console.log(member_name);
  const handleModalClose = () => {
    setOpen(false);
  };
  const handleModalOpen = () => {
    setOpen(true);
  };
  //   const getTeachers = async () => {
  //     try {
  //       const res = await axios.get(`${API_ENDPOINT}/authusers/get_all_teachers`);
  //       // const data = await res.json();
  //       console.log(res.data);
  //       setAllTeachers(res.data.teachers);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   useEffect(() => {
  //     getTeachers();
  //   }, []);

  const animate = {
    off: { y: 50, opacity: 0 },
    on: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 3, delay: 1 },
    },
  };

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
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <div>
      <div className="teacherTotal">
        <h1 style={{ backgroundColor: "#383838" }}>All Teachers Data</h1>
        <div className="searchWrap">
          <div className="teacherSearch">
            <input
              type="text"
              placeholder="Search for a teacher..."
              id="search"
            />
            <SearchIcon className="searchIcon" />
          </div>
        </div>
        <div className="totalTeachersWrap">
          <div className="totalTeachersCont">
            <DataTable
              columns={teachersColumn}
              data={allTeachers}
              customStyles={customStyle}
              pagination
            />
            <div className="teacherWrapper">
              {/* {allTeachers.map((teacher) => (
                <div key={teacher._id}>
                  <div
                    className="student"
                    onClick={() => {
                      setOpen(true);
                    }}
                    key={teacher.staffId}
                  >
                    <EditButton
                      firstName={teacher.firstName}
                      lastName={teacher.lastName}
                      teacher={teacher}
                    />
                    <img
                      src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt=""
                    />
                    <div className="studentInfo">
                      <div className="left">
                        <div className="info">
                          <h4>First Name:</h4>
                          <p>{teacher.firstName} </p>
                        </div>
                        <div className="info">
                          <h4>Date of Birth:</h4>
                          <p>{teacher.dateOfBirth}</p>
                        </div>
                        <div className="info">
                          <h4>Course Study:</h4>
                          <p>{teacher.courseStudy}</p>
                        </div>
                      </div>
                      <div className="right">
                        <div className="info">
                          <h4>Surname:</h4>
                          <p>{teacher.lastName}</p>
                        </div>
                        <div className="info">
                          <h4>Enrolled Date:</h4>
                          <p>{format(teacher.createdAt)}</p>
                        </div>
                        <div className="info">
                          <h4>ID:</h4>
                          <p>{teacher.staffId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {open && teacher.staffId ? (
                    <div className="modal" onClick={handleModalClose}>
                      <div
                        className="modalContent"
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                        <div className="studentInfo">
                          <div className="left">
                            <div className="info">
                              <h4>First Name:</h4>
                              <p>{teacher.firstName}</p>
                            </div>
                            <div className="info">
                              <h4>Surname:</h4>
                              <p>{teacher.lastName}</p>
                            </div>
                            <div className="info">
                              <h4>Date of Birth:</h4>
                              <p>{teacher.dateOfBirth}</p>
                            </div>
                          </div>
                          <div className="middle">
                            <div className="info">
                              <h4>Home Town:</h4>
                              <p>{teacher.homeTown}</p>
                            </div>
                            <div className="info">
                              <h4>Mother Tongue:</h4>
                              <p>{teacher.motherTongue}</p>
                            </div>
                            <div className="info">
                              <h4>Course Study:</h4>
                              <p>{teacher.courseStudy}</p>
                            </div>
                          </div>
                          <div className="right">
                            <div className="info">
                              <h4>Religion:</h4>
                              <p>{teacher.religion}</p>
                            </div>
                            <div className="info">
                              <h4>Enrolled Date:</h4>
                              <p>{teacher.registedDate}</p>
                            </div>
                            <div className="info">
                              <h4>ID:</h4>
                              <p>{teacher.staffId}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
