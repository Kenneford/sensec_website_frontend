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
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  getAllStudents,
} from "../../../features/student/studentsSlice";
import {
  fetchAllProgrammes,
  getAllProgrammes,
} from "../../../features/academics/academics";

export default function AdminStudents({ toast, toastOptions }) {
  const allStudents = useSelector(getAllStudents);
  const allProgrammes = useSelector(getAllProgrammes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchAllProgrammes());
  }, [dispatch]);

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
              navigate("/sensec/admin/students");
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
              <div className="totalStudents">{allStudents.length}</div>
            </div>
            <div className="pending">
              <h4>Pending Student(s)</h4>
              <div className="pendingStudents">201</div>
            </div>
          </div>

          {allProgrammes.map((prgrm) => (
            <div
              key={prgrm._id}
              className="students"
              onClick={() => {
                navigate(`/sensec/admin/programmes/${prgrm.name}`);
              }}
            >
              <div className="programName">
                {prgrm.name === "Business" && (
                  <MoneyOutlinedIcon
                    style={{
                      fontSize: "2rem",
                    }}
                  />
                )}
                <h3>{prgrm.name}</h3>
              </div>
              <div className="studentsInfo">
                <div className="studentsInfoIcons">
                  <SchoolOutlinedIcon
                    style={{
                      fontSize: "2rem",
                    }}
                  />
                </div>
                <div className="totalStudents">{prgrm.students.length}</div>
              </div>
              <div className="pending">
                <MenuBookIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
                <div className="pendingStudents">{prgrm.subjects?.length}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
