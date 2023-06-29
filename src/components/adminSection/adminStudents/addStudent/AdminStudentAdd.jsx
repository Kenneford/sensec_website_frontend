import React, { useEffect, useState } from "react";
import "./adminStudentAdd.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import set from "lodash/set";
import { studentRegistory } from "../../../../features/student/studentsSlice";
import { useNavigate } from "react-router-dom";
import { getStaffInfo } from "../../../../features/staff/staffSlice";
import {
  complexionOptions,
  otherTongueOptions,
  regionOptions,
  religionOptions,
} from "../../../../options/options";

export default function AdminStudentAdd({
  newStudent,
  setNewStudent,
  toastOptions,
  toast,
}) {
  const { registerStatus, error, successMessage } = useSelector(
    (state) => state.student
  );
  const { staffInfo } = useSelector((state) => state.staff);
  // const staffInfo = useSelector(getStaffInfo);
  console.log(staffInfo);
  const [num] = useState(Math.floor(1000000 + Math.random() * 9000000));
  const [date] = useState(
    // new Date().toLocaleString("en-US", {
    //   day: "2-digit",
    //   year: "numeric",
    //   month: "2-digit",
    // })
    new Date().toDateString()
  );
  const [selectedRegion, setSelectedRegion] = useState("None");
  const [isAStudent, setIsAStudent] = useState(false);
  const [father, setFather] = useState(false);
  const [mother, setMother] = useState(false);
  const [guardian, setGuardian] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(num);
  console.log(date);

  const [loadProfileImage, setLoadProfileImage] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const currentYear = new Date().getFullYear();
  // const [newStudent, setNewStudent] = useState({
  //   firstName: "",
  //   lastName: "",
  //   dateOfBirth: "",
  //   placeOfBirth: "",
  //   nationality: "",
  //   password: `${currentYear}-${num}`,
  //   confirmPassword: `${currentYear}-${num}`,
  //   email: "",
  //   studentId: `STDSSHS-${num}-${currentYear}`,
  //   courseStudy: "",
  //   studentRegistrar: {
  //     registrarFirstName: `${staffInfo.firstName}`,
  //     registrarlastName: `${staffInfo.lastName}`,
  //     registrarRole: `${staffInfo.staffRole}`,
  //     registrarId: `${staffInfo.staffId}`,
  //   },
  //   level: "",
  //   // isStudent: "",
  //   isMale: "",
  //   studentImage: "",
  //   profilePicture: "",
  //   address: "",
  //   currentCity: "",
  //   homeTown: "",
  //   region: "",
  //   religion: "",
  //   height: "",
  //   weight: "",
  //   mother: {
  //     motherName: "",
  //     motherOccupation: "",
  //     motherPhoneNumber: "",
  //     motherEmail: "",
  //   },
  //   father: {
  //     fatherName: "",
  //     fatherOccupation: "",
  //     fatherPhoneNumber: "",
  //     fatherEmail: "",
  //   },
  //   guardian: {
  //     guardianName: "",
  //     guardianOccupation: "",
  //     guardianPhoneNumber: "",
  //     guardianEmail: "",
  //   },
  //   motherTongue: "",
  //   otherTongue: "",
  //   complexion: "",
  //   registedDate: date,
  // });
  console.log(newStudent.studentId);
  const [showpass, setShowPass] = useState(false);
  const [showConfirmpass, setShowConfirmPass] = useState(false);

  const showPassword = () => setShowPass(!showpass);
  const showConfirmPassword = () => setShowConfirmPass(!showConfirmpass);

  const handleGuardianValues = (e) => {
    const userInfoCopy = JSON.parse(JSON.stringify(newStudent));
    set(userInfoCopy, e.target.name, e.target.value);
    setNewStudent(userInfoCopy);
  };
  const handleRegionInput = (regionSelected) => {
    const region = regionSelected.value;
    setNewStudent({
      ...newStudent,
      region: region,
    });
    // console.log(e);
    // setSelectedRegion(regionOptions.value);
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
  // console.log(loadProfileImage);
  const stdFather = (e) => setFather(!father);
  const stdMother = (e) => setMother(!mother);
  const stdGuardian = (e) => setGuardian(!guardian);

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

  const handleRegister = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      nationality,
      password,
      confirmPassword,
      email,
      studentId,
      courseStudy,
      studentRegistrar,
      level,
      isMale,
      studentImage,
      profilePicture,
      address,
      currentCity,
      homeTown,
      region,
      religion,
      height,
      weight,
      mother,
      father,
      guardian,
      motherTongue,
      otherTongue,
      complexion,
      registedDate,
    } = newStudent;
    console.log(newStudent);
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("placeOfBirth", placeOfBirth);
    formData.append("nationality", nationality);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("email", email);
    formData.append("studentId", studentId);
    formData.append("courseStudy", courseStudy);
    formData.append(
      "studentRegistrar[registrarFirstName]",
      studentRegistrar.registrarFirstName
    );
    formData.append(
      "studentRegistrar[registrarlastName]",
      studentRegistrar.registrarlastName
    );
    formData.append(
      "studentRegistrar[registrarRole]",
      studentRegistrar.registrarRole
    );
    formData.append(
      "studentRegistrar[registrarId]",
      studentRegistrar.registrarId
    );
    formData.append("level", level);
    // formData.append("isStudent", isStudent);
    formData.append("isMale", isMale);
    formData.append("studentImage", studentImage);
    formData.append("profilePicture", profilePicture);
    // formData.append("image", profilePicture);
    formData.append("address", address);
    formData.append("currentCity", currentCity);
    formData.append("homeTown", homeTown);
    formData.append("region", region);
    formData.append("religion", religion);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("mother[motherName]", mother.motherName);
    formData.append("mother[motherOccupation]", mother.motherOccupation);
    formData.append("mother[motherPhoneNumber]", mother.motherPhoneNumber);
    formData.append("mother[motherEmail]", mother.motherEmail);
    formData.append("father[fatherName]", father.fatherName);
    formData.append("father[fatherOccupation]", father.fatherOccupation);
    formData.append("father[fatherPhoneNumber]", father.fatherPhoneNumber);
    formData.append("father[fatherEmail]", father.fatherEmail);
    formData.append("guardian[guardianName]", guardian.guardianName);
    formData.append(
      "guardian[guardianOccupation]",
      guardian.guardianOccupation
    );
    formData.append(
      "guardian[guardianPhoneNumber]",
      guardian.guardianPhoneNumber
    );
    formData.append("guardian[guardianEmail]", guardian.guardianEmail);
    formData.append("motherTongue", motherTongue);
    formData.append("otherTongue", otherTongue);
    formData.append("complexion", complexion);
    formData.append("registedDate", registedDate);
    dispatch(studentRegistory(formData));
    // setNewStudent({
    //   firstName: "",
    //   lastName: "",
    //   dateOfBirth: "",
    //   placeOfBirth: "",
    //   nationality: "",
    //   password: "",
    //   confirmPassword: "",
    //   email: "",
    //   studentId: "",
    //   courseStudy: "",
    //   studentRegistrar: {
    //     registrarFirstName: "",
    //     registrarlastName: "",
    //     registrarRole: "",
    //     registrarId: "",
    //   },
    //   level: "",
    //   // isStudent: "",
    //   isMale: "",
    //   studentImage: "",
    //   profilePicture: "",
    //   address: "",
    //   currentCity: "",
    //   homeTown: "",
    //   region: "",
    //   religion: "",
    //   height: "",
    //   weight: "",
    //   mother: {
    //     motherName: "",
    //     motherOccupation: "",
    //     motherPhoneNumber: "",
    //     motherEmail: "",
    //   },
    //   father: {
    //     fatherName: "",
    //     fatherOccupation: "",
    //     fatherPhoneNumber: "",
    //     fatherEmail: "",
    //   },
    //   guardian: {
    //     guardianName: "",
    //     guardianOccupation: "",
    //     guardianPhoneNumber: "",
    //     guardianEmail: "",
    //   },
    //   motherTongue: "",
    //   otherTongue: "",
    //   complexion: "",
    //   registedDate: date,
    // });

    setFather(false);
    setMother(false);
    setGuardian(false);
  };
  const canSave = Boolean(newStudent.firstName) && Boolean(newStudent.lastName);
  console.log(canSave);

  useEffect(() => {
    if (registerStatus === "rejected") {
      error.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (registerStatus === "success") {
      // navigate("/sensec/admin/all_students");
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [error, successMessage, registerStatus, toast, toastOptions, navigate]);

  return (
    <div className="registerWrap" id="studentReg">
      <div className="register">
        <h1>NEW STUDENT REGISTRATION</h1>
        <div className="registerCont">
          <form onSubmit={handleRegister}>
            <div className="studentProfile">
              <div className="title">
                <div className="studentImageWrap">
                  <div className="file">
                    {/* <label
                              htmlFor="profilePicture"
                              className="imageUpload text"
                            >
                              Student Image
                            </label> */}
                    <label
                      htmlFor="profilePicture"
                      className="profileImageUpload"
                    >
                      <img
                        className="profileImg"
                        src={
                          loadProfileImage
                            ? loadProfileImage
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
                    {/* <label htmlFor="studentId">Student ID</label> */}
                    <h3>Student ID</h3>
                    <input
                      className="idInput"
                      type="text"
                      name="studentId"
                      onChange={handleInputValues}
                      // value={newStudent.studentId}
                      value={newStudent.studentId}
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
                    onChange={handleInputValues}
                    value={date}
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
                      defaultValue={regionOptions[0]}
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
                    <label htmlFor="level">Form (Level)</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="level"
                      value={newStudent.level}
                    />
                  </div>
                  {/* <p>{selectedRegion} Region</p> */}
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
                      // defaultValue={regionOptions[0]}
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
                  <div className="inputField">
                    <label htmlFor="password">Password</label>
                    <input
                      type={showpass ? "text" : "password"}
                      onChange={handleInputValues}
                      name="password"
                      value={newStudent.password}
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: "1rem",
                        width: "30px",
                      }}
                      onClick={showPassword}
                    >
                      {showpass ? (
                        <VisibilityIcon style={{ color: "#a8a6a6" }} />
                      ) : (
                        <VisibilityOffIcon style={{ color: "#a8a6a6" }} />
                      )}
                    </div>
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
                      // defaultValue={regionOptions[0]}
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
                      // defaultValue={regionOptions[0]}
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
                  <div className="inputField">
                    <label htmlFor="password">Confirm Password</label>
                    <input
                      type={showConfirmpass ? "text" : "password"}
                      onChange={handleInputValues}
                      name="confirmPassword"
                      value={newStudent.confirmPassword}
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: "1rem",
                        width: "30px",
                      }}
                      onClick={showConfirmPassword}
                    >
                      {showConfirmpass ? (
                        <VisibilityIcon style={{ color: "#a8a6a6" }} />
                      ) : (
                        <VisibilityOffIcon style={{ color: "#a8a6a6" }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="guardianProfile">
              <h3>Parents/Guardian Profile</h3>
              <div className="guadianCont">
                <div className="left">
                  <div className="guardianImage" onClick={stdFather}>
                    <img
                      src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt=""
                    />
                    <h3>Father</h3>
                  </div>
                  {father && (
                    <div>
                      <div className="inputField">
                        <label htmlFor="fatherName">Full Name</label>
                        <input
                          type="text"
                          onChange={handleGuardianValues}
                          name="father.fatherName"
                          // value={newStudent.father.fatherName}
                        />
                      </div>
                      <div className="inputField">
                        <label htmlFor="fatherOccupation">Occupation</label>
                        <input
                          type="text"
                          onChange={handleGuardianValues}
                          name="father.fatherOccupation"
                          value={newStudent.father.fatherOccupation}
                        />
                      </div>
                      <div className="inputField">
                        <label htmlFor="fatherPhoneNumber">Mobile Number</label>
                        <input
                          type="text"
                          onChange={handleGuardianValues}
                          name="father.fatherPhoneNumber"
                          // value={newStudent.father.fatherPhoneNumber}
                        />
                      </div>
                      <div className="inputField">
                        <label htmlFor="fatherEmail">Email</label>
                        <input
                          type="email"
                          onChange={handleGuardianValues}
                          name="father.fatherEmail"
                          // value={newStudent.father.fatherEmail}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="middle">
                  <div className="guardianImage" onClick={stdMother}>
                    <img
                      src="https://images.unsplash.com/photo-1581464907815-29bdb6343d3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt=""
                    />
                    <h3>Mother</h3>
                  </div>
                  {mother && (
                    <div>
                      <div className="inputField">
                        <label htmlFor="motherName">Full Name</label>
                        <input
                          type="text"
                          onChange={handleGuardianValues}
                          name="mother.motherName"
                          // value={newStudent.mother.motherName}
                        />
                      </div>
                      <div className="inputField">
                        <label htmlFor="motherOccupation">Occupation</label>
                        <input
                          type="text"
                          onChange={handleGuardianValues}
                          name="mother.motherOccupation"
                          // value={newStudent.mother.motherOccupation}
                        />
                      </div>
                      <div className="inputField">
                        <label htmlFor="motherPhoneNumber">Mobile Number</label>
                        <input
                          type="text"
                          onChange={handleGuardianValues}
                          name="mother.motherPhoneNumber"
                          // value={newStudent.mother.motherPhoneNumber}
                        />
                      </div>
                      <div className="inputField">
                        <label htmlFor="motherEmail">Email</label>
                        <input
                          type="email"
                          onChange={handleGuardianValues}
                          name="mother.motherEmail"
                          // value={newStudent.mother.motherEmail}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="right">
                  <div className="guardianImage" onClick={stdGuardian}>
                    <img
                      src="https://images.unsplash.com/photo-1619380061814-58f03707f082?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt=""
                    />
                    <h3>Guardian</h3>
                  </div>
                  {guardian && (
                    <div>
                      <div className="inputField">
                        <label htmlFor="guardianName">Full Name</label>
                        <input
                          type="text"
                          onChange={handleGuardianValues}
                          name="guardian.guardianName"
                          // value={newStudent.guardian.guardianName}
                        />
                      </div>
                      <div className="inputField">
                        <label htmlFor="guardianOccupation">Occupation</label>
                        <input
                          type="text"
                          onChange={handleGuardianValues}
                          name="guardian.guardianOccupation"
                          // value={newStudent.guardian.guardianOccupation}
                        />
                      </div>
                      <div className="inputField">
                        <label htmlFor="guardianPhoneNumber">
                          Mobile Number
                        </label>
                        <input
                          type="text"
                          onChange={handleGuardianValues}
                          name="guardian.guardianPhoneNumber"
                          // value={
                          //   newStudent.guardian.guardianPhoneNumber
                          // }
                        />
                      </div>
                      <div className="inputField">
                        <label htmlFor="guardianEmail">Email</label>
                        <input
                          type="email"
                          onChange={handleGuardianValues}
                          name="guardian.guardianEmail"
                          // value={newStudent.guardian.guardianEmail}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="addStudentBtnWrap">
              <button
                className="addStudentBtn"
                type="submit"
                disabled={!canSave || registerStatus === "pending"}
              >
                {registerStatus === "pending" ? (
                  <CircularProgress style={{ color: "white", size: "20px" }} />
                ) : (
                  "Add Student"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
