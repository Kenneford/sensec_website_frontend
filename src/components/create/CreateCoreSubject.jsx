import React, { useEffect, useState } from "react";
import "./create.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { academicYearOptions, programOptions } from "../../options/options";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { createAcademicYear } from "../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";

export default function CreateCoreSubject({ toast, toastOptions }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const { createStatus, successMessage, academicYearError } = useSelector(
    (state) => state.academicYear
  );

  const dispatch = useDispatch();
  const [coreSubject, setCoreSubject] = useState({
    name: "",
    description: "",
    academicTerm: "",
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
    formData.append("createdBy", coreSubject.createdBy);
    formData.append("adminId", coreSubject.adminId);
    dispatch(createAcademicYear(coreSubject));
  };

  useEffect(() => {
    if (createStatus === "rejected") {
      academicYearError.errorMessage.message.map((err) =>
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
  }, [
    academicYearError,
    successMessage,
    createStatus,
    toast,
    toastOptions,
    navigate,
  ]);

  setTimeout(() => {
    if (createStatus === "success") {
      navigate("#");
    }
  }, 2000);
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
          <label htmlFor="academicTerm">Academic Term</label>
          <select
            className="select"
            value={coreSubject.academicTerm}
            onChange={handleInputValues}
            name="academicTerm"
          >
            {academicYearOptions.map((year) => (
              <option
                key={year.label}
                value={year.value}
                className="selectOptions"
              >
                {year.label}
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
