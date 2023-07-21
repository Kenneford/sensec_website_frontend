import React, { useEffect, useState } from "react";
// import "./studentParents.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStudentGuardian } from "../../../../features/student/studentsSlice";

export default function StudentGuardian({ toast, toastOptions }) {
  const { createGuardianStatus, studentError, studentSuccessMessage } =
    useSelector((state) => state.student);
  const [date] = useState(new Date().toDateString());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentNewStudent] = useState(
    localStorage.getItem("newStudentRegisteredId")
  );
  console.log(currentNewStudent);

  const [newGuardian, setNewGuardian] = useState({
    studentId: currentNewStudent,
    guardianName: "",
    motherName: "",
    email: "",
    address: "",
    phoneNumber: "",
    dateCreated: date,
  });

  const handleInputValues = (e) => {
    setNewGuardian({
      ...newGuardian,
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
    } = newGuardian;
    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("fatherName", fatherName);
    formData.append("motherName", motherName);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    formData.append("dateCreated", dateCreated);
    dispatch(createStudentGuardian(newGuardian));
  };

  const canSave =
    Boolean(newGuardian.studentId) &&
    Boolean(newGuardian.guardianName) &&
    Boolean(newGuardian.email) &&
    Boolean(newGuardian.address) &&
    Boolean(newGuardian.phoneNumber);
  console.log(canSave);

  useEffect(() => {
    if (createGuardianStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (createGuardianStatus === "success") {
      toast.success(studentSuccessMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
      navigate("/sensec/admin/all_students");
    }
  }, [
    createGuardianStatus,
    studentError,
    studentSuccessMessage,
    toast,
    toastOptions,
    navigate,
  ]);

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
            value={newGuardian.dateCreated}
          />
        </div>
      </div>
      <h3>Guardian Profile</h3>
      <div className="formWrap">
        <div className="parentsDetails">
          <div className="leftDetails">
            <div className="inputField">
              <label htmlFor="studentId">Student-Id</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="studentId"
                value={newGuardian.studentId}
              />
            </div>
            <div className="inputField">
              <label htmlFor="guardianName">Guardian's Name</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="guardianName"
                value={newGuardian.guardianName}
              />
            </div>
            <div className="inputField">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="address"
                value={newGuardian.address}
              />
            </div>
          </div>
          <div className="rightDetails">
            <div className="inputField">
              <label htmlFor="email">email</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="email"
                value={newGuardian.email}
              />
            </div>
            <div className="inputField">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="phoneNumber"
                value={newGuardian.phoneNumber}
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
            disabled={!canSave || createGuardianStatus === "pending"}
          >
            {createGuardianStatus === "pending" ? (
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
