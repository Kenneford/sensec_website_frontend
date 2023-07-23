import React, { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import set from "lodash/set";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../../../apiEndPoint/api";
import axios from "axios";
import {
  fetchSingleStudent,
  getAllStudents,
  getStudentInfo,
  studentUpdate,
} from "../../../../features/student/studentsSlice";

const religionOptions = [
  { value: "None", label: "None" },
  { value: "Christian", label: "Christian" },
  { value: "Islamic", label: "Islamic" },
  { value: "Traditional", label: "Traditional" },
  { value: "Others", label: "Others" },
];
const otherTongueOptions = [
  { value: "English", label: "English" },
  // { value: "Hausa", label: "Hausa" },
  // { value: "French", label: "French" },
  // { value: "Spanish", label: "Spanish" },
  // { value: "Deutsch", label: "Deutsch" },
];
const regionOptions = [
  { value: "None", label: "None" },
  { value: "Greater Accra", label: "Greater Accra" },
  { value: "Ashanti", label: "Ashanti" },
  { value: "Volta", label: "Volta" },
  { value: "Northern", label: "Northern" },
  { value: "Central", label: "Central" },
  { value: "Eastern", label: "Eastern" },
  { value: "Western", label: "Western" },
  { value: "Oti", label: "Oti" },
  { value: "Bono East", label: "Bono East" },
  { value: "Western North", label: "Western North" },
  { value: "Bono", label: "Bono" },
  { value: "Brong Ahafo", label: "Brong Ahafo" },
  { value: "Ahafo", label: "Ahafo" },
  { value: "Upper West", label: "Upper West" },
  { value: "Upper East", label: "Upper East" },
  { value: "North East", label: "North East" },
];
const complexionOptions = [
  { value: "None", label: "None" },
  { value: "Very Fair/Ivory", label: "Very Fair/Ivory" },
  { value: "Fair", label: "Fair" },
  { value: "Medium/Normal", label: "Medium/Normal" },
  { value: "Olive", label: "Olive" },
  { value: "Brown", label: "Brown" },
  { value: "Black", label: "Black" },
];
export default function UpdateStudent({
  // newStudent,
  // setNewStudent,
  toastOptions,
  toast,
}) {
  const { updateStatus, studentError, studentSuccessMessage } = useSelector(
    (state) => state.student
  );
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

  const [newStudent, setNewStudent] = useState({
    firstName: selectedStudent?.firstName,
    lastName: selectedStudent?.lastName,
    dateOfBirth: selectedStudent?.dateOfBirth,
    placeOfBirth: selectedStudent?.placeOfBirth,
    nationality: selectedStudent?.nationality,
    // password: selectedStudent.,
    // confirmPassword: selectedStudent.,
    email: selectedStudent?.email,
    studentId: selectedStudent?.studentId,
    courseStudy: selectedStudent?.courseStudy,
    studentRegistrar: selectedStudent?.studentRegistrar,
    studentRegistrarId: selectedStudent?.studentRegistrarId,
    classLevel: selectedStudent?.classLevel,
    isMale: selectedStudent?.isMale,
    profilePicture: selectedStudent?.profilePicture,
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
    registedDate: date,
  });

  const handleRegionInput = (regionSelected) => {
    const region = regionSelected.value;
    setNewStudent({
      ...newStudent,
      region: region,
    });
  };
  const handleReligionInput = (religionSelected) => {
    const religion = religionSelected.value;
    setNewStudent({
      ...newStudent,
      religion: religion,
    });
  };
  const handleComplexionInput = (complexionSelected) => {
    const complexion = complexionSelected.value;
    setNewStudent({
      ...newStudent,
      complexion: complexion,
    });
  };
  const handleotherTongueInput = (otherTongueSelected) => {
    console.log(otherTongueSelected);
    const otherTongue = otherTongueSelected.map((lang) => {
      return lang.value;
    });
    setNewStudent({
      ...newStudent,
      otherTongue: otherTongue,
    });
  };

  const selectorStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? "grey" : "transparent",
      borderRadius: "none",
      padding: ".4rem",
    }),
    options: (styles, { data, isDisabled, isFocused, isSelected }) => {
      console.log(data, isDisabled, isFocused, isSelected);
    },
    menu: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#292929",
      color: " white",
      ":hover": {
        backgroundColor: "#292929",
        color: "white",
      },
    }),
  };

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
    formData.append("firstName", newStudent.firstName);
    formData.append("lastName", newStudent.lastName);
    formData.append("dateOfBirth", newStudent.dateOfBirth);
    formData.append("placeOfBirth", newStudent.placeOfBirth);
    formData.append("nationality", newStudent.nationality);
    formData.append("password", newStudent.password);
    formData.append("confirmPassword", newStudent.confirmPassword);
    formData.append("email", newStudent.email);
    formData.append("studentId", newStudent.studentId);
    formData.append("courseStudy", newStudent.courseStudy);
    formData.append("studentRegistrar", newStudent.studentRegistrar);
    formData.append("studentRegistrarId", newStudent.studentRegistrarId);
    formData.append("level", newStudent.level);
    formData.append("isMale", newStudent.isMale);
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
    formData.append("registedDate", newStudent.registedDate);
    dispatch(studentUpdate({ formData, id: newStudent.studentId }));
  };
  const canSave = Boolean(newStudent.firstName) && Boolean(newStudent.lastName);
  console.log(canSave);

  useEffect(() => {
    if (updateStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (updateStatus === "success") {
      // navigate("/sensec/admin/all_students");
      toast.success(studentSuccessMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
      navigate("/sensec/admin/students/add_parents_guardian");
    }
  }, [
    studentError,
    studentSuccessMessage,
    updateStatus,
    toast,
    toastOptions,
    navigate,
  ]);

  useEffect(() => {
    dispatch(fetchSingleStudent(studentId));
  }, [dispatch, studentId]);
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
                      <img
                        className="profileImg"
                        src={
                          newStudent.profilePicture
                            ? newStudent.profilePicture || loadProfileImage
                            : "/assets/maleAvatar.png"
                        }
                        alt=""
                      />
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
                      placeholder={newStudent.studentId}
                      onChange={handleInputValues}
                      value={newStudent.studentId}
                      disabled="disabled"
                    />
                  </div>
                </div>
              </div>
              <div className="profileDateWrap">
                <h3>Student's Profile</h3>
                <div className="date">
                  <h3>Date:</h3>
                  <input
                    className="dateInput"
                    type="text"
                    name="registedDate"
                    disabled="disabled"
                    onChange={handleInputValues}
                    value={newStudent.registedDate}
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
                      value={newStudent.firstName}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="lastName">Surname</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="lastName"
                      value={newStudent.lastName}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="dateOfBirth"
                      value={newStudent.dateOfBirth}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="placeOfBirth">Place Of Birth</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="placeOfBirth"
                      value={newStudent.placeOfBirth}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="homeTown">Home Town</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="homeTown"
                      value={newStudent.homeTown}
                    />
                  </div>
                  <div className="region">
                    <label htmlFor="region">Region:</label>
                    <Select
                      name="region"
                      id="selector"
                      defaultValue={newStudent.region}
                      options={regionOptions}
                      onChange={handleRegionInput}
                      styles={selectorStyles}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: "#696969",
                          primary: "#696969",
                        },
                      })}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="classLevel">Form (Class Level)</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="classLevel"
                      value={newStudent.classLevel}
                    />
                  </div>
                </div>
                <div className="middle">
                  <div className="inputField">
                    <label htmlFor="courseStudy">Course Study</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="courseStudy"
                      value={newStudent.courseStudy}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="currentCity">Current City</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="currentCity"
                      value={newStudent.currentCity}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="nationality">Nationality</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="nationality"
                      value={newStudent.nationality}
                    />
                  </div>
                  <div className="sexField">
                    <div className="genderWrap">
                      <label htmlFor="nationality">Gender:</label>
                      <div className="genderCont">
                        <div className="radioGap">
                          <label
                            htmlFor="male"
                            style={{
                              color: "#696969",
                              marginRight: "5px",
                            }}
                          >
                            Male
                          </label>
                          <input
                            type="radio"
                            onChange={handleInputValues}
                            name="isMale"
                            value={true}
                            style={{ outline: "none" }}
                            checked={newStudent.isMale === "true"}
                          />
                        </div>
                        <div className="radioGap">
                          <label
                            htmlFor="female"
                            style={{
                              color: "#696969",
                              outline: "none",
                              marginRight: "5px",
                            }}
                          >
                            Female
                          </label>
                          <input
                            type="radio"
                            onChange={handleInputValues}
                            name="isMale"
                            value={false}
                            style={{ outline: "none" }}
                            checked={newStudent.isMale === "false"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inputField">
                    <label htmlFor="address">Residential Address</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="address"
                      value={newStudent.address}
                    />
                  </div>
                  <div className="religion">
                    <label htmlFor="religion">Religion</label>
                    <Select
                      name="religion"
                      id="selector"
                      defaultValue={regionOptions[0]}
                      options={religionOptions}
                      onChange={handleReligionInput}
                      styles={selectorStyles}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: "#696969",
                          primary: "#696969",
                        },
                      })}
                    />
                  </div>
                </div>
                <div className="right">
                  <div className="inputField">
                    <label htmlFor="motherTongue">Mother Tongue</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="motherTongue"
                      value={newStudent.motherTongue}
                    />
                  </div>
                  <div className="otherTongue">
                    <label htmlFor="otherTongue">Other Language(s)</label>
                    <CreatableSelect
                      name="otherTongue"
                      id="selector"
                      isMulti={true}
                      options={otherTongueOptions}
                      onChange={handleotherTongueInput}
                      styles={selectorStyles}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: "#696969",
                          primary: "#696969",
                        },
                      })}
                    />
                  </div>
                  <div className="complexion">
                    <label htmlFor="complexion">Complexion</label>
                    <Select
                      name="complexion"
                      id="selector"
                      options={complexionOptions}
                      onChange={handleComplexionInput}
                      styles={selectorStyles}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: "#696969",
                          primary: "#696969",
                        },
                      })}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="height">Height</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="height"
                      value={newStudent.height}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="weight">Weight</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="weight"
                      value={newStudent.weight}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="email"
                      value={newStudent.email}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="addStudentBtnWrap">
              <button className="addStudentBtn" onClick={() => navigate(-1)}>
                Cancel
              </button>
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
