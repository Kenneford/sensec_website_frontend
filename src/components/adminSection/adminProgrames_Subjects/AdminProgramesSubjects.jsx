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
import {
  fetchAgricProgram,
  fetchAllProgrammes,
  getAgricProgram,
  getAllProgrammes,
} from "../../../features/academics/academics";
import { useNavigate } from "react-router";

export default function AdminProgramesSubjects({ toast, toastOptions }) {
  const { addStatus, error, successMessage } = useSelector(
    (state) => state.academics
  );
  const allProgrammes = useSelector(getAllProgrammes);
  const agricProgram = useSelector(getAgricProgram);
  const [program, setProgram] = useState(false);
  const [programForm, setProgramForm] = useState(false);
  const [subject, setSubject] = useState(false);
  const [subjectForm, setSubjectForm] = useState(false);
  console.log(allProgrammes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(program);
  console.log(subject);
  console.log(agricProgram);

  useEffect(() => {
    dispatch(fetchAllProgrammes());
    dispatch(fetchAgricProgram());
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
          Subject
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
                <h3>{prgrm.name}</h3>
                <div className="studentsInfo">
                  <div className="studentsInfoIcons">
                    <PersonIcon
                      style={{
                        fontSize: "2rem",
                      }}
                    />
                    {prgrm.name === "Business" && (
                      <MoneyOutlinedIcon
                        style={{
                          fontSize: "2rem",
                        }}
                      />
                    )}
                  </div>
                  <div className="totalStudents">{prgrm.students.length}</div>
                </div>
                <div className="pending">
                  <h4>Pending student(s)</h4>
                  <div className="pendingStudents">2</div>
                </div>
              </div>
            ))}
            {/* <div
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
                <div className="totalStudents">
                  {agricProgram.students.length}
                </div>
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
            </div> */}
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
      )}
    </div>
  );
}
