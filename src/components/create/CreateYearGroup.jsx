import React, { useEffect, useState } from "react";
import "./create.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { academicYearOptions } from "../../options/options";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { createYearGroup } from "../../features/oldStudents/OldStudentsSlice";
import { useNavigate } from "react-router-dom";
import {
  fetchAllYears,
  getAllAcademicYears,
} from "../../features/academics/academicYear/academicYearSlice";

export default function CreateYearGroup({ toast, toastOptions }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const { createStatus, successMessage, yearGroupError, fetchingStatus } =
    useSelector((state) => state.yearGroup);
  const allAcademicYears = useSelector(getAllAcademicYears);

  const dispatch = useDispatch();
  const [yearGroup, setYearGroup] = useState({
    yearGraduated: "",
    academicYear: "",
    description: "",
    createdBy: `${authAdminInfo.firstName} ${authAdminInfo.lastName}`,
    adminId: authAdminInfo.adminId,
  });
  console.log(yearGroup.academicYear);
  const navigate = useNavigate();
  const handleInputValues = (e) => {
    setYearGroup({
      ...yearGroup,
      [e.target.name]: e.target.value,
    });
  };

  const handleYearGroup = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("yearGraduated", yearGroup.yearGraduated);
    formData.append("academicYear", yearGroup.academicYear);
    formData.append("description", yearGroup.description);
    formData.append("createdBy", yearGroup.createdBy);
    formData.append("adminId", yearGroup.adminId);
    dispatch(createYearGroup(yearGroup));
  };

  useEffect(() => {
    if (createStatus === "rejected") {
      yearGroupError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (createStatus === "success") {
      setYearGroup({
        yearGraduated: "",
        academicYear: "",
        description: "",
      });
      // navigate("/sensec/admin/all_students");
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [
    yearGroupError,
    successMessage,
    createStatus,
    toast,
    toastOptions,
    navigate,
  ]);

  useEffect(() => {
    dispatch(fetchAllYears());
  }, [dispatch]);

  setTimeout(() => {
    if (createStatus === "success") {
      window.location.reload();
    }
  }, 2000);

  return (
    <div className="formWrap">
      <h3>Year Group's Form</h3>
      <form onSubmit={handleYearGroup}>
        <div className="inputField">
          <label htmlFor="yearGraduated">Graduation Year</label>
          <input
            type="text"
            name="yearGraduated"
            onChange={handleInputValues}
            placeholder=""
            value={yearGroup.yearGraduated}
          />
        </div>
        <div className="inputField">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={handleInputValues}
            placeholder=""
            value={yearGroup.description}
          />
        </div>
        <div className="selector">
          <label htmlFor="academicYear">Academic Year</label>
          <select
            className="select"
            value={yearGroup.academicYear}
            onChange={handleInputValues}
            name="academicYear"
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
            //   disabled={!canSave || createStatus === "pending"}
          >
            {createStatus === "pending" ? (
              <CircularProgress style={{ color: "white", size: "20px" }} />
            ) : (
              "Create Year Group"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
