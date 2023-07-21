import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { fetchAdmins, getAllAdmins } from "../../../features/admin/adminsSlice";
import { adminsColumn } from "../../../options/options";
// import axios from "axios";

// import { format } from "timeago.js";
// import EditButton from "../../editButton/EditButton";

// const API_ENDPOINT = "http://localhost:5000/api";

export default function AllAdmins({ openSidebar }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allStaffs = useSelector(getAllAdmins);
  console.log(allStaffs);

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
    dispatch(fetchAdmins());
  }, [dispatch]);

  return (
    <div>
      <div className="staffTotal">
        <h1 style={{ backgroundColor: "#383838" }}>All Admins Data</h1>
        {/* <div className="searchWrap"> */}
        <div className="staffSearch">
          <input type="text" placeholder="Search for an admin..." id="search" />
          <SearchIcon className="searchIcon" />
        </div>
        {/* </div> */}
        <div className="totalStaffsWrap">
          <div className="addStaffBtn">
            <button onClick={() => navigate("/sensec/admin/add_staff_member")}>
              Add New Member +
            </button>
          </div>
          <div className="totalStaffsCont">
            <DataTable
              columns={adminsColumn}
              data={allStaffs}
              customStyles={customStyle}
              pagination
            />
          </div>
        </div>
      </div>
    </div>
  );
}
