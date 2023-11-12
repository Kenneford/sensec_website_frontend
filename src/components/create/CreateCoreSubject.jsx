import React, { useEffect, useState } from "react";
import "./create.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  academicTermOptions,
  classLevelOptions,
  teachersOptions,
} from "../../options/options";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { useNavigate } from "react-router-dom";
import { createCoreSubject } from "../../features/academics/createSubjects/coreSubjectSlice";
import {
  fetchAllAcademicTerms,
  getAllAcademicTerms,
} from "../../features/academics/academicTerm/academicTermSlice";
import {
  fetchTeachers,
  getAllTeachers,
} from "../../features/teacher/teachersSlice";

export default function CreateCoreSubject({ toast, toastOptions }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const { createStatus, successMessage, error } = useSelector(
    (state) => state.coreSubject
  );

  const allTeachers = useSelector(getAllTeachers);
  const allAcademicTerms = useSelector(getAllAcademicTerms);

  const dispatch = useDispatch();
  const [coreSubject, setCoreSubject] = useState({
    name: "",
    description: "",
    academicTerm: "",
    teacher: "",
    classLevel: "",
    createdBy: `${authAdminInfo.firstName} ${authAdminInfo.lastName}`,
    adminId: authAdminInfo.adminId,
  });
  console.log(coreSubject);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setCoreSubject({
      ...coreSubject,
      [e.target.name]: e.target.value,
    });
  };

  const handlecoreSubject = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", coreSubject.name);
    formData.append("description", coreSubject.description);
    formData.append("academicTerm", coreSubject.academicTerm);
    formData.append("classLevel", coreSubject.classLevel);
    formData.append("teacher", coreSubject.teacher);
    formData.append("createdBy", coreSubject.createdBy);
    formData.append("adminId", coreSubject.adminId);
    dispatch(createCoreSubject(coreSubject));
  };

  useEffect(() => {
    if (createStatus === "rejected") {
      error.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (createStatus === "success") {
      setCoreSubject({ name: "", description: "" });
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [error, successMessage, createStatus, toast, toastOptions, navigate]);

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchAllAcademicTerms());
  }, [dispatch]);

  return (
    <div className="formWrap">
      <h3>Core Subject Form</h3>
      <form onSubmit={handlecoreSubject}>
        <div className="inputField">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleInputValues}
            placeholder=""
            value={coreSubject.name}
          />
        </div>
        <div className="inputField">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={handleInputValues}
            placeholder=""
            value={coreSubject.description}
          />
        </div>
        <div className="selector">
          <label htmlFor="classLevel">Class Level</label>
          <select
            className="select"
            value={coreSubject.classLevel}
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
          <label htmlFor="teacher">Teacher</label>
          <select
            className="select"
            value={coreSubject.teacher}
            onChange={handleInputValues}
            name="teacher"
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
        <div className="selector">
          <label htmlFor="academicTerm">Academic Term</label>
          <select
            className="select"
            value={coreSubject.academicTerm}
            onChange={handleInputValues}
            name="academicTerm"
          >
            {academicTermOptions.map((term) => (
              <option
                key={term.label}
                value={term.value}
                className="selectOptions"
              >
                {term.label}
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
            {createStatus === "pending" ? (
              <CircularProgress style={{ color: "white", size: "20px" }} />
            ) : (
              "Create C-Subject"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
