import React, { useEffect, useRef, useState } from "react";
import "./adminProgramesSubjects.scss";
import { useDispatch, useSelector } from "react-redux";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDownloadExcel } from "react-export-table-to-excel";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  fetchAgricProgram,
  fetchAllProgrammes,
  getAgricProgram,
  getAllProgrammes,
} from "../../../features/academics/academics";
import { useNavigate } from "react-router";
import {
  fetchAllElectiveSubjects,
  getAllElectiveSubjects,
} from "../../../features/academics/createSubjects/electiveSubjectSlice";
import {
  fetchAllCoreSubjects,
  getAllCoreSubjects,
} from "../../../features/academics/createSubjects/coreSubjectSlice";

export default function AdminProgramesSubjects({ toast, toastOptions }) {
  const { addStatus, error, successMessage } = useSelector(
    (state) => state.academics
  );
  const allProgrammes = useSelector(getAllProgrammes);
  const allElectiveSubjects = useSelector(getAllElectiveSubjects);
  const allCoreSubjects = useSelector(getAllCoreSubjects);
  const agricProgram = useSelector(getAgricProgram);
  const [program, setProgram] = useState(false);
  const [electiveSubject, setElectiveSubject] = useState(false);
  const [coreSubject, setCoreSubject] = useState(false);
  console.log(allProgrammes);
  console.log(allElectiveSubjects);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(program);
  console.log(electiveSubject);
  console.log(agricProgram);

  // const pdfRef = useRef();
  // const downloadPDF = () => {
  //   const input = pdfRef.current;
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4", true);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();
  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;
  //     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //     const imgX = Math.min(pdfWidth - imgWidth * ratio) / 2;
  //     const imgY = 20;
  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       imgX,
  //       imgY,
  //       imgWidth * ratio,
  //       imgHeight * ratio
  //     );
  //     pdf.save("elective-subject.pdf");
  //   });
  // };

  useEffect(() => {
    dispatch(fetchAllProgrammes());
    dispatch(fetchAgricProgram());
    dispatch(fetchAllElectiveSubjects());
    dispatch(fetchAllCoreSubjects());
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
      <h1>Programs & Subjects</h1>
      <div className="options">
        <button
          className="optionBtn"
          onClick={() =>
            setProgram(
              !program,
              setElectiveSubject(false),
              setCoreSubject(false)
            )
          }
        >
          Programs
        </button>
        <button
          className="optionBtn"
          onClick={() =>
            setElectiveSubject(
              !electiveSubject,
              setProgram(false),
              setCoreSubject(false)
            )
          }
        >
          Elective Subjects
        </button>
        <button
          className="optionBtn"
          onClick={() =>
            setCoreSubject(
              !coreSubject,
              setProgram(false),
              setElectiveSubject(false)
            )
          }
        >
          Core Subjects
        </button>
      </div>
      {program && (
        <div className="adminStudentsContent">
          <div className="dashBoardContent">
            {allProgrammes.map((prgrm) => (
              <div
                key={prgrm._id}
                className="students"
                onClick={() => {
                  navigate(`/sensec/admin/programmes/${prgrm.name}`);
                }}
              >
                <div className="programName">
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
                    {prgrm.electiveSubjects?.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {electiveSubject && (
        <div>
          {/* <div className="pdfWrap">
            <div className="excelExport">
              <button className="excelBtn" onClick={downloadPDF}>
                Download PDF
              </button>
            </div>
          </div> */}
          <div className="subjectContent">
            {allElectiveSubjects && (
              <div className="attendanceTable">
                <table>
                  <thead>
                    <th className="alignTextLeft">Subject ID</th>
                    <th className="alignTextLeft">Subject Name</th>
                    <th className="alignTextLeft">Program</th>
                    <th className="alignTextLeft">Academic Term</th>
                    <th className="alignTextLeft">Class Level</th>
                    <th className="alignTextLeft">Teacher</th>
                    {/* <th className="alignTextLeft">Duration</th> */}
                  </thead>
                  <tbody>
                    {allElectiveSubjects.map((subject) => (
                      <tr key={subject.electiveSubjectId}>
                        <td className="alignTextLeft">
                          {subject.electiveSubjectId}
                        </td>
                        <td className="alignTextLeft">{subject.name}</td>
                        <td className="alignTextLeft">
                          {subject.program?.name}
                        </td>
                        <td className="alignTextLeft">
                          {subject.academicTerm.name}
                        </td>
                        <td className="alignTextLeft">
                          {subject.classLevel.name === "Level_100" &&
                            "Level 100"}
                          {subject.classLevel.name === "Level_200" &&
                            "Level 200"}
                          {subject.classLevel.name === "Level_300" &&
                            "Level 300"}
                        </td>
                        <td className="alignTextLeft">
                          {subject.teacher?.gender === "Male" && "Mr."}
                          {subject.teacher?.gender === "Female" && "Mrs."}{" "}
                          {subject.teacher?.fullName}
                        </td>
                        {/* <td className="alignTextLeft">{subject.duration}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
      {coreSubject && (
        <div className="subjectContent">
          {
            coreSubject && (
              <div className="attendanceTable">
                <table>
                  <tr>
                    <th className="alignTextLeft">Subject</th>
                    <th className="alignTextLeft">Academic Term</th>
                    <th className="alignTextLeft">Class Level</th>
                    <th className="alignTextLeft">Teacher</th>
                    <th className="alignTextLeft">Duration</th>
                  </tr>
                  {allCoreSubjects.map((subject) => (
                    <tr key={subject._id}>
                      <td className="alignTextLeft">{subject.name}</td>
                      <td className="alignTextLeft">
                        {subject.academicTerm.name}
                      </td>
                      <td className="alignTextLeft">
                        {subject.classLevel.name === "Level_100" && "Level 100"}
                        {subject.classLevel.name === "Level_200" && "Level 200"}
                        {subject.classLevel.name === "Level_300" && "Level 300"}
                      </td>
                      <td className="alignTextLeft">
                        {subject.teacher?.gender === "Male"
                          ? "Mr."
                          : subject.teacher?.gender === "Female"
                          ? "Mrs."
                          : ""}{" "}
                        {subject.teacher?.fullName}
                      </td>
                      <td className="alignTextLeft">{subject.duration}</td>
                    </tr>
                  ))}
                </table>
              </div>
            )
            // allCoreSubjects.map((sbj) => (
            //   <div
            //     key={sbj._id}
            //     className="students"
            //     onClick={() => {
            //       navigate(`/sensec/admin/subjects/${sbj.name}`);
            //     }}
            //   >
            //     <div className="programName">
            //       {sbj.name === "Business" && (
            //         <MoneyOutlinedIcon
            //           style={{
            //             fontSize: "2rem",
            //           }}
            //         />
            //       )}
            //       <h3>{sbj.name}</h3>
            //     </div>
            //     <div className="studentsInfo">
            //       <div className="studentsInfoIcons">
            //         <SupervisedUserCircleIcon
            //           titleAccess="Number of Teachers"
            //           style={{
            //             fontSize: "2rem",
            //           }}
            //         />
            //       </div>
            //       <div className="totalStudents">{sbj.teachers?.length}</div>
            //     </div>
            //     <div className="pending">
            //       <SchoolOutlinedIcon
            //         titleAccess="Number of Students"
            //         style={{
            //           fontSize: "2rem",
            //         }}
            //       />
            //       <div className="pendingStudents">
            //         {sbj.students?.length}
            //       </div>
            //     </div>
            //   </div>
            // ))
          }
        </div>
      )}
    </div>
  );
}
