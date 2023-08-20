import React, { useEffect } from "react";
import "./programOverView.scss";
import { useNavigate, useParams } from "react-router";
import {
  fetchAllProgrammes,
  fetchSingleProgram,
  getAllProgrammes,
  getSingleProgram,
} from "../../features/academics/academics";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { studentProgramColumn } from "../../options/options";

export default function ProgramOverView() {
  const allProgrammes = useSelector(getAllProgrammes);
  const singleProgram = useSelector(getSingleProgram);
  const dispatch = useDispatch();
  const { programName } = useParams();
  console.log(programName);

  const selectedProgram = allProgrammes.find(
    (prgrm) => prgrm.name === programName
  );
  const oneProgram = allProgrammes.find((prgrm) => prgrm.name === programName);
  console.log(selectedProgram);
  console.log(singleProgram);

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "#555",
        color: "#fff",
      },
    },
    headColumn: {
      style: {
        border: "1rem solid red",
        // color: "#fff",
      },
    },
    headCells: {
      style: {
        fontSize: "1.2rem",
        // borderLeft: ".2rem solid red",
        // backgroundColor: "blue",
        // color: "#fff",
      },
    },
    cells: {
      style: {
        // backgroundColor: "#cccc",
        // color: "#fff",
        paddingTop: ".5rem",
        paddingBottom: ".5rem",
        // marginTop: ".5rem",
        // marginBottom: ".5rem",
      },
    },
  };

  useEffect(() => {
    // dispatch(fetchAllProgrammes());
    dispatch(fetchSingleProgram(programName));
  }, [dispatch, programName]);

  return (
    <div>
      <h1>{singleProgram.name}</h1>
      <div className="prgrmInfo">
        <p>Total Students = {singleProgram.students?.length}</p>
        <p>Total Subjects = {singleProgram.electiveSubjects?.length}</p>
        <div className="subjectLists">
          {singleProgram.electiveSubjects?.map((sbj) => (
            <p className="subjectName" key={sbj._id}>
              {sbj.name}
            </p>
          ))}
        </div>
      </div>
      <div className="totalStudentsWrap">
        <div className="totalStudentsCont">
          <DataTable
            columns={studentProgramColumn}
            data={singleProgram.students}
            customStyles={customStyle}
            pagination
          />
        </div>
      </div>
    </div>
  );
}
