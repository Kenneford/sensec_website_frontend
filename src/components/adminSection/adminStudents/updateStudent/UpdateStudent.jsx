import React, { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import set from "lodash/set";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../../../apiEndPoint/api";
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
} from "../../../../options/options";
import {
  studentUpdate,
  fetchSingleStudent,
  fetchStudents,
  getAllStudents,
  getStudentInfo,
} from "../../../../features/student/studentsSlice";
import { getAdminInfo } from "../../../../features/admin/adminsSlice";

export default function UpdateStudent({
  // newStudent,
  // setNewStudent,
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

  const selectedStudent = allStudents.find((std) => std._id === studentId);
  console.log(selectedStudent);
  // const [student] = useState(selectedStudent);
  // console.log(student);

  const [newStudent, setNewStudent] = useState({
    firstName: selectedStudent?.firstName,
    lastName: selectedStudent?.lastName,
    dateOfBirth: selectedStudent?.dateOfBirth,
    placeOfBirth: selectedStudent?.placeOfBirth,
    nationality: selectedStudent?.nationality,
    email: selectedStudent?.email,
    program: selectedStudent?.program,
    updatedBy: `${authAdminInfo.firstName} ${authAdminInfo.lastName}`,
    updatedByAdminId: `${authAdminInfo.adminId}`,
    academicYear: selectedStudent?.academicYear,
    // currentClassLevel: selectedStudent?.currentClassLevel._id,
    role: selectedStudent?.role,
    gender: selectedStudent?.gender,
    address: selectedStudent?.address,
    currentCity: selectedStudent?.currentCity,
    homeTown: selectedStudent?.homeTown,
    region: selectedStudent?.region,
    religion: selectedStudent?.religion,
    height: selectedStudent?.height,
    weight: selectedStudent?.weight,
    motherTongue: selectedStudent?.motherTongue,
    otherTongue: selectedStudent?.otherTongue,
    complexion: selectedStudent?.complexion,
    updatedDate: date,
  });

  useEffect(() => {
    setNewStudent(selectedStudent);
  }, [selectedStudent]);

  const handleInputValues = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageFileUpload = (e) => {
    if (e.target.files.length !== 0) {
      setNewStudent({ ...newStudent, [e.target.name]: e.target.files[0] });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLoadProfileImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(newStudent);
    const formData = new FormData();
    formData.append("_id", newStudent._id);
    formData.append("firstName", newStudent.firstName);
    formData.append("lastName", newStudent.lastName);
    formData.append("dateOfBirth", newStudent.dateOfBirth);
    formData.append("placeOfBirth", newStudent.placeOfBirth);
    formData.append("nationality", newStudent.nationality);
    formData.append("email", newStudent.email);
    formData.append("program", newStudent.program);
    formData.append("updatedBy", newStudent.updatedBy);
    formData.append("updatedByAdminId", newStudent.updatedByAdminId);
    formData.append("currentClassLevel", newStudent.currentClassLevel?._id);
    formData.append("program", newStudent.program?._id);
    formData.append("academicYear", newStudent.academicYear?._id);
    formData.append("gender", newStudent.gender);
    formData.append("role", newStudent.role);
    formData.append("profilePicture", newStudent.profilePicture);
    formData.append("address", newStudent.address);
    formData.append("currentCity", newStudent.currentCity);
    formData.append("homeTown", newStudent.homeTown);
    formData.append("region", newStudent.region);
    formData.append("religion", newStudent.religion);
    formData.append("height", newStudent.height);
    formData.append("weight", newStudent.weight);
    formData.append("motherTongue", newStudent.motherTongue);
    formData.append("otherTongue", newStudent.otherTongue);
    formData.append("complexion", newStudent.complexion);
    formData.append("updatedDate", newStudent.updatedDate);
    console.log(...formData);
    dispatch(
      studentUpdate({
        formData,
        id: newStudent._id,
        name: newStudent.firstName + newStudent.lastName,
      })
    );
  };
  const canSave =
    Boolean(newStudent?.firstName) && Boolean(newStudent.lastName);
  console.log(canSave);

  useEffect(() => {
    // if (updateStudentStatus === "rejected") {
    //   studentError.errorMessage.message.map((err) =>
    //     toast.error(err, {
    //       position: "top-right",
    //       theme: "light",
    //       // toastId: successId,
    //     })
    //   );
    //   return;
    // }
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
                    <label
                      htmlFor="profilePicture"
                      className="profileImageUpload"
                    >
                      {loadProfileImage || newStudent?.profilePicture ? (
                        <img
                          className="profileImg"
                          src={
                            loadProfileImage
                              ? loadProfileImage
                              : newStudent?.profilePicture
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          className="profileImg"
                          src={"/assets/maleAvatar.png"}
                          alt=""
                        />
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
                      placeholder={newStudent?.studentId}
                      onChange={handleInputValues}
                      value={newStudent?.studentId}
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
                    value={newStudent?.dateEnrolled}
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
                      value={newStudent?.firstName}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="lastName">Surname</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="lastName"
                      value={newStudent?.lastName}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="dateOfBirth"
                      value={newStudent?.dateOfBirth}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="placeOfBirth">Place Of Birth</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="placeOfBirth"
                      value={newStudent?.placeOfBirth}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="nationality">Nationality</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="nationality"
                      value={newStudent?.nationality}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="homeTown">Home Town</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="homeTown"
                      value={newStudent?.homeTown}
                    />
                  </div>
                  <div className="selector bottomSelect">
                    <label htmlFor="region">Region</label>
                    <select
                      className="select"
                      value={newStudent?.region}
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
                      value={newStudent?.currentCity}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="address">Residential Address</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="address"
                      value={newStudent?.address}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="height">Height</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="height"
                      value={newStudent?.height}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="weight">Weight</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="weight"
                      value={newStudent?.weight}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="email"
                      value={newStudent?.email}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="motherTongue">Mother Tongue</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="motherTongue"
                      value={newStudent?.motherTongue}
                    />
                  </div>
                  <div className="selector bottomSelect">
                    <label htmlFor="otherTongue">Other Tongues</label>
                    <select
                      className="select"
                      value={newStudent?.otherTongue}
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
                      value={newStudent?.gender}
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
                      value={newStudent?.complexion}
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
                      value={newStudent?.religion}
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
                      value={newStudent?.academicYear?._id}
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
                      value={newStudent?.role}
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
                      value={newStudent?.program?._id}
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
                      value={newStudent?.currentClassLevel?._id}
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
