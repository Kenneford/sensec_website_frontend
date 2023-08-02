import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createStudentParent } from "../../../../features/student/studentsSlice";
import { useNavigate } from "react-router-dom";

export default function StudentParents({ toast, toastOptions }) {
  const { createParentStatus, studentError, studentSuccessMessage } =
    useSelector((state) => state.student);
  const [date] = useState(new Date().toDateString());
  const [currentNewStudent] = useState(
    localStorage.getItem("newStudentRegisteredId")
  );
  console.log(currentNewStudent);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminReg, setAdminReg] = useState(false);
  const [teacherReg, setTeacherReg] = useState(false);
  const [nonTeachingReg, setNonTeachingReg] = useState(false);

  const [newParent, setNewParent] = useState({
    studentId: currentNewStudent,
    fatherName: "",
    motherName: "",
    email: "",
    address: "",
    phoneNumber: "",
    dateCreated: date,
  });

  const handleInputValues = (e) => {
    setNewParent({
      ...newParent,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const {
      studentId,
      fatherName,
      motherName,
      email,
      address,
      phoneNumber,
      dateCreated,
    } = newParent;
    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("fatherName", fatherName);
    formData.append("motherName", motherName);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    formData.append("dateCreated", dateCreated);
    dispatch(createStudentParent(newParent));
  };

  const canSave =
    Boolean(newParent.studentId) &&
    Boolean(newParent.fatherName) &&
    Boolean(newParent.motherName) &&
    Boolean(newParent.email) &&
    Boolean(newParent.address) &&
    Boolean(newParent.phoneNumber);
  console.log(canSave);

  useEffect(() => {
    if (createParentStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (createParentStatus === "success") {
      setNewParent({
        studentId: "",
        fatherName: "",
        motherName: "",
        email: "",
        address: "",
        phoneNumber: "",
      });
      toast.success(studentSuccessMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [
    createParentStatus,
    studentError,
    studentSuccessMessage,
    toast,
    toastOptions,
    navigate,
  ]);

  setTimeout(() => {
    if (createParentStatus === "success") {
      navigate("/sensec/admin/students");
    }
  }, 2000);

  return (
    <form onSubmit={handleRegister} className="form">
      <div className="dateWrap">
        <div className="date">
          <h3>Date:</h3>
          <input
            className="dateInput"
            type="text"
            name="dateEmployed"
            onChange={handleInputValues}
            value={newParent.dateCreated}
          />
        </div>
      </div>
      <h3>Parents Profile</h3>
      <div className="formWrap">
        <div className="parentsDetails">
          <div className="leftDetails">
            <div className="inputField">
              <label htmlFor="studentId">Student-Id</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="studentId"
                value={newParent.studentId}
              />
            </div>
            <div className="inputField">
              <label htmlFor="fatherName">Father's Name</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="fatherName"
                value={newParent.fatherName}
              />
            </div>
            <div className="inputField">
              <label htmlFor="motherName">Mother's Name</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="motherName"
                value={newParent.motherName}
              />
            </div>
          </div>
          <div className="rightDetails">
            <div className="inputField">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="address"
                value={newParent.placeOfBirth}
              />
            </div>
            <div className="inputField">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="email"
                value={newParent.homeTown}
              />
            </div>
            <div className="inputField">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="phoneNumber"
                value={newParent.currentCity}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="addStudentBtn">
        <div className="addStudentBtnWrap">
          <button
            className="addStudentBtn"
            type="submit"
            disabled={!canSave || createParentStatus === "pending"}
          >
            {createParentStatus === "pending" ? (
              <CircularProgress style={{ color: "white", size: "20px" }} />
            ) : (
              "Add Parent"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
