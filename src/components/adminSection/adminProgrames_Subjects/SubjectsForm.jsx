import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { getAdminInfo } from "../../../features/admin/adminsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addSubject } from "../../../features/academics/academics";

export default function SubjectsForm({ toast, toastOptions }) {
  const authAdminInfo = useSelector(getAdminInfo);
  const { addStatus } = useSelector((state) => state.academics);

  const dispatch = useDispatch();
  const [subject, setSubject] = useState({
    name: "",
    adminId: authAdminInfo.adminId,
    description: "",
    academicTerm: "",
    programId: "",
    createdBy: authAdminInfo.firstName,
  });
  console.log(subject);
  const handleInputValues = (e) => {
    setSubject({
      ...subject,
      [e.target.name]: e.target.value,
    });
  };

  const handleProgrameAdd = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", subject.name);
    formData.append("adminId", subject.adminId);
    formData.append("description", subject.description);
    formData.append("academicTerm", subject.academicTerm);
    formData.append("programId", subject.programId);
    formData.append("createdBy", subject.createdBy);
    dispatch(addSubject({ formData, programId: subject.programId }));
  };

  return (
    <div>
      <h3>Subjects Form</h3>
      <div className="formWrap">
        <form onSubmit={handleProgrameAdd}>
          <div className="inputField">
            <label htmlFor="name">Program's Name</label>
            <input
              type="text"
              name="name"
              onChange={handleInputValues}
              placeholder=""
              value={subject.name}
            />
          </div>
          <div className="inputField">
            <label htmlFor="programId">Program's Id</label>
            <input
              type="text"
              name="programId"
              onChange={handleInputValues}
              placeholder=""
              value={subject.programId}
            />
          </div>
          <div className="inputField">
            <label htmlFor="academicTerm">Academic Term</label>
            <input
              type="text"
              name="academicTerm"
              onChange={handleInputValues}
              placeholder=""
              value={subject.academicTerm}
            />
          </div>
          <div className="inputField">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              onChange={handleInputValues}
              placeholder=""
              value={subject.description}
            />
          </div>
          {/* <div className="inputField">
            <label htmlFor="createdBy">Created By</label>
            <input
              type="text"
              name="createdBy"
              onChange={handleInputValues}
              placeholder=""
              value={subject.createdBy}
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
                "Add Subject"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
