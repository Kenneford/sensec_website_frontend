import React, { useEffect, useState } from "react";
import "./allStaffMembers.scss";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStaffs,
  getAllStaffs,
} from "../../../../features/staff/staffSlice";
import DataTable from "react-data-table-component";
import { column, staffColumn } from "../../../../options/options";
// import axios from "axios";

// import { format } from "timeago.js";
// import EditButton from "../../editButton/EditButton";

// const API_ENDPOINT = "http://localhost:5000/api";

export default function AllStaffMembers({ openSidebar }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allStaffs = useSelector(getAllStaffs);
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
    dispatch(fetchStaffs());
  }, [dispatch]);

  return (
    <div>
      <div className="staffTotal">
        <h1 style={{ backgroundColor: "#383838" }}>All Staff Members Data</h1>
        {/* <div className="searchWrap"> */}
        <div className="staffSearch">
          <input
            type="text"
            placeholder="Search for a staff member..."
            id="search"
          />
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
              columns={staffColumn}
              data={allStaffs}
              customStyles={customStyle}
              pagination
            />
            <div className="staffWrapper">
              {/* {allStaffs.map((staff) => (
                <div>
                  <div
                    className="staff"
                    onClick={() => {
                      setOpen(true);
                      navigate(
                        `/sensec/admin/all_staffs/${staff.firstName}`
                      );
                    }}
                    key={staff.staffId}
                  >
                    <EditButton
                      firstName={staff.firstName}
                      lastName={staff.lastName}
                    />
                    <img
                      src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt=""
                    />
                    <div className="staffInfo">
                      <div className="left">
                        <div className="info">
                          <h4>First Name:</h4>
                          <p>{staff.firstName} </p>
                        </div>
                        <div className="info">
                          <h4>Date of Birth:</h4>
                          <p>{staff.dateOfBirth}</p>
                        </div>
                        <div className="info">
                          <h4>Course Study:</h4>
                          <p>{staff.courseStudy}</p>
                        </div>
                      </div>
                      <div className="right">
                        <div className="info">
                          <h4>Surname:</h4>
                          <p>{staff.lastName}</p>
                        </div>
                        <div className="info">
                          <h4>Enrolled Date:</h4>
                          <p>{format(staff.createdAt)}</p>
                        </div>
                        <div className="info">
                          <h4>ID:</h4>
                          <p>{staff.staffId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {open && staff.staffId ? (
                    <div className="modal">
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
                        <div className="staffInfo">
                          <div className="left">
                            <div className="info">
                              <h4>First Name:</h4>
                              <p>{staff.firstName}</p>
                            </div>
                            <div className="info">
                              <h4>Surname:</h4>
                              <p>{staff.lastName}</p>
                            </div>
                            <div className="info">
                              <h4>Date of Birth:</h4>
                              <p>{staff.dateOfBirth}</p>
                            </div>
                          </div>
                          <div className="middle">
                            <div className="info">
                              <h4>Home Town:</h4>
                              <p>{staff.homeTown}</p>
                            </div>
                            <div className="info">
                              <h4>Mother Tongue:</h4>
                              <p>{staff.motherTongue}</p>
                            </div>
                            <div className="info">
                              <h4>Course Study:</h4>
                              <p>{staff.courseStudy}</p>
                            </div>
                          </div>
                          <div className="right">
                            <div className="info">
                              <h4>Religion:</h4>
                              <p>{staff.religion}</p>
                            </div>
                            <div className="info">
                              <h4>Enrolled Date:</h4>
                              <p>{staff.registedDate}</p>
                            </div>
                            <div className="info">
                              <h4>ID:</h4>
                              <p>{staff.staffId}</p>
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
        {/* <div className="footer" style={{ backgroundColor: "#000" }}>
                <DashBoardFooter />
              </div> */}
      </div>
    </div>
  );
}
