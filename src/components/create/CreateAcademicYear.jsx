import React, { useEffect, useState } from "react";
import "./create.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { academicYearOptions } from "../../options/options";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { createAcademicYear } from "../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";

export default function CreateAcademicYear({ toast, toastOptions }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const { createStatus, successMessage, academicYearError } = useSelector(
    (state) => state.academicYear
  );

  const dispatch = useDispatch();
  const [academicYear, setAcademicYear] = useState({
    name: "",
    fromYear: "",
    toYear: "",
    createdBy: `${authAdminInfo.firstName} ${authAdminInfo.lastName}`,
    adminId: authAdminInfo.adminId,
  });
  console.log(academicYear);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setAcademicYear({
      ...academicYear,
      [e.target.name]: e.target.value,
    });
  };

  const handleAcademicYear = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", academicYear.name);
    formData.append("fromYear", academicYear.fromYear);
    formData.append("toYear", academicYear.toYear);
    formData.append("createdBy", academicYear.createdBy);
    formData.append("adminId", academicYear.adminId);
    dispatch(createAcademicYear(academicYear));
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
      setAcademicYear({ name: "", fromYear: "", toYear: "" });
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

  return (
    <div className="formWrap">
      <h3>Academic Year Form</h3>
      <form onSubmit={handleAcademicYear}>
        <div className="inputField">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleInputValues}
            placeholder=""
            value={academicYear.name}
          />
        </div>
        <div className="inputField">
          <label htmlFor="fromYear">From</label>
          <input
            type="text"
            name="fromYear"
            onChange={handleInputValues}
            placeholder=""
            value={academicYear.fromYear}
          />
        </div>
        <div className="inputField">
          <label htmlFor="toYear">To</label>
          <input
            type="text"
            name="toYear"
            onChange={handleInputValues}
            placeholder=""
            value={academicYear.toYear}
          />
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
              "Create Academic Year"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
