import React, { useEffect, useState } from "react";
import "./create.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  academicYearOptions,
  classLevelNameOptions,
  classLevelOptions,
} from "../../options/options";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { createAcademicYear } from "../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";
import {
  createProgram,
  fetchAllProgrammes,
} from "../../features/academics/academicProgram/academicProgram";

export default function CreateProgram({ toast, toastOptions }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const { createStatus, successMessage, error } = useSelector(
    (state) => state.academicProgram
  );

  const dispatch = useDispatch();
  const [program, setProgram] = useState({
    name: "",
    description: "",
    classLevel: "",
    classLevelName: "",
    createdBy: `${authAdminInfo.firstName} ${authAdminInfo.lastName}`,
    adminId: authAdminInfo.adminId,
  });
  console.log(program);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setProgram({
      ...program,
      [e.target.name]: e.target.value,
    });
  };

  const handleProgram = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", program.name);
    formData.append("description", program.description);
    formData.append("classLevel", program.classLevel);
    formData.append("classLevelName", program.classLevelName);
    formData.append("createdBy", program.createdBy);
    formData.append("adminId", program.adminId);
    dispatch(createProgram(program));
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
      setProgram({ name: "", description: "" });
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [error, successMessage, createStatus, toast, toastOptions, navigate]);

  setTimeout(() => {
    if (createStatus === "success") {
      window.location.reload();
    }
  }, 2000);
  return (
    <div className="formWrap">
      <h3>Program Form</h3>
      <form onSubmit={handleProgram}>
        <div className="inputField">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleInputValues}
            placeholder=""
            value={program.name}
          />
        </div>
        <div className="inputField">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={handleInputValues}
            placeholder=""
            value={program.description}
          />
        </div>
        <div className="selector">
          <label htmlFor="classLevel">Class Level</label>
          <select
            className="select"
            value={program.classLevel}
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
          <label htmlFor="classLevelName">Class-Level Name</label>
          <select
            className="select"
            value={program.classLevelName}
            onChange={handleInputValues}
            name="classLevelName"
          >
            {classLevelNameOptions.map((classLevelName) => (
              <option
                key={classLevelName.label}
                value={classLevelName.value}
                className="selectOptions"
              >
                {classLevelName.label}
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
              "Create Program"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
