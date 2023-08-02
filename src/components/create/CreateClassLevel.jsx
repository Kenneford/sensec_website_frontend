import React, { useEffect, useState } from "react";
import "./create.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { academicYearOptions } from "../../options/options";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { createAcademicYear } from "../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";
import { createClassLevel } from "../../features/classLevels/classLevelsSlice";

export default function CreateClassLevel({ toast, toastOptions }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const { createStatus, successMessage, error } = useSelector(
    (state) => state.classLevel
  );

  const dispatch = useDispatch();
  const [classLevel, setClassLevel] = useState({
    name: "",
    description: "",
    createdBy: `${authAdminInfo.firstName} ${authAdminInfo.lastName}`,
    adminId: authAdminInfo.adminId,
  });
  console.log(classLevel);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setClassLevel({
      ...classLevel,
      [e.target.name]: e.target.value,
    });
  };

  const handleClassLevel = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", classLevel.name);
    formData.append("description", classLevel.description);
    formData.append("createdBy", classLevel.createdBy);
    formData.append("adminId", classLevel.adminId);
    dispatch(createClassLevel(classLevel));
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
      setClassLevel({ name: "", description: "" });
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
      <h3>Class Level Form</h3>
      <form onSubmit={handleClassLevel}>
        <div className="inputField">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleInputValues}
            placeholder=""
            value={classLevel.name}
          />
        </div>
        <div className="inputField">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={handleInputValues}
            placeholder=""
            value={classLevel.description}
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
              "Create Class Level"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}