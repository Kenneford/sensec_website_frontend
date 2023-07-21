import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { getAdminInfo } from "../../../features/admin/adminsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addProgram } from "../../../features/academics/academics";

export default function ProgramesForm({ toast, toastOptions }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const { addStatus } = useSelector((state) => state.academics);

  const dispatch = useDispatch();
  const [program, setProgram] = useState({
    name: "",
    adminId: authAdminInfo.adminId,
    description: "",
    createdBy: authAdminInfo.firstName,
  });
  console.log(program);
  const handleInputValues = (e) => {
    setProgram({
      ...program,
      [e.target.name]: e.target.value,
    });
  };

  const handleProgrameAdd = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", program.name);
    formData.append("adminId", program.adminId);
    formData.append("description", program.description);
    formData.append("createdBy", program.createdBy);
    dispatch(addProgram(program));
  };

  return (
    <div>
      <h3>Programes Form</h3>
      <div className="formWrap">
        <form onSubmit={handleProgrameAdd}>
          {/* <div className="inputField">
            <label htmlFor="adminId">Admin's Id</label>
            <input
              type="text"
              name="adminId"
              onChange={handleInputValues}
              placeholder=""
              value={program.adminId}
            />
          </div> */}
          <div className="inputField">
            <label htmlFor="name">Program's Name</label>
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
          {/* <div className="inputField">
            <label htmlFor="createdBy">Created By</label>
            <input
              type="text"
              name="createdBy"
              onChange={handleInputValues}
              placeholder=""
              value={program.createdBy}
            />
          </div> */}
          <div className="addStudentBtnWrap">
            <button
              className="addStudentBtn"
              type="submit"
              //   disabled={!canSave || registerStudentStatus === "pending"}
            >
              {addStatus === "pending" ? (
                <CircularProgress style={{ color: "white", size: "20px" }} />
              ) : (
                "Add Program"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
