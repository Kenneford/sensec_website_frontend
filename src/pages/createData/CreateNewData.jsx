import React, { useState } from "react";
import "./createNewData.scss";
import CreateAcademicYear from "../../components/create/CreateAcademicYear";
import CreateYearGroup from "../../components/create/CreateYearGroup";
import CreateAcademicTerm from "../../components/create/CreateAcademicTerm";
import CreateClassLevel from "../../components/create/CreateClassLevel";
import CreateClassSection from "../../components/create/CreateClassSection";
import CreateProgram from "../../components/create/CreateProgram";
import CreateElectiveSubject from "../../components/create/CreateElectiveSubject";
import CreateCoreSubject from "../../components/create/CreateCoreSubject";

export default function CreateNewData({ toast, toastOptions }) {
  const [showAcadmicYear, setShowAcadmicYear] = useState(false);
  const [showAcadmicTerm, setShowAcadmicTerm] = useState(false);
  const [showclassLevel, setShowClassLevel] = useState(false);
  const [showclassSection, setShowClassSection] = useState(false);
  const [showProgram, setShowProgram] = useState(false);
  const [showYearGroup, setShowYearGroup] = useState(false);
  const [showElectiveSubject, setShowElectiveSubject] = useState(false);
  const [showCoreSubject, setShowCoreSubject] = useState(false);
  console.log(showAcadmicYear);
  return (
    <div>
      <h1>Create New Data</h1>
      <div className="createWrap">
        <button
          className="createBtn"
          onClick={() =>
            setShowAcadmicYear(
              !showAcadmicYear,
              setShowYearGroup(false),
              setShowAcadmicTerm(false),
              setShowClassLevel(false),
              setShowClassSection(false),
              setShowProgram(false),
              setShowCoreSubject(false),
              setShowElectiveSubject(false)
            )
          }
        >
          A-Year
        </button>
        <button
          className="createBtn"
          onClick={() =>
            setShowYearGroup(
              !showYearGroup,
              setShowAcadmicYear(false),
              setShowAcadmicTerm(false),
              setShowClassLevel(false),
              setShowClassSection(false),
              setShowProgram(false),
              setShowCoreSubject(false),
              setShowElectiveSubject(false)
            )
          }
        >
          Year Group
        </button>
        <button
          className="createBtn"
          onClick={() =>
            setShowAcadmicTerm(
              !showAcadmicTerm,
              setShowYearGroup(false),
              setShowAcadmicYear(false),
              setShowClassLevel(false),
              setShowClassSection(false),
              setShowProgram(false),
              setShowCoreSubject(false),
              setShowElectiveSubject(false)
            )
          }
        >
          A-Term
        </button>
        <button
          className="createBtn"
          onClick={() =>
            setShowClassLevel(
              !showclassLevel,
              setShowAcadmicYear(false),
              setShowAcadmicTerm(false),
              setShowClassSection(false),
              setShowYearGroup(false),
              setShowProgram(false),
              setShowCoreSubject(false),
              setShowElectiveSubject(false)
            )
          }
        >
          Class Level
        </button>
        <button
          className="createBtn"
          onClick={() =>
            setShowProgram(
              !showProgram,
              setShowAcadmicYear(false),
              setShowAcadmicTerm(false),
              setShowClassLevel(false),
              setShowClassSection(false),
              setShowYearGroup(false),
              setShowCoreSubject(false),
              setShowElectiveSubject(false)
            )
          }
        >
          Program
        </button>
        <button
          className="createBtn"
          onClick={() =>
            setShowClassSection(
              !showclassSection,
              setShowAcadmicYear(false),
              setShowAcadmicTerm(false),
              setShowClassLevel(false),
              setShowYearGroup(false),
              setShowProgram(false),
              setShowCoreSubject(false),
              setShowElectiveSubject(false)
            )
          }
        >
          Class Section
        </button>
        <button
          className="createBtn"
          onClick={() =>
            setShowElectiveSubject(
              !showElectiveSubject,
              setShowAcadmicYear(false),
              setShowAcadmicTerm(false),
              setShowClassLevel(false),
              setShowClassSection(false),
              setShowYearGroup(false),
              setShowProgram(false),
              setShowCoreSubject(false)
            )
          }
        >
          E-Subject
        </button>
        <button
          className="createBtn"
          onClick={() =>
            setShowCoreSubject(
              !showCoreSubject,
              setShowAcadmicYear(false),
              setShowAcadmicTerm(false),
              setShowClassLevel(false),
              setShowClassSection(false),
              setShowYearGroup(false),
              setShowProgram(false),
              setShowElectiveSubject(false)
            )
          }
        >
          C-Subject
        </button>
      </div>
      {showAcadmicYear && (
        <CreateAcademicYear toastOptions={toastOptions} toast={toast} />
      )}
      {showAcadmicTerm && (
        <CreateAcademicTerm toastOptions={toastOptions} toast={toast} />
      )}
      {showclassLevel && (
        <CreateClassLevel toastOptions={toastOptions} toast={toast} />
      )}
      {showclassSection && (
        <CreateClassSection toastOptions={toastOptions} toast={toast} />
      )}
      {showYearGroup && (
        <CreateYearGroup toastOptions={toastOptions} toast={toast} />
      )}
      {showProgram && (
        <CreateProgram toastOptions={toastOptions} toast={toast} />
      )}
      {showElectiveSubject && (
        <CreateElectiveSubject toastOptions={toastOptions} toast={toast} />
      )}
      {showCoreSubject && (
        <CreateCoreSubject toastOptions={toastOptions} toast={toast} />
      )}
    </div>
  );
}
