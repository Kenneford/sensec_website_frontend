import React, { useEffect, useState } from "react";
import "./studentParentGuardian.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createStudentParent } from "../../../../features/student/studentsSlice";
import { useNavigate } from "react-router-dom";
import StudentParents from "../studentParents/StudentParents";
import StudentGuardian from "../studentGuardian/StudentGuardian";

export default function StudentParentGuardian({ toast, toastOptions }) {
  const { createParentStatus, studentError, studentSuccessMessage } =
    useSelector((state) => state.student);
  const [date] = useState(new Date().toDateString());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [parentsReg, setParentsReg] = useState(false);
  const [guardianReg, setGuardianReg] = useState(false);
  const [nonTeachingReg, setNonTeachingReg] = useState(false);

  const [newParent, setNewParent] = useState({
    studentId: "",
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
      toast.success(studentSuccessMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
      navigate("/sensec/admin/all_students");
    }
  }, [
    createParentStatus,
    studentError,
    studentSuccessMessage,
    toast,
    toastOptions,
    navigate,
  ]);

  return (
    <div className="parentsWrap">
      <h3 className="title">Student's Parents/Guardian Entry Form</h3>
      <div className="formContainer">
        <div className="staffCategories">
          <span
            className="span"
            onClick={() =>
              setParentsReg(
                !parentsReg,
                setGuardianReg(false),
                setNonTeachingReg(false)
              )
            }
          >
            Parents
          </span>
          <span
            className="span"
            onClick={() =>
              setGuardianReg(
                !guardianReg,
                setParentsReg(false),
                setNonTeachingReg(false)
              )
            }
          >
            Guardian
          </span>
        </div>
        {!parentsReg && !guardianReg && (
          <div className="selectText">
            <p>Select an option to add student's parents or guardian...</p>
          </div>
        )}
        {parentsReg && (
          <StudentParents toast={toast} toastOption={toastOptions} />
        )}
        {guardianReg && (
          <StudentGuardian toast={toast} toastOption={toastOptions} />
        )}
      </div>
    </div>
  );
}
