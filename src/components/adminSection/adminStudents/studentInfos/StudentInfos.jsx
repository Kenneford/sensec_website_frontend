import React, { useEffect, useRef, useState } from "react";
import "./studentInfos.scss";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  fetchSingleStudent,
  getStudentInfo,
} from "../../../../features/student/studentsSlice";
import { useDownloadExcel } from "react-export-table-to-excel";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function StudentInfos() {
  const studentInfo = useSelector(getStudentInfo);
  const guardian = studentInfo?.guardian;
  const parents = studentInfo?.parents;
  const dispatch = useDispatch();
  const { studentId } = useParams();
  console.log(studentId);
  console.log(studentInfo);

  const studentInfoRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: studentInfoRef.current,
    filename: "Student_Info_Data",
    sheet: "Student Data",
  });

  const [loader, setLoader] = useState(false);

  // const downloadPDF = () => {
  //   const capture = document.querySelector(".actual-receipt");
  //   setLoader(true);
  //   html2canvas(capture).then((canvas) => {
  //     const imgData = canvas.toDataURL("img/png");
  //     const doc = new jsPDF("p", "mm", "a4");
  //     const componentWidth = doc.internal.pageSize.getWidth();
  //     const componentHeight = doc.internal.pageSize.getHeight();
  //     doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
  //     setLoader(false);
  //     doc.save("receipt.pdf");
  //   });
  // };

  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    setLoader(true);
    html2canvas(input, {
      //useCors helps to render jsx images in pdf format
      useCORS: true,
    }).then((canvas) => {
      const imgData = new Image();
      imgData.src = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = Math.min(pdfWidth - imgWidth * ratio) / 2;
      const imgY = 20;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.setFontSize({ size: "20px" });
      setLoader(false);
      pdf.save("Student_Info_Data.pdf");
    });
  };

  useEffect(() => {
    dispatch(fetchSingleStudent(studentId));
  }, [dispatch, studentId]);
  return (
    <>
      <div className="downloadWrap">
        <div className="excelExport">
          <button className="excelBtn" onClick={onDownload}>
            Export to Excel
          </button>
          <button
            className="pdfBtn "
            onClick={downloadPDF}
            disabled={!(loader === false)}
          >
            {loader ? (
              <span>Download in progress</span>
            ) : (
              <span>Download PDF</span>
            )}
          </button>
        </div>
      </div>
      <div className="profileWrap" ref={pdfRef}>
        <div className="studentImage">
          <img src={studentInfo.profilePicture} alt="" />
          <div>
            <h1>
              {studentInfo.firstName} {studentInfo.lastName}'s Profile
            </h1>
            <div className="studentId">
              <h3>ID: </h3>
              <p>{studentInfo.studentId}</p>
            </div>
          </div>
        </div>
        <div className="studentInfoContent">
          <table className="studentInfoTable" ref={studentInfoRef}>
            <table>
              <h3>Personal Details</h3>
              <tr>
                <th className="tableHearder">Full Name</th>
                <th className="tableHearder">Date of Birth</th>
                <th className="tableHearder">Place of Birth</th>
                <th className="tableHearder">Gender</th>
                <th className="tableHearder">Home Town</th>
              </tr>
              <tr>
                <td className="alignTextLeft">{studentInfo.fullName}</td>
                <td className="alignTextLeft">{studentInfo.dateOfBirth}</td>
                <td className="alignTextLeft">{studentInfo.placeOfBirth}</td>
                <td className="alignTextLeft">{studentInfo.gender}</td>
                <td className="alignTextLeft">{studentInfo.homeTown}</td>
              </tr>
            </table>
            <table>
              <h3>Previous School(s)</h3>
              <tr>
                <th className="tableHearder">Junior High School (JHS)</th>
                <th className="tableHearder">Senior High School (SHS)</th>
              </tr>
              <tr>
                <td className="alignTextLeft">{studentInfo.jhsAttended}</td>
                <td className="alignTextLeft">{studentInfo.shsAttended}</td>
              </tr>
            </table>
            <table>
              <h3>School Data</h3>
              <tr>
                <th className="tableHearder">Student ID</th>
                <th className="tableHearder">Class Level</th>
                <th className="tableHearder">Program</th>
                <th className="tableHearder">Enrolled By</th>
                <th className="tableHearder">Enrolled Date</th>
              </tr>
              <tr>
                <td className="alignTextLeft">{studentInfo.studentId}</td>
                <td className="alignTextLeft">
                  {studentInfo.currentClassLevel?.name === "Level_100" &&
                    "Level 100"}
                  {studentInfo.currentClassLevel?.name === "Level_200" &&
                    "Level 200"}
                  {studentInfo.currentClassLevel?.name === "Level_300" &&
                    "Level 300"}
                </td>
                <td className="alignTextLeft">{studentInfo.program?.name}</td>
                <td className="alignTextLeft">
                  {studentInfo.studentRegistrar}
                </td>
                <td className="alignTextLeft">{studentInfo.dateEnrolled}</td>
              </tr>
            </table>
            <table>
              <h3>Status</h3>
              <tr>
                <th className="tableHearder">Height</th>
                <th className="tableHearder">Weight</th>
                <th className="tableHearder">Complexion</th>
                <th className="tableHearder">Nationality</th>
              </tr>
              <tr>
                <td className="alignTextLeft">{studentInfo.height}</td>
                <td className="alignTextLeft">{studentInfo.weight}</td>
                <td className="alignTextLeft">{studentInfo.complexion}</td>
                <td className="alignTextLeft">{studentInfo.nationality}</td>
              </tr>
            </table>
            <table>
              <h3>Language(s)</h3>
              <tr>
                <th className="tableHearder">Mother Tongue</th>
                <th className="tableHearder">Other Tongue</th>
              </tr>
              <tr>
                <td className="alignTextLeft">{studentInfo.motherTongue}</td>
                <td className="alignTextLeft">{studentInfo.otherTongue}</td>
              </tr>
            </table>
            <table>
              <h3>Location Address/Contacts</h3>
              <tr>
                <th className="tableHearder">Current City</th>
                <th className="tableHearder">District</th>
                <th className="tableHearder">House Address</th>
                <th className="tableHearder">GPS Address</th>
                <th className="tableHearder">Email</th>
                <th className="tableHearder">Mobile Phone</th>
              </tr>
              <tr>
                <td className="alignTextLeft">{studentInfo.currentCity}</td>
                <td className="alignTextLeft">{studentInfo.district}</td>
                <td className="alignTextLeft">{studentInfo.address}</td>
                <td className="alignTextLeft">{studentInfo.gpsAddress}</td>
                <td className="alignTextLeft">{studentInfo.email}</td>
                <td className="alignTextLeft">{studentInfo.phoneNumber}</td>
              </tr>
            </table>
          </table>
        </div>
        {parents && (
          <div className="studentInfoContent">
            <div className="studentInfoTable">
              <h2>Parents/Guardian Profile</h2>
              <table>
                <h3>Parents Contact Details</h3>
                <tr>
                  <th className="tableHearder">Father's Name</th>
                  <th className="tableHearder">Mother's Name</th>
                  <th className="tableHearder">Address</th>
                  <th className="tableHearder">Email</th>
                  <th className="tableHearder">Mobile Phone</th>
                </tr>
                <tr>
                  <td className="alignTextLeft">{parents.fatherName}</td>
                  <td className="alignTextLeft">{parents.motherName}</td>
                  <td className="alignTextLeft">{parents.address}</td>
                  <td className="alignTextLeft">{parents.email}</td>
                  <td className="alignTextLeft">{parents?.phoneNumber}</td>
                </tr>
              </table>
            </div>
          </div>
        )}
        {guardian && (
          <table>
            <h3>Guardian Contact Details</h3>
            <tr>
              <th className="tableHearder">Guardian's Name</th>
              <th className="tableHearder">Address</th>
              <th className="tableHearder">Email</th>
              <th className="tableHearder">Mobile Phone</th>
            </tr>
            <tr>
              <td className="alignTextLeft">{parents.guardianName}</td>
              <td className="alignTextLeft">{parents.address}</td>
              <td className="alignTextLeft">{parents.email}</td>
              <td className="alignTextLeft">{parents?.phoneNumber}</td>
            </tr>
          </table>
        )}
      </div>
    </>
  );
}
