import React, { useEffect, useState } from "react";
import "./adminProgramesSubjects.scss";
import ProgramesForm from "./ProgramesForm";
import { useDispatch, useSelector } from "react-redux";
import SubjectsForm from "./SubjectsForm";
import PersonIcon from "@mui/icons-material/Person";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import {
  fetchAgricProgram,
  fetchAllProgrammes,
  fetchAllSubjects,
  getAgricProgram,
  getAllProgrammes,
  getAllSubjects,
} from "../../../features/academics/academics";
import { useNavigate } from "react-router";

export default function AdminProgramesSubjects({ toast, toastOptions }) {
  const { addStatus, error, successMessage } = useSelector(
    (state) => state.academics
  );
  const allProgrammes = useSelector(getAllProgrammes);
  const allSubjects = useSelector(getAllSubjects);
  const agricProgram = useSelector(getAgricProgram);
  const [program, setProgram] = useState(false);
  const [programForm, setProgramForm] = useState(false);
  const [subject, setSubject] = useState(false);
  const [subjectForm, setSubjectForm] = useState(false);
  console.log(allProgrammes);
  console.log(allSubjects);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(program);
  console.log(subject);
  console.log(agricProgram);

  useEffect(() => {
    dispatch(fetchAllProgrammes());
    dispatch(fetchAgricProgram());
    dispatch(fetchAllSubjects());
  }, [dispatch]);

  useEffect(() => {
    if (addStatus === "rejected") {
      error.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (addStatus === "success") {
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [addStatus, error, successMessage, toast, toastOptions]);

  return (
    <div className="programesWrap">
      <h1>Programes & Subjects</h1>
      <div className="options">
        <button
          className="optionBtn"
          onClick={() =>
            setProgram(
              !program,
              setSubject(false),
              setProgramForm(false),
              setSubjectForm(false)
            )
          }
        >
          Program
        </button>
        <button
          className="optionBtn"
          onClick={() =>
            setSubject(
              !subject,
              setProgram(false),
              setProgramForm(false),
              setSubjectForm(false)
            )
          }
        >
          Program's Subject
        </button>
        <button
          className="optionBtn"
          onClick={() =>
            setSubject(
              !subject,
              setProgram(false),
              setProgramForm(false),
              setSubjectForm(false)
            )
          }
        >
          Core Subject
        </button>
      </div>
      <div className="forms">
        {programForm && (
          <ProgramesForm toastOptions={toastOptions} toast={toast} />
        )}
        {subjectForm && <SubjectsForm />}
      </div>
      {program && (
        <div className="adminStudentsContent">
          <div className="dashBoardContent">
            <button
              className="optionBtn"
              onClick={() =>
                setProgramForm(
                  !programForm,
                  setSubject(false),
                  setProgram(false)
                )
              }
            >
              Add Program
            </button>
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
                      titleAccess="Number of Students"
                      style={{
                        fontSize: "2rem",
                      }}
                    />
                  </div>
                  <div className="totalStudents">{prgrm.students.length}</div>
                </div>
                <div className="pending">
                  <MenuBookIcon
                    titleAccess="Number of Subjects"
                    style={{
                      fontSize: "2rem",
                    }}
                  />
                  <div className="pendingStudents">
                    {prgrm.subjects?.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {subject && (
        <div className="adminStudentsContent">
          <div className="dashBoardContent">
            <button
              className="optionBtn"
              onClick={() =>
                setSubjectForm(
                  !subjectForm,
                  setProgram(false),
                  setSubject(false)
                )
              }
            >
              Add Subject
            </button>
            {allSubjects.map((sbj) => (
              <div
                key={sbj._id}
                className="students"
                onClick={() => {
                  navigate(`/sensec/admin/subjects/${sbj.name}`);
                }}
              >
                <div className="programName">
                  {sbj.name === "Business" && (
                    <MoneyOutlinedIcon
                      style={{
                        fontSize: "2rem",
                      }}
                    />
                  )}
                  <h3>{sbj.name}</h3>
                </div>
                <div className="studentsInfo">
                  <div className="studentsInfoIcons">
                    <SupervisedUserCircleIcon
                      style={{
                        fontSize: "2rem",
                      }}
                    />
                  </div>
                  <div className="totalStudents">{sbj.teachers?.length}</div>
                </div>
                <div className="pending">
                  <SchoolOutlinedIcon
                    style={{
                      fontSize: "2rem",
                    }}
                  />
                  <div className="pendingStudents">{sbj.students?.length}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
