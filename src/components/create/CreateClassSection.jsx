import React, { useEffect, useState } from "react";
import "./create.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { academicYearOptions } from "../../options/options";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { createAcademicYear } from "../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";
import { createClassLevelSection } from "../../features/classLevels/classLevelSectionSlice";

export default function CreateClassSection({ toast, toastOptions }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const { createLevelSectionStatus, successMessage, error } = useSelector(
    (state) => state.classLevelSection
  );

  const dispatch = useDispatch();
  const [classSection, setClassSection] = useState({
    section: "",
    classLevel: "",
    description: "",
    currentTeacher: "",
    createdBy: `${authAdminInfo.firstName} ${authAdminInfo.lastName}`,
    adminId: authAdminInfo.adminId,
  });
  console.log(classSection);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setClassSection({
      ...classSection,
      [e.target.name]: e.target.value,
    });
  };

  const handleClassSection = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", classSection.name);
    formData.append("description", classSection.description);
    formData.append("createdBy", classSection.createdBy);
    formData.append("adminId", classSection.adminId);
    dispatch(createClassLevelSection(classSection));
  };

  useEffect(() => {
    if (createLevelSectionStatus === "rejected") {
      error.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (createLevelSectionStatus === "success") {
      setClassSection({ name: "", description: "" });
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [
    error,
    successMessage,
    createLevelSectionStatus,
    toast,
    toastOptions,
    navigate,
  ]);

  setTimeout(() => {
    if (createLevelSectionStatus === "success") {
      window.location.reload();
    }
  }, 5000);
  return (
    <div className="formWrap">
      <h3>Class Section Form</h3>
      <form onSubmit={handleClassSection}>
        <div className="inputField">
          <label htmlFor="section">Section Name</label>
          <input
            type="text"
            name="section"
            onChange={handleInputValues}
            placeholder=""
            value={classSection.section}
          />
        </div>
        <div className="inputField">
          <label htmlFor="classLevel">Class Level</label>
          <input
            type="text"
            name="classLevel"
            onChange={handleInputValues}
            placeholder=""
            value={classSection.classLevel}
          />
        </div>
        <div className="inputField">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={handleInputValues}
            placeholder=""
            value={classSection.description}
          />
        </div>
        <div className="inputField">
          <label htmlFor="currentTeacher">Teacher</label>
          <input
            type="text"
            name="currentTeacher"
            onChange={handleInputValues}
            placeholder=""
            value={classSection.currentTeacher}
          />
        </div>
        <div className="addStudentBtnWrap">
          <button
            className="addStudentBtn"
            type="submit"
            //   disabled={!canSave || registerStudentStatus === "pending"}
          >
            {createLevelSectionStatus === "pending" ? (
              <CircularProgress style={{ color: "white", size: "20px" }} />
            ) : (
              "Create Class Section"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
