import React, { useEffect, useState } from "react";
import "./adminTeachers.scss";
import { useNavigate, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchTeachers,
//   getAllTeachers,
// } from "../../../features/staff/staffSlice";
import { teachersColumn } from "../../../options/options";
import {
  fetchTeachers,
  getAllTeachers,
} from "../../../features/teacher/teachersSlice";
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
          <div className="addTeacherBtn">
            <button onClick={() => navigate("/sensec/admin/add_staff_member")}>
              Add New Member +
            </button>
          </div>
          <div className="totalTeachersCont">
            <DataTable
              columns={teachersColumn}
              data={allTeachers}
              customStyles={customStyle}
              pagination
            />
            <div className="teacherWrapper"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
