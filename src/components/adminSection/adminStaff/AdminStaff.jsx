import React, { useEffect, useState } from "react";
import "./adminStaff.scss";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import SearchIcon from "@mui/icons-material/Search";
// import axios from "axios";

// import { format } from "timeago.js";
// import EditButton from "../../editButton/EditButton";

// const API_ENDPOINT = "http://localhost:5000/api";

export default function AdminStaff({ openSidebar }) {
  const [open, setOpen] = useState(false);
  const [allStaffs, setAllStaffs] = useState([]);
  const navigate = useNavigate();
  const handleModalClose = () => setOpen(!open);
  // const getStaffs = async () => {
  //   try {
  //     const res = await axios.get(`${API_ENDPOINT}/authusers/get_all_staffs`);
  //     // const data = await res.json();
  //     console.log(res.data);
  //     setAllStaffs(res.data.staffs);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   getStaffs();
  // }, []);

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
            Staff Members
            {/* <div className="staffWrapper">
              {allStaffs.map((staff) => (
                <div>
                  <div
                    className="staff"
                    onClick={() => {
                      setOpen(true);
                      // navigate(
                      //   `/sensec/admin/all_staffs/${staff.firstName}`
                      // );
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
              ))}
            </div> */}
          </div>
        </div>
        {/* <div className="footer" style={{ backgroundColor: "#000" }}>
                <DashBoardFooter />
              </div> */}
      </div>
    </div>
  );
}
