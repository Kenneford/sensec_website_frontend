import React, { useEffect, useState } from "react";
import "./create.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { academicYearOptions } from "../../options/options";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { createAcademicYear } from "../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";

export default function CreateClassSection({ toast, toastOptions }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const { createStatus, successMessage, academicYearError } = useSelector(
    (state) => state.academicYear
  );

  const dispatch = useDispatch();
  const [classSection, setClassSection] = useState({
    name: "",
    description: "",
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
    dispatch(createAcademicYear(classSection));
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
      setClassSection({ name: "", description: "" });
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
      <h3>Class Section Form</h3>
      <form onSubmit={handleClassSection}>
        <div className="inputField">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleInputValues}
            placeholder=""
            value={classSection.name}
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
        <div className="addStudentBtnWrap">
          <button
            className="addStudentBtn"
            type="submit"
            //   disabled={!canSave || registerStudentStatus === "pending"}
          >
            {createStatus === "pending" ? (
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
