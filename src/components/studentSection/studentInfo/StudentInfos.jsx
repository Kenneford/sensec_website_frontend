import React, { useEffect, useRef, useState } from "react";
import "./studentInfos.scss";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDownloadExcel } from "react-export-table-to-excel";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { API_ENDPOINT } from "../../../apiEndPoint/api";
import {
  fetchSingleStudent,
  getStudentInfo,
  studentUpdateImage,
} from "../../../features/student/studentsSlice";

export default function StudentInfos({ toast }) {
  const studentInfo = useSelector(getStudentInfo);
  const {
    authenticated,
    updateStudentImageStatus,
    studentError,
    studentSuccessMessage,
  } = useSelector((state) => state.student);
  const guardian = studentInfo?.guardian;
  const parents = studentInfo?.parents;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uniqueId } = useParams();
  console.log(uniqueId);
  console.log(studentInfo);

  const [loadProfileImage, setLoadProfileImage] = useState("");
  const [imageUpdated, setImageUpdated] = useState(false);
  const [imageUpdating, setImageUpdating] = useState(false);

  const handleImageFileUpload = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLoadProfileImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      return;
    }
  };
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

  const handleImageUpdate = () => {
    dispatch(
      studentUpdateImage({
        id: studentInfo.uniqueId,
        firstName: studentInfo.firstName,
        lastName: studentInfo.lastName,
        profilePicture: loadProfileImage,
      })
    );
    setImageUpdating(true);
    setTimeout(() => {
      setImageUpdated(true);
      setImageUpdating(false);
    }, 3000);
  };
  useEffect(() => {
    if (updateStudentImageStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (updateStudentImageStatus === "success") {
      // navigate("/sensec/admin/all_students");
      toast.success(studentSuccessMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
      // navigate("/sensec/admin/students/add_parents_guardian");
    }
  }, [
    studentError,
    studentSuccessMessage,
    updateStudentImageStatus,
    toast,
    navigate,
  ]);
  useEffect(() => {
    dispatch(fetchSingleStudent(uniqueId));
  }, [dispatch, uniqueId]);

  return (
    <div id="studentInfo">
      <div className="downloadWrap">
        {studentInfo.isStudent && (
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
        )}
      </div>
      <div className="profileWrap" ref={pdfRef}>
        <div className="studentImage">
          {loadProfileImage && (
            <label
              className="imgUpdate"
              onClick={() => {
                handleImageUpdate();
              }}
            >
              {!imageUpdating ? "Save Update" : "Updating..."}
            </label>
          )}
          {!loadProfileImage && (
            <label className="imgUpdate" htmlFor="profilePicture">
              Change Image
            </label>
          )}
          {imageUpdated && (
            <label className="imgUpdate imgChange" htmlFor="profilePicture">
              <span>Updated</span>{" "}
              <CheckCircleOutlineIcon className="imgUpdateIcon" />
            </label>
          )}
          <div className="file">
            <label className="profileImageUpload" htmlFor="profilePicture">
              {studentInfo.profilePicture ? (
                <img
                  className="profileImg"
                  src={
                    loadProfileImage
                      ? loadProfileImage
                      : studentInfo.profilePicture
                  }
                  alt=""
                />
              ) : (
                <>
                  {studentInfo.gender === "Male" && (
                    <img
                      className="profileImg"
                      src={"/assets/maleAvatar.png"}
                      alt=""
                    />
                  )}
                  {studentInfo.gender === "Female" && (
                    <img
                      className="profileImg"
                      src={"/assets/femaleAvatar.png"}
                      alt=""
                    />
                  )}
                  {studentInfo.gender === "" && (
                    <div className="noImg">
                      <p>"No Image"</p>
                    </div>
                  )}
                </>
              )}
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={handleImageFileUpload}
              name="profilePicture"
              id="profilePicture"
              accept=".png,.jpeg,.jpg"
            />
          </div>
          {/* {studentInfo.profilePicture ? (
            <img src={studentInfo.profilePicture} alt="" />
          ) : (
            <>
              {studentInfo?.gender === "Male" && (
                <img
                  className="profileImg"
                  src={"/assets/maleAvatar.png"}
                  alt=""
                />
              )}
              {studentInfo?.gender === "Female" && (
                <img
                  className="profileImg"
                  src={"/assets/femaleAvatar.png"}
                  alt=""
                />
              )}
              {studentInfo?.gender === "" && (
                <div className="noImg">
                  <p>"No Image"</p>
                </div>
              )}
            </>
          )} */}
          <div>
            <h1>
              {studentInfo.firstName} {studentInfo.lastName}'s Profile
            </h1>
            <div className="studentId">
              <h3>ID: </h3>
              <p>{studentInfo?.uniqueId}</p>
            </div>
            {
              <button
                className="studentUpdateBtn"
                onClick={() =>
                  navigate(
                    `/sensec/student/update_info/${studentInfo.firstName}_${studentInfo.lastName}/${studentInfo.uniqueId}`
                  )
                }
              >
                Edit Profile
              </button>
            }
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
                <td className="alignTextLeft">{studentInfo.uniqueId}</td>
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
            <table>
              <h3>Student's Data Update Details</h3>
              <tr>
                <th className="tableHearder">Updated By (Admin)</th>
                <th className="tableHearder">Admin ID</th>
                <th className="tableHearder">Last Updated</th>
              </tr>
              <tr>
                <td className="alignTextLeft">{studentInfo.updatedBy}</td>
                <td className="alignTextLeft">
                  {studentInfo.updatedByAdminId}
                </td>
                <td className="alignTextLeft">{studentInfo.updatedDate}</td>
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
    </div>
  );
}
