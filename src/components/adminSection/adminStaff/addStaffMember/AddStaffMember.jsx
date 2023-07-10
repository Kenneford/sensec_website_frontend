import React, { useState } from "react";
import "./addStaff.scss";
import AdminEmployment from "../../adminEmployment/AdminEmploymentForm";
import TeacherEmploymentForm from "../../teacherEmploymentForm/TeacherEmploymentForm";
import NonTeachingEmploymentForm from "../../nonTeachingEmploymentForm/NonTeachingEmploymentForm";

export default function AddStaffMember({ toast, toastOptions }) {
  const [adminReg, setAdminReg] = useState(false);
  const [teacherReg, setTeacherReg] = useState(false);
  const [nonTeachingReg, setNonTeachingReg] = useState(false);
  return (
    <div className="registerWrap">
      <div className="register">
        <h1>NEW STAFF MEMBER REGISTRATION</h1>
        <div className="registerCont">
          <div className="staffCategories">
            <span
              className="span"
              onClick={() =>
                setAdminReg(
                  !adminReg,
                  setTeacherReg(false),
                  setNonTeachingReg(false)
                )
              }
            >
              Admin
            </span>
            <span
              className="span"
              onClick={() =>
                setTeacherReg(
                  !teacherReg,
                  setAdminReg(false),
                  setNonTeachingReg(false)
                )
              }
            >
              Teacher
            </span>
            <span
              className="span"
              onClick={() =>
                setNonTeachingReg(
                  !nonTeachingReg,
                  setAdminReg(false),
                  setTeacherReg(false)
                )
              }
            >
              Non-Teaching Staff
            </span>
          </div>
          {!adminReg && !teacherReg && !nonTeachingReg && (
            <div className="selectText">
              <p>Select an option to employ a new staff member...</p>
            </div>
          )}
          {adminReg ? (
            <AdminEmployment toast={toast} toastOptions={toastOptions} />
          ) : teacherReg ? (
            <TeacherEmploymentForm toast={toast} toastOptions={toastOptions} />
          ) : nonTeachingReg ? (
            <NonTeachingEmploymentForm
              toast={toast}
              toastOptions={toastOptions}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
