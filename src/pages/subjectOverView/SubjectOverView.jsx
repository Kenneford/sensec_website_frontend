import React, { useEffect } from "react";
import "./subjectOverView.scss";
import { useNavigate, useParams } from "react-router";
import {
  fetchAllProgrammes,
  fetchSingleProgram,
  fetchSingleSubject,
  getAllProgrammes,
  getSingleProgram,
  getSingleSubject,
} from "../../features/academics/academics";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import {
  studentProgramColumn,
  teachersColumn,
  teachersSubjectColumn,
} from "../../options/options";

export default function SubjectOverView() {
  const allProgrammes = useSelector(getAllProgrammes);
  const singleSubject = useSelector(getSingleSubject);
  const dispatch = useDispatch();
  const { subjectName } = useParams();
  console.log(subjectName);

  const selectedProgram = allProgrammes.find(
    (prgrm) => prgrm.name === subjectName
  );
  const oneProgram = allProgrammes.find((prgrm) => prgrm.name === subjectName);
  console.log(selectedProgram);
  console.log(singleSubject);

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
    dispatch(fetchSingleSubject(subjectName));
  }, [dispatch, subjectName]);

  return (
    <div>
      <h1>{singleSubject.name}</h1>
      <div className="prgrmInfo">
        <p>Total Teachers = {singleSubject.teachers?.length}</p>
        <p>Total Students = 0{singleSubject.students?.length}</p>
        <div className="subjectLists">
          {singleSubject.subjects?.map((sbj) => (
            <p className="subjectName" key={sbj._id}>
              {sbj.name}
            </p>
          ))}
        </div>
      </div>
      <div className="totalTeachersWrap">
        <div className="totalTeachersCont">
          <DataTable
            columns={teachersSubjectColumn}
            data={singleSubject.teachers}
            customStyles={customStyle}
            pagination
          />
        </div>
      </div>
    </div>
  );
}
