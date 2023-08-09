import React, { useEffect, useState } from "react";
import "./create.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  academicYearOptions,
  classLevelOptions,
  programOptions,
  teachersOptions,
} from "../../options/options";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { createAcademicYear } from "../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";
import { createClassLevelSection } from "../../features/classLevels/classLevelSectionSlice";
import {
  fetchTeachers,
  getAllTeachers,
} from "../../features/teacher/teachersSlice";

export default function CreateClassSection({ toast, toastOptions }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const { createLevelSectionStatus, successMessage, error } = useSelector(
    (state) => state.classLevelSection
  );
  const allTeachers = useSelector(getAllTeachers);

  const dispatch = useDispatch();
  const [classSection, setClassSection] = useState({
    sectionName: "",
    label: "",
    classLevel: "",
    program: "",
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
    if (classSection.currentTeacher.length !== 24) {
      toast.error(
        "Teacher Id provided is not valid!",
        toast.error({
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    } else {
      const formData = new FormData();
      formData.append("sectionName", classSection.sectionName);
      formData.append("label", classSection.label);
      formData.append("classLevel", classSection.classLevel);
      formData.append("program", classSection.program);
      formData.append("description", classSection.description);
      formData.append("createdBy", classSection.createdBy);
      formData.append("adminId", classSection.adminId);
      dispatch(createClassLevelSection(classSection));
    }
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

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

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
          <label htmlFor="sectionName">Section Name</label>
          <input
            type="text"
            name="sectionName"
            onChange={handleInputValues}
            placeholder=""
            value={classSection.sectionName}
          />
        </div>
        <div className="inputField">
          <label htmlFor="label">Label</label>
          <input
            type="text"
            name="label"
            onChange={handleInputValues}
            placeholder=""
            value={classSection.label}
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
        <div className="selector">
          <label htmlFor="classLevel">Class Level</label>
          <select
            className="select"
            value={classSection.classLevel}
            onChange={handleInputValues}
            name="classLevel"
          >
            {classLevelOptions.map((classLevel) => (
              <option
                key={classLevel.label}
                value={classLevel.value}
                className="selectOptions"
              >
                {classLevel.label}
              </option>
            ))}
          </select>
        </div>
        <div className="selector">
          <label htmlFor="program">Program</label>
          <select
            className="select"
            value={classSection.program}
            onChange={handleInputValues}
            name="program"
          >
            {programOptions.map((program) => (
              <option
                key={program.label}
                value={program.value}
                className="selectOptions"
              >
                {program.label}
              </option>
            ))}
          </select>
        </div>
        <div className="selector">
          <label htmlFor="currentTeacher">Teacher</label>
          <select
            className="select"
            value={classSection.currentTeacher}
            onChange={handleInputValues}
            name="currentTeacher"
          >
            {teachersOptions.map((teacher) => (
              <option
                key={teacher.label}
                value={teacher.value}
                className="selectOptions"
              >
                {teacher.label}
              </option>
            ))}
          </select>
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
