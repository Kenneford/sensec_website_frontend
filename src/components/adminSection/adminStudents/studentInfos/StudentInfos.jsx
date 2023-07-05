import React, { useEffect } from "react";
import "./studentInfos.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleStudent,
  getStudentInfo,
} from "../../../../features/student/studentsSlice";

export default function StudentInfos() {
  const studentInfo = useSelector(getStudentInfo);
  const dispatch = useDispatch();
  const { studentId } = useParams();
  console.log(studentId);
  console.log(studentInfo);

  useEffect(() => {
    dispatch(fetchSingleStudent(studentId));
  }, [dispatch, studentId]);
  return (
    <div className="profileWrap">
      <div className="studentImage">
        <img src={studentInfo.profilePicture} alt="" />
        <div>
          <h1>
            {studentInfo.firstName} {studentInfo.lastName}'s Profile
          </h1>
          <div className="studentId">
            <h3>ID: </h3>
            <p>{studentInfo.studentId}</p>
          </div>
        </div>
      </div>
      <div className="studentProfile">
        <div className="profileLine1">
          <div className="subInfo">
            <h3>Firstname:</h3>
            <p>{studentInfo.firstName}</p>
          </div>
          <div className="subInfo">
            <h3>Surname:</h3>
            <p>{studentInfo.lastName}</p>
          </div>
          <div className="subInfo">
            <h3>Date Of Birth:</h3>
            <p>{studentInfo.dateOfBirth}</p>
          </div>
          <div className="subInfo">
            <h3>Place Of Birth:</h3>
            <p>{studentInfo.placeOfBirth}</p>
          </div>
          <div className="subInfo">
            <h3>Gender:</h3>
            <p>{studentInfo.isMale ? "Male" : "Female"}</p>
          </div>
        </div>
        <hr />
        <div className="profileLine1">
          <div className="subInfo">
            <h3>HomeTown:</h3>
            <p>{studentInfo.homeTown}</p>
          </div>
          <div className="subInfo">
            <h3>Region:</h3>
            <p>{studentInfo.region}</p>
          </div>
          <div className="subInfo">
            <h3>Current City:</h3>
            <p>{studentInfo.currentCity}</p>
          </div>
          <div className="subInfo">
            <h3>Address:</h3>
            <p>{studentInfo.address}</p>
          </div>
          <div className="subInfo">
            <h3>email:</h3>
            <p>{studentInfo.email}</p>
          </div>
        </div>
        <hr />
        <div className="profileLine1">
          <div className="subInfo">
            <h3>Nationality:</h3>
            <p>{studentInfo.nationality}</p>
          </div>
          <div className="subInfo">
            <h3>Mother Tongue:</h3>
            <p>{studentInfo.motherTongue}</p>
          </div>
          <div className="subInfo">
            <h3>Other Tongue:</h3>
            <p>{studentInfo.otherTongue}</p>
          </div>
          <div className="subInfo">
            <h3>Religion:</h3>
            <p>{studentInfo.religion}</p>
          </div>
          <div className="subInfo">
            <h3>Complexion:</h3>
            <p>{studentInfo.complexion}</p>
          </div>
        </div>
        <hr />
        <div className="profileLine1">
          <div className="subInfo">
            <h3>Height:</h3>
            <p>{studentInfo.height}</p>
          </div>
          <div className="subInfo">
            <h3>Weight:</h3>
            <p>{studentInfo.weight}</p>
          </div>
          <div className="subInfo">
            <h3>Course Study:</h3>
            <p>{studentInfo.courseStudy}</p>
          </div>
          <div className="subInfo">
            <h3>Level:</h3>
            <p>{studentInfo.level}</p>
          </div>
          <div className="subInfo">
            <h3>Registed By:</h3>
            <p>
              {studentInfo.studentRegistrar?.registrarFirstName} {""}
              {studentInfo.studentRegistrar?.registrarlastName}
            </p>
          </div>
        </div>
        <hr />
        <div className="profileLine1">
          <div className="subInfo">
            <h3>Enrolled Date:</h3>
            <p>{studentInfo.registedDate}</p>
          </div>
        </div>
        <hr />
      </div>
      <div className="studentParentsProfileWrap">
        <h2>Parents/Guardian Profile</h2>
        <div className="studentParentsProfile">
          <div className="parentLeft">
            <div className="image">
              <img
                src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt=""
              />
              <h3>Father</h3>
            </div>
            <div className="profileLine1">
              <div className="subInfo">
                <h3>Enrolled Date:</h3>
                <p>{studentInfo?.father?.fatherName}</p>
              </div>
              <hr />
              <div className="subInfo">
                <h3>Enrolled Date:</h3>
                <p>{studentInfo?.father?.fatherOccupation}</p>
              </div>
              <hr />
              <div className="subInfo">
                <h3>Enrolled Date:</h3>
                <p>{studentInfo?.father?.fatherPhoneNumber}</p>
              </div>
              <hr />
              <div className="subInfo">
                <h3>Enrolled Date:</h3>
                <p>{studentInfo?.father?.fatherEmail}</p>
              </div>
              <hr />
            </div>
          </div>
          <div className="parentMiddle">
            <div className="image">
              <img
                src="https://images.unsplash.com/photo-1581464907815-29bdb6343d3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt=""
              />
              <h3>Mother</h3>
            </div>
            <div className="profileLine1">
              <div className="subInfo">
                <h3>Enrolled Date:</h3>
                <p>{studentInfo?.mother?.motherName}</p>
              </div>
              <hr />
              <div className="subInfo">
                <h3>Enrolled Date:</h3>
                <p>{studentInfo?.mother?.motherOccupation}</p>
              </div>
              <hr />
              <div className="subInfo">
                <h3>Enrolled Date:</h3>
                <p>{studentInfo?.mother?.motherPhoneNumber}</p>
              </div>
              <hr />
              <div className="subInfo">
                <h3>Enrolled Date:</h3>
                <p>{studentInfo?.mother?.motherEmail}</p>
              </div>
              <hr />
            </div>
          </div>
          <div className="parentRight">
            <div className="image">
              <img
                src="https://images.unsplash.com/photo-1619380061814-58f03707f082?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt=""
              />
              <h3>Guardian</h3>
            </div>
            <div className="profileLine1">
              <div className="subInfo">
                <h3>Enrolled Date:</h3>
                <p>{studentInfo?.guardian?.guardianName}</p>
              </div>
              <hr />
              <div className="subInfo">
                <h3>Enrolled Date:</h3>
                <p>{studentInfo?.guardian?.guardianOccupation}</p>
              </div>
              <hr />
              <div className="subInfo">
                <h3>Enrolled Date:</h3>
                <p>{studentInfo?.guardian?.guardianPhoneNumber}</p>
              </div>
              <hr />
              <div className="subInfo">
                <h3>Enrolled Date:</h3>
                <p>{studentInfo?.guardian?.guardianEmail}</p>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
