import React, { useEffect, useState } from "react";
import "./adminProgramesSubjects.scss";
import ProgramesForm from "./ProgramesForm";
import { useDispatch, useSelector } from "react-redux";
import SubjectsForm from "./SubjectsForm";
import {
  fetchAllProgrammes,
  getAllProgrammes,
} from "../../../features/academics/academics";

export default function AdminProgramesSubjects({ toast, toastOptions }) {
  const { addStatus, error, successMessage } = useSelector(
    (state) => state.academics
  );
  const allProgrammes = useSelector(getAllProgrammes);
  const [programe, setPrograme] = useState(false);
  const [subject, setSubject] = useState(false);
  console.log(allProgrammes);
  const dispatch = useDispatch();
  console.log(programe);
  console.log(subject);

  useEffect(() => {
    dispatch(fetchAllProgrammes());
  }, [dispatch]);

  useEffect(() => {
    if (addStatus === "rejected") {
      error.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (addStatus === "success") {
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [addStatus, error, successMessage, toast, toastOptions]);

  return (
    <div className="programesWrap">
      <h1>Programes & Subjects</h1>
      <div className="options">
        <button
          className="optionBtn"
          onClick={() => setPrograme(!programe, setSubject(false))}
        >
          Programe
        </button>
        <button
          className="optionBtn"
          onClick={() => setSubject(!subject, setPrograme(false))}
        >
          Subject
        </button>
      </div>
      <div className="forms">
        {programe && (
          <ProgramesForm toastOptions={toastOptions} toast={toast} />
        )}
        {subject && <SubjectsForm />}
      </div>
    </div>
  );
}
