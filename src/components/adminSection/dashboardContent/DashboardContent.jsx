import React, { useState } from "react";
import "./dashboardContent.scss";
import PersonIcon from "@mui/icons-material/Person";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TvIcon from "@mui/icons-material/Tv";
import { useNavigate, Outlet } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
// import { useSelector } from "react-redux";

export default function DashboardContent({ openSidebar }) {
  //   const { studentInfo } = useSelector((state) => state.auth);
  //   const { staffInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className={openSidebar ? "adminRight side" : "adminRight"}>
      <h1>Admins Dashboard</h1>
      <div className="content">
        <div className="dashBoardContent">
          <div
            className="teachers"
            onClick={() => navigate("/sensec/admin/all_teachers")}
          >
            <h3>Total Teachers</h3>
            <div className="teachersInfo">
              <div className="teachersInfoIcons">
                <PanoramaOutlinedIcon className="tvIcon" />
                <PersonIcon
                  style={{
                    backgroundColor: "#292929",
                    zIndex: 1,
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalTeachers">34</div>
            </div>
            <div className="pending">
              <h4>Pending Teacher(s)</h4>
              <div className="pendingTeachers">2</div>
            </div>
          </div>
          <div
            className="teachers"
            onClick={() => {
              navigate("/sensec/admin/all_students");
            }}
          >
            <h3>Total Students</h3>
            <div className="teachersInfo">
              <div className="teachersInfoIcons">
                <SchoolOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalTeachers">9,544</div>
            </div>
            <div className="pending">
              <h4>Pending Student(s)</h4>
              <div className="pendingTeachers">201</div>
            </div>
          </div>
          <div
            className="teachers"
            onClick={() => navigate("/sensec/admin/students_fees")}
          >
            <h3>Total Fees</h3>
            <div className="teachersInfo">
              <div className="teachersInfoIcons">
                <MoneyOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalTeachers">GH₵ 34,857.72</div>
            </div>
            <div className="pending">
              <h4>Pending Fees</h4>
              <div className="pendingTeachers">GH₵ 17,273.93</div>
            </div>
          </div>
          <div
            className="teachers"
            onClick={() => navigate("/sensec/admin/public_notice")}
          >
            <div className="titleFlex">
              <h3>Public Notice</h3>
              <p>Year 2023</p>
            </div>
            <div className="teachersInfo">
              <div className="teachersInfoIcons">
                <CampaignOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalTeachers">34</div>
            </div>
            <div className="pending">
              <h4>Old Notice</h4>
              <div className="pendingTeachers">/ 2023</div>
            </div>
          </div>
        </div>
        <div className="noticeBox">
          <div className="noticeCont">
            <div className="h3Cont">
              <h3>POST A NOTICE</h3>
            </div>
            <div className="inputFields">
              <form action="#">
                <div className="imageUpload">
                  <img
                    src="https://images.unsplash.com/photo-1609566193600-63a2c3e503df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt=""
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <span>Title</span>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      className="titleText"
                    />
                  </div>
                  <div className="title">
                    <span>Message</span>
                    <textarea
                      type="text"
                      name=""
                      id=""
                      placeholder=""
                      className="textArea"
                    />
                  </div>
                  <button className="noticeBtn">Post Notice</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
