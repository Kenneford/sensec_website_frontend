import React, { useEffect, useState } from "react";
import "./create.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  academicTermOptions,
  academicYearOptions,
  programOptions,
} from "../../options/options";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { createAcademicYear } from "../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";
import { createElectiveSubject } from "../../features/academics/createSubjects/electiveSubjectSlice";

export default function CreateElectiveSubject({ toast, toastOptions }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const { createStatus, successMessage, error } = useSelector(
    (state) => state.electiveSubject
  );

  const dispatch = useDispatch();
  const [electiveSubject, setElectiveSubject] = useState({
    name: "",
    description: "",
    academicTerm: "",
    program: "",
    createdBy: `${authAdminInfo.firstName} ${authAdminInfo.lastName}`,
    adminId: authAdminInfo.adminId,
  });
  console.log(electiveSubject);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setElectiveSubject({
      ...electiveSubject,
      [e.target.name]: e.target.value,
    });
  };

  const handleelectiveSubject = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", electiveSubject.name);
    formData.append("description", electiveSubject.description);
    formData.append("academicTerm", electiveSubject.academicTerm);
    formData.append("program", electiveSubject.program);
    formData.append("createdBy", electiveSubject.createdBy);
    formData.append("adminId", electiveSubject.adminId);
    dispatch(createElectiveSubject(electiveSubject));
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
      setElectiveSubject({ name: "", description: "" });
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [error, successMessage, createStatus, toast, toastOptions, navigate]);

  // setTimeout(() => {
  //   if (createStatus === "success") {
  //     navigate("#");
  //   }
  // }, 2000);
  return (
    <div className="formWrap">
      <h3>Elective Subject Form</h3>
      <form onSubmit={handleelectiveSubject}>
        <div className="inputField">
          <label htmlFor="name">Subject Name</label>
          <input
            type="text"
            name="name"
            onChange={handleInputValues}
            placeholder=""
            value={electiveSubject.name}
          />
        </div>
        <div className="inputField">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={handleInputValues}
            placeholder=""
            value={electiveSubject.description}
          />
        </div>
        <div className="selector">
          <label htmlFor="academicTerm">Academic Term</label>
          <select
            className="select"
            value={electiveSubject.academicTerm}
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
        <div className="selector">
          <label htmlFor="program">Program</label>
          <select
            className="select"
            value={electiveSubject.program}
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
        <div className="addStudentBtnWrap">
          <button
            className="addStudentBtn"
            type="submit"
            //   disabled={!canSave || registerStudentStatus === "pending"}
          >
            {createStatus === "pending" ? (
              <CircularProgress style={{ color: "white", size: "20px" }} />
            ) : (
              "Create E-Subject"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
