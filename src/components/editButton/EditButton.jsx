import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function EditButton({
  firstName,
  lastName,
  teacher,
  staff,
  studentId,
  student,
}) {
  const navigate = useNavigate();
  const {} = useParams();
  const EditStaffBtn = () => {
    return (
      <button
        className="editBtn"
        onClick={() =>
          navigate(
            `/sensec/admin/edit?${
              teacher ? "_teacher" : "_staff_member"
            }?name=${firstName}_${lastName}`
          )
        }
      >
        Edit
      </button>
    );
  };
  const EditStudentBtn = () => {
    return (
      <button
        className="editBtn"
        onClick={() => navigate(`/sensec/admin/edit_student/${firstName}`)}
      >
        Edit
      </button>
    );
  };
  return <div>{teacher || staff ? <EditStaffBtn /> : <EditStudentBtn />}</div>;
}
