//StudentUpdateSelf
// import "./studentUpdateSelf.scss";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import set from "lodash/set";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  academicYearOptions,
  classLevelOptions,
  complexionOptions,
  genderOptions,
  otherTongueOptions,
  programOptions,
  regionOptions,
  religionOptions,
  studentRoleOptions,
} from "../../../options/options";
import { getAdminInfo } from "../../../features/admin/adminsSlice";
import {
  fetchStudents,
  getAllStudents,
  getStudentInfo,
  studentUpdate,
} from "../../../features/student/studentsSlice";

export default function AdminUpdateStudent({
  // updatedStudent,
  // setUpdatedStudent,
  toastOptions,
  toast,
}) {
  const {
    fetchingStudentStatus,
    searchStatus,
    updateStudentStatus,
    studentError,
    studentSuccessMessage,
  } = useSelector((state) => state.student);
  const authAdminInfo = useSelector(getAdminInfo);
  const allStudents = useSelector(getAllStudents);
  const studentInfo = useSelector(getStudentInfo);
  console.log(allStudents);
  console.log(studentInfo);

  const [num] = useState(Math.floor(1000000 + Math.random() * 9000000));
  const [date] = useState(new Date().toDateString());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentId } = useParams();
  console.log(studentId);
  const { student_name } = useParams();
  console.log(num);
  console.log(date);

  const [loadProfileImage, setLoadProfileImage] = useState("");
  const [showpass, setShowPass] = useState(false);
  const [showConfirmpass, setShowConfirmPass] = useState(false);

  const showPassword = () => setShowPass(!showpass);
  const showConfirmPassword = () => setShowConfirmPass(!showConfirmpass);

  const selectedStudent = allStudents.find(
    (std) => std.studentId === studentId
  );
  console.log(selectedStudent);
  // const [student] = useState(selectedStudent);
  // console.log(student);

  const [updatedStudent, setUpdatedStudent] = useState(selectedStudent);
  console.log(updatedStudent);

  useEffect(() => {
    // keeping student data in state
    setUpdatedStudent(selectedStudent);
  }, [selectedStudent]);

  const handleInputValues = (e) => {
    setUpdatedStudent({
      ...updatedStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageFileUpload = (e) => {
    if (e.target.files.length !== 0) {
      setUpdatedStudent({
        ...updatedStudent,
        [e.target.name]: e.target.files[0],
      });
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setLoadProfileImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(updatedStudent);

    // if (updatedStudent.profilePicture || !loadProfileImage) {
    // toast.success("Please upload student's image!", {
    //   position: "top-right",
    //   theme: "dark",
    //   // toastId: successId,
    // });
    dispatch(
      studentUpdate({
        id: updatedStudent.studentId,
        firstName: updatedStudent.firstName,
        lastName: updatedStudent.lastName,
        dateOfBirth: updatedStudent.dateOfBirth,
        placeOfBirth: updatedStudent.placeOfBirth,
        gender: updatedStudent.gender,
        jhsAttended: updatedStudent.jhsAttended,
        shsAttended: updatedStudent.shsAttended,
        nationality: updatedStudent.nationality,
        district: updatedStudent.district,
        address: updatedStudent.address,
        currentCity: updatedStudent.currentCity,
        homeTown: updatedStudent.homeTown,
        region: updatedStudent.region,
        email: updatedStudent.email,
        role: updatedStudent.role,
        currentClassLevel: updatedStudent.currentClassLevel,
        program: updatedStudent.program,
        academicYear: updatedStudent.academicYear,
        // religion: "",
        height: updatedStudent.height,
        weight: updatedStudent.weight,
        motherTongue: updatedStudent.motherTongue,
        otherTongue: updatedStudent.otherTongue,
        complexion: updatedStudent.complexion,
        updatedBy: `${authAdminInfo.firstName} ${authAdminInfo.lastName}`,
        updatedByAdminId: `${authAdminInfo.adminId}`,
        updatedDate: date,
      })
    );
    // } else {
    //   toast.error("Failed to update student! Try again later!", {
    //     position: "top-right",
    //     theme: "light",
    //     // toastId: successId,
    //   });
    // }
  };
  const canSave =
    Boolean(updatedStudent?.firstName) && Boolean(updatedStudent.lastName);
  console.log(canSave);

  useEffect(() => {
    if (updateStudentStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (updateStudentStatus === "success") {
      // navigate("/sensec/admin/all_students");
      toast.success(studentSuccessMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
      // navigate("/sensec/admin/students/add_parents_guardian");
    }
  }, [
    studentError,
    studentSuccessMessage,
    updateStudentStatus,
    toast,
    toastOptions,
    navigate,
  ]);

  useEffect(() => {
    dispatch(fetchStudents());
    // dispatch(fetchSingleStudent(selectedStudent?.studentId));
  }, [dispatch]);
  return (
    <div className="registerWrap">
      <div className="register">
        <h1>EDIT STUDENT</h1>
        <div className="registerCont">
          <form onSubmit={handleUpdate}>
            <div className="studentProfile">
              <div className="title">
                <div className="studentImageWrap">
                  <div className="file">
                    <label className="profileImageUpload">
                      {updatedStudent?.profilePicture ? (
                        <img
                          className="profileImg"
                          src={updatedStudent?.profilePicture}
                          alt=""
                        />
                      ) : (
                        <>
                          {updatedStudent?.gender === "Male" && (
                            <img
                              className="profileImg"
                              src={"/assets/maleAvatar.png"}
                              alt=""
                            />
                          )}
                          {updatedStudent?.gender === "Female" && (
                            <img
                              className="profileImg"
                              src={"/assets/femaleAvatar.png"}
                              alt=""
                            />
                          )}
                          {updatedStudent?.gender === "" && (
                            <div className="noImg">
                              <p>"No Image"</p>
                            </div>
                          )}
                        </>
                      )}
                    </label>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      onChange={handleImageFileUpload}
                      name="profilePicture"
                      id="profilePicture"
                      accept=".png,.jpeg,.jpg"
                    />
                  </div>
                  <div className="studentId">
                    <h3>Student ID</h3>
                    <input
                      className="idInput"
                      type="text"
                      name="studentId"
                      placeholder={updatedStudent?.studentId}
                      onChange={handleInputValues}
                      value={updatedStudent?.studentId}
                      disabled="disabled"
                    />
                  </div>
                </div>
              </div>
              <div className="profileDateWrap">
                <h3>Student's Profile</h3>
                <div className="date">
                  <h3>Date Enrolled:</h3>
                  <input
                    className="dateInput"
                    type="text"
                    name="registedDate"
                    disabled="disabled"
                    onChange={handleInputValues}
                    value={updatedStudent?.dateEnrolled}
                  />
                </div>
              </div>
              <div className="studentDetails">
                <div className="left">
                  <div className="inputField">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="firstName"
                      value={updatedStudent?.firstName}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="lastName">Surname</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="lastName"
                      value={updatedStudent?.lastName}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="dateOfBirth"
                      value={updatedStudent?.dateOfBirth}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="placeOfBirth">Place Of Birth</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="placeOfBirth"
                      value={updatedStudent?.placeOfBirth}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="nationality">Nationality</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="nationality"
                      value={updatedStudent?.nationality}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="homeTown">Home Town</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="homeTown"
                      value={updatedStudent?.homeTown}
                    />
                  </div>
                  <div className="selector bottomSelect">
                    <label htmlFor="region">Region</label>
                    <select
                      className="select"
                      value={updatedStudent?.region}
                      onChange={handleInputValues}
                      name="region"
                    >
                      {regionOptions.map((region) => (
                        <option
                          key={region.label}
                          value={region.value}
                          className="selectOptions"
                        >
                          {region.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="middle">
                  <div className="inputField">
                    <label htmlFor="currentCity">Current City</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="currentCity"
                      value={updatedStudent?.currentCity}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="address">Residential Address</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="address"
                      value={updatedStudent?.address}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="height">Height</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="height"
                      value={updatedStudent?.height}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="weight">Weight</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="weight"
                      value={updatedStudent?.weight}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="email"
                      value={updatedStudent?.email}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="motherTongue">Mother Tongue</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="motherTongue"
                      value={updatedStudent?.motherTongue}
                    />
                  </div>
                  <div className="selector bottomSelect">
                    <label htmlFor="otherTongue">Other Tongues</label>
                    <select
                      className="select"
                      value={updatedStudent?.otherTongue}
                      onChange={handleInputValues}
                      name="otherTongue"
                    >
                      {otherTongueOptions.map((otherTongue) => (
                        <option
                          key={otherTongue.label}
                          value={otherTongue.value}
                          className="selectOptions"
                        >
                          {otherTongue.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="right updateRight">
                  <div className="selector">
                    <label htmlFor="gender">Gender</label>
                    <select
                      className="select"
                      value={updatedStudent?.gender}
                      onChange={handleInputValues}
                      name="gender"
                      id=""
                    >
                      {genderOptions.map((gender) => (
                        <option
                          key={gender.label}
                          value={gender.value}
                          className="selectOptions"
                        >
                          {gender.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="selector">
                    <label htmlFor="complexion">Complexion</label>
                    <select
                      className="select"
                      value={updatedStudent?.complexion}
                      onChange={handleInputValues}
                      name="complexion"
                      id=""
                    >
                      {complexionOptions.map((complexion) => (
                        <option
                          key={complexion.label}
                          value={complexion.value}
                          className="selectOptions"
                        >
                          {complexion.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="selector">
                    <label htmlFor="religion">Religion</label>
                    <select
                      className="select"
                      value={updatedStudent?.religion}
                      onChange={handleInputValues}
                      name="religion"
                    >
                      {religionOptions.map((religion) => (
                        <option
                          key={religion.label}
                          value={religion.value}
                          className="selectOptions"
                        >
                          {religion.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="selector">
                    <label htmlFor="academicYear">Academic Year</label>
                    <select
                      className="select"
                      value={updatedStudent?.academicYear?._id}
                      onChange={handleInputValues}
                      name="academicYear"
                    >
                      {academicYearOptions.map((academicYear) => (
                        <option
                          key={academicYear.label}
                          value={academicYear.value}
                          className="selectOptions"
                        >
                          {academicYear.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="selector">
                    <label htmlFor="role">Role</label>
                    <select
                      className="select"
                      value={updatedStudent?.role}
                      onChange={handleInputValues}
                      name="role"
                    >
                      {studentRoleOptions.map((role) => (
                        <option
                          key={role.label}
                          value={role.value}
                          className="selectOptions"
                        >
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="selector">
                    <label htmlFor="program">Program</label>
                    <select
                      className="select"
                      value={updatedStudent?.program?._id}
                      onChange={handleInputValues}
                      name="program"
                      id=""
                    >
                      {programOptions.map((program) => (
                        <option
                          key={program.label}
                          className="selectOptions"
                          value={program.value}
                        >
                          {program.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="selector">
                    <label htmlFor="currentClassLevel">Class Level</label>
                    <select
                      className="select"
                      value={updatedStudent?.currentClassLevel?._id}
                      onChange={handleInputValues}
                      name="currentClassLevel"
                    >
                      {classLevelOptions.map((classLevel) => (
                        <option
                          key={classLevel.label}
                          value={classLevel.value}
                          className="selectOptions"
                        >
                          {classLevel.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="addStudentBtnWrap">
              <p
                className="addStudentBtn cancelBtn"
                onClick={() => navigate(-1)}
              >
                Cancel
              </p>
              <button
                className="addStudentBtn"
                type="submit"
                disabled={!canSave}
              >
                Update Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
