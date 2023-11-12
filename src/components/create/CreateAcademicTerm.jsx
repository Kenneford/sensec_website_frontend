import React, { useEffect, useState } from "react";
import "./create.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { academicYearOptions } from "../../options/options";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import { createAcademicYear } from "../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";
import { createAcademicTerm } from "../../features/academics/academicTerm/academicTermSlice";

export default function CreateAcademicTerm({ toast, toastOptions }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const { createTermStatus, successMessage, academicTermError } = useSelector(
    (state) => state.academicTerm
  );

  const dispatch = useDispatch();
  const [academicTerm, setAcademicTerm] = useState({
    name: "",
    description: "",
    createdBy: `${authAdminInfo.firstName} ${authAdminInfo.lastName}`,
    adminId: authAdminInfo.adminId,
  });
  console.log(academicTerm);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setAcademicTerm({
      ...academicTerm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAcademicTerm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", academicTerm.name);
    formData.append("description", academicTerm.description);
    formData.append("createdBy", academicTerm.createdBy);
    formData.append("adminId", academicTerm.adminId);
    dispatch(createAcademicTerm(academicTerm));
  };

  useEffect(() => {
    if (createTermStatus === "rejected") {
      academicTermError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (createTermStatus === "success") {
      setAcademicTerm({ name: "", description: "" });
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [
    academicTermError,
    successMessage,
    createTermStatus,
    toast,
    toastOptions,
    navigate,
  ]);

  return (
    <div className="formWrap">
      <h3>Academic Term Form</h3>
      <form onSubmit={handleAcademicTerm}>
        <div className="inputField">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleInputValues}
            placeholder=""
            value={academicTerm.name}
          />
        </div>
        <div className="inputField">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            onChange={handleInputValues}
            placeholder=""
            value={academicTerm.description}
          />
        </div>
        <div className="addStudentBtnWrap">
          <button
            className="addStudentBtn"
            type="submit"
            //   disabled={!canSave || registerStudentStatus === "pending"}
          >
            {createTermStatus === "pending" ? (
              <CircularProgress style={{ color: "white", size: "20px" }} />
            ) : (
              "Create Academic Term"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
