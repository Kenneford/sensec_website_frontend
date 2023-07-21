import React, { useEffect, useState } from "react";
import "./adminStudents.scss";
import TvIcon from "@mui/icons-material/Tv";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import ComputerIcon from "@mui/icons-material/Computer";
import PersonIcon from "@mui/icons-material/Person";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../../features/student/studentsSlice";

export default function AdminStudents({ toast, toastOptions }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="h1">Admins Dashboard</h1>
      <div className="adminStudentsContent">
        <div className="dashBoardContent">
          <button
            onClick={() => {
              navigate("/sensec/admin/students_enrollment");
            }}
          >
            Add Student
          </button>
          <div
            className="students"
            onClick={() => {
              // dispatch(fetchStudents());
              navigate("/sensec/admin/all_students");
            }}
          >
            <h3>Total Students</h3>
            <div className="studentsInfo">
              <div className="studentsInfoIcons">
                <SchoolOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalStudents">9,544</div>
            </div>
            <div className="pending">
              <h4>Pending Student(s)</h4>
              <div className="pendingStudents">201</div>
            </div>
          </div>
          <div
            className="students"
            onClick={() => {
              navigate("/sensec/admin/agriculture_students");
            }}
          >
            <h3>Agriculture Students</h3>
            <div className="studentsInfo">
              <div className="studentsInfoIcons">
                <PanoramaOutlinedIcon className="tvIcon" />
                <PersonIcon
                  style={{
                    backgroundColor: "#005780",
                    zIndex: 1,
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalStudents">34</div>
            </div>
            <div className="pending">
              <h4>Pending student(s)</h4>
              <div className="pendingStudents">2</div>
            </div>
          </div>
          <div
            className="students"
            onClick={() => {
              navigate("/sensec/admin/general_art_students");
            }}
          >
            <h3>General Art Students</h3>
            <div className="studentsInfo">
              <div className="studentsInfoIcons">
                <MoneyOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalStudents">GH₵ 34,857.72</div>
            </div>
            <div className="pending">
              <h4>Pending Fees</h4>
              <div className="pendingStudents">GH₵ 17,273.93</div>
            </div>
          </div>
          <div className="students">
            <div className="titleFlex">
              <h3>Business Students</h3>
              <p>Year 2023</p>
            </div>
            <div className="studentsInfo">
              <div className="studentsInfoIcons">
                <CampaignOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalStudents">34</div>
            </div>
            <div className="pending">
              <h4>Old Notice</h4>
              <div className="pendingStudents">/ 2023</div>
            </div>
          </div>
          <div className="students">
            <div className="titleFlex">
              <h3>Home Economics Students</h3>
              <p>Year 2023</p>
            </div>
            <div className="studentsInfo">
              <div className="studentsInfoIcons">
                <CampaignOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalStudents">34</div>
            </div>
            <div className="pending">
              <h4>Old Notice</h4>
              <div className="pendingStudents">/ 2023</div>
            </div>
          </div>
          <div className="students">
            <div className="titleFlex">
              <h3>Science Students</h3>
              <p>Year 2023</p>
            </div>
            <div className="studentsInfo">
              <div className="studentsInfoIcons">
                <CampaignOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalStudents">34</div>
            </div>
            <div className="pending">
              <h4>Old Notice</h4>
              <div className="pendingStudents">/ 2023</div>
            </div>
          </div>
          <div className="students">
            <div className="titleFlex">
              <h3>Visua Art Students</h3>
              <p>Year 2023</p>
            </div>
            <div className="studentsInfo">
              <div className="studentsInfoIcons">
                <CampaignOutlinedIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </div>
              <div className="totalStudents">34</div>
            </div>
            <div className="pending">
              <h4>Old Notice</h4>
              <div className="pendingStudents">/ 2023</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
