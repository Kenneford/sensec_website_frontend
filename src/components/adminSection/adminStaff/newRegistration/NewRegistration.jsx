import React, { useState } from "react";
import "./newRegistration.scss";
import AdminEmployment from "../../adminEmployment/AdminEmploymentForm";
import TeacherEmploymentForm from "../../teacherEmploymentForm/TeacherEmploymentForm";
import NonTeachingEmploymentForm from "../../nonTeachingEmploymentForm/NonTeachingEmploymentForm";
import { Outlet, useNavigate } from "react-router-dom";

export default function NewRegistration({ toast, toastOptions }) {
  const navigate = useNavigate();
  const [adminReg, setAdminReg] = useState(false);
  const [teacherReg, setTeacherReg] = useState(false);
  const [nonTeachingReg, setNonTeachingReg] = useState(false);
  return (
    <div className="registerNewWrap">
      <div className="register">
        <h1>NEW REGISTRATION</h1>
        <div className="registerCont">
          <div className="staffCategories">
            <button
              className="button"
              onClick={() => navigate("/sensec/admin/register/new_student")}
            >
              Student
            </button>
            <button
              className="button"
              onClick={() => navigate("/sensec/admin/register/new_admin")}
            >
              Admin
            </button>
            <button
              className="button"
              onClick={() => navigate("/sensec/admin/register/new_teacher")}
            >
              Teacher
            </button>
            <button
              className="button"
              onClick={() =>
                navigate("/sensec/admin/register/new_non_teacheing_staff")
              }
            >
              Non-Teaching Staff
            </button>
          </div>
          {/* {!adminReg && !teacherReg && !nonTeachingReg && (
            <div className="selectText">
              <p>Select an option to employ a new staff member...</p>
            </div>
          )} */}
          {/* {adminReg && (
            <AdminEmployment toast={toast} toastOptions={toastOptions} />
          )}
          {teacherReg && (
            <TeacherEmploymentForm toast={toast} toastOptions={toastOptions} />
          )}{" "}
          {nonTeachingReg && (
            <NonTeachingEmploymentForm
              toast={toast}
              toastOptions={toastOptions}
            />
          )} */}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
