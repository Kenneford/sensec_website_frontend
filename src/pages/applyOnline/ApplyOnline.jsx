import React, { useEffect, useState } from "react";
// import "./adminStudentAdd.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { getAdminInfo } from "../../features/admin/adminsSlice";
import {
  fetchAllProgrammes,
  getAllProgrammes,
} from "../../features/academics/academicProgram/academicProgram";
import {
  fetchAllYears,
  getAllAcademicYears,
} from "../../features/academics/academicYear/academicYearSlice";
import {
  studentOnlineRegistory,
  studentRegistory,
} from "../../features/student/studentsSlice";
import {
  academicYearOptions,
  classLevelOptions,
  complexionOptions,
  genderOptions,
  otherTongueOptions,
  programOptions,
  religionOptions,
} from "../../options/options";
import Footer from "../../components/footer/Footer";

export default function ApplyOnline({ toastOptions, toast }) {
  const { registerStudentStatus, studentError, studentSuccessMessage } =
    useSelector((state) => state.student);
  const authAdminInfo = useSelector(getAdminInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loadProfileImage, setLoadProfileImage] = useState("");
  const [showpass, setShowPass] = useState(false);
  const [showConfirmpass, setShowConfirmPass] = useState(false);
  const [showProgrammes, setShowProgrammes] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentYear = new Date().getFullYear();
  // const { staffInfo } = useSelector((state) => state.staff);
  const [num] = useState(Math.floor(1000000 + Math.random() * 9000000));
  const [date] = useState(new Date().toDateString());
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    homeTown: "",
    district: "",
    region: "",
    jhsAttended: "",
    shsAttended: "",
    role: "",
    currentClassLevel: "",
    program: "",
    currentCity: "",
    nationality: "",
    gender: "",
    address: "",
    motherTongue: "",
    otherTongue: "",
    complexion: "",
    height: "",
    weight: "",
    // religion: "",
    email: "",
    password: `${currentYear}-${num}`,
    profilePicture: "",
    uniqueId: `STDSSHS-${num}-${currentYear}`,
    academicYear: "",
    studentRegistrar: `${authAdminInfo.firstName} ${authAdminInfo.lastName}`,
    studentRegistrarId: `${authAdminInfo.adminId}`,
    dateEnrolled: date,
    confirmPassword: `${currentYear}-${num}`,
  });
  const showPassword = () => setShowPass(!showpass);
  const showConfirmPassword = () => setShowConfirmPass(!showConfirmpass);

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
    console.log(newStudent);
    if (!newStudent.profilePicture) {
      toast.error("Please upload your image!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    if (!newStudent.academicYear) {
      toast.error("Please select academic year!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    if (!newStudent.currentClassLevel) {
      toast.error("Please select class level!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    if (!newStudent.program) {
      toast.error("Please select your program!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    const formData = new FormData();
    formData.append("firstName", newStudent.firstName);
    formData.append("lastName", newStudent.lastName);
    formData.append("dateOfBirth", newStudent.dateOfBirth);
    formData.append("placeOfBirth", newStudent.placeOfBirth);
    formData.append("gender", newStudent.gender);
    formData.append("jhsAttended", newStudent.jhsAttended);
    formData.append("shsAttended", newStudent.shsAttended);
    formData.append("nationality", newStudent.nationality);
    formData.append("district", newStudent.district);
    formData.append("address", newStudent.address);
    formData.append("currentCity", newStudent.currentCity);
    formData.append("homeTown", newStudent.homeTown);
    formData.append("region", newStudent.region);
    formData.append("email", newStudent.email);
    formData.append("uniqueId", newStudent.uniqueId);
    formData.append("role", newStudent.role);
    formData.append("currentClassLevel", newStudent.currentClassLevel);
    formData.append("program", newStudent.program);
    formData.append("academicYear", newStudent.academicYear);
    formData.append("studentRegistrar", newStudent.studentRegistrar);
    formData.append("studentRegistrarId", newStudent.studentRegistrarId);
    // formData.append("religion", newStudent.religion);
    formData.append("height", newStudent.height);
    formData.append("weight", newStudent.weight);
    formData.append("motherTongue", newStudent.motherTongue);
    formData.append("otherTongue", newStudent.otherTongue);
    formData.append("complexion", newStudent.complexion);
    formData.append("dateEnrolled", newStudent.dateEnrolled);
    formData.append("profilePicture", newStudent.profilePicture);
    formData.append("password", newStudent.password);
    formData.append("confirmPassword", newStudent.confirmPassword);
    dispatch(studentOnlineRegistory(formData));
  };
  const canSave = Boolean(newStudent.firstName) && Boolean(newStudent.lastName);
  console.log(canSave);

  useEffect(() => {
    dispatch(fetchAllProgrammes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllYears());
  }, [dispatch]);

  useEffect(() => {
    if (registerStudentStatus === "rejected") {
      studentError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (registerStudentStatus === "success") {
      toast.success(studentSuccessMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
      setNewStudent({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        placeOfBirth: "",
        homeTown: "",
        district: "",
        region: "",
        jhsAttended: "",
        shsAttended: "",
        role: "",
        currentClassLevel: "",
        program: "",
        currentCity: "",
        nationality: "",
        gender: "",
        address: "",
        motherTongue: "",
        otherTongue: "",
        complexion: "",
        height: "",
        weight: "",
        email: "",
        password: "",
        profilePicture: "",
        uniqueId: "",
        academicYear: "",
        studentRegistrar: "",
        studentRegistrarId: "",
        dateEnrolled: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        navigate(
          "/sensec/student_enrollment/online_application/add_parents_guardian"
        );
      }, 5000);
    }
  }, [
    studentError,
    studentSuccessMessage,
    registerStudentStatus,
    toast,
    toastOptions,
    navigate,
  ]);

  // setTimeout(() => {
  //   if (registerStudentStatus === "success") {
  //     navigate("/");
  //     window.location.reload();
  //   }
  // }, 5000);

  const copyToClipboard = (e) => {
    e.preventDefault();
    let copyText = newStudent.studentId;
    let isCopy = copy(copyText);
    if (isCopy) {
      toast.success("Copied to Clipboard");
      // setCopied(true);
    }
  };
  const clear = (e) => {
    // e.preventDefault();
    if (showProgrammes) {
      setShowProgrammes(false);
    }
    if (showYears) {
      setShowYears(false);
    }
  };
  return (
    <div className="registerWrap" id="apply" style={{ paddingTop: "10rem" }}>
      <div className="register">
        <h1>STUDENTS ONLINE REGISTRATION FORM</h1>
        <div className="registerCont">
          <form onSubmit={handleRegister}>
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
                          loadProfileImage
                            ? loadProfileImage
                            : "/assets/noAvatar.png"
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
                      onChange={handleInputValues}
                      // value={newStudent.studentId}
                      value={newStudent.uniqueId}
                    />
                    {/* <button onClick={copyToClipboard}>Copy</button> */}
                    {/* <ContentCopyIcon onClick={copyToClipboard} /> */}
                    <h3>Academic Year ID</h3>
                    <div className="academicYear">
                      <label htmlFor="academicYear">Academic Year</label>
                      <select
                        className="select"
                        value={newStudent.academicYear}
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
                    {/* <input
                      className="idInput"
                      type="text"
                      name="academicYear"
                      onChange={handleInputValues}
                      // value={newStudent.studentId}
                      value={newStudent.academicYear}
                    /> */}
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
                    name="dateEnrolled"
                    onChange={handleInputValues}
                    value={newStudent.dateEnrolled}
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
                  <div className="inputField">
                    <label htmlFor="district">District</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="district"
                      value={newStudent.district}
                    />
                  </div>
                  <div className="selector">
                    <label htmlFor="region">Region</label>
                    <select
                      className="select"
                      value={newStudent.region}
                      onChange={handleInputValues}
                      name="region"
                      id=""
                    >
                      {religionOptions.map((region) => (
                        <option
                          key={region.label}
                          value={region.value}
                          style={{
                            backgroundColor: "#292929",
                            color: "#fff",
                          }}
                        >
                          {region.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div className="selector">
                    <label htmlFor="currentClassLevel">Class Level:</label>
                    <Select
                      name="currentClassLevel"
                      id="selector"
                      // defaultValue={classLevelOptions[0]}
                      options={classLevelOptions}
                      onChange={handleClassLevelInput}
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
                  </div> */}
                  <div className="inputField">
                    <label htmlFor="jhsAttended">JHS Attended</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="jhsAttended"
                      value={newStudent.jhsAttended}
                    />
                  </div>
                  {/* <div className="inputField">
                    <label htmlFor="classLevel">Form (Class Level)</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="classLevel"
                      value={newStudent.classLevel}
                    />
                  </div> */}
                  {/* <p>{selectedclassLevel} classLevel</p> */}
                </div>
                <div className="middle">
                  <div className="inputField">
                    <label htmlFor="shsAttended">SHS Attended</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="shsAttended"
                      value={newStudent.shsAttended}
                    />
                  </div>
                  {/* <div className="selector">
                    <label htmlFor="role">Role</label>
                    <select
                      className="select"
                      value={newStudent.role}
                      onChange={handleInputValues}
                      name="role"
                    >
                      {studentRoleOptions.map((role) => (
                        <option
                          key={role.label}
                          value={role.value}
                          style={{
                            backgroundColor: "#292929",
                            color: "#fff",
                          }}
                        >
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div> */}
                  <div className="selector">
                    <label htmlFor="currentClassLevel">Class Level</label>
                    <select
                      className="select"
                      value={newStudent.currentClassLevel}
                      onChange={handleInputValues}
                      name="currentClassLevel"
                      id=""
                    >
                      {classLevelOptions.map((classLevel) => (
                        <option
                          key={classLevel.label}
                          value={classLevel.value}
                          style={{
                            backgroundColor: "#292929",
                            color: "#fff",
                          }}
                        >
                          {classLevel.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="selector">
                    <label htmlFor="program">Program</label>
                    <select
                      className="select"
                      value={newStudent.program}
                      onChange={handleInputValues}
                      name="program"
                      id=""
                    >
                      {programOptions.map((program) => (
                        <option
                          key={program.label}
                          value={program.value}
                          style={{
                            backgroundColor: "#292929",
                            color: "#fff",
                          }}
                        >
                          {program.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div className="inputField">
                    <label htmlFor="program">Program</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="program"
                      value={newStudent.program}
                    />
                  </div> */}
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
                  {/* <div className="sexField">
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
                  </div> */}
                  <div className="selector">
                    <label htmlFor="gender">Gender</label>
                    <select
                      className="select"
                      value={newStudent.gender}
                      onChange={handleInputValues}
                      name="gender"
                      id=""
                    >
                      {genderOptions.map((gender) => (
                        <option
                          key={gender.label}
                          value={gender.value}
                          style={{
                            backgroundColor: "#292929",
                            color: "#fff",
                          }}
                        >
                          {gender.label}
                        </option>
                      ))}
                    </select>
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
                  {/* <div className="selector">
                    <label htmlFor="religion">Religion</label>
                    <select
                      className="select"
                      value={newStudent.religion}
                      onChange={handleInputValues}
                      name="religion"
                    >
                      {religionOptions.map((r) => (
                        <option
                          key={r.label}
                          value={r.value}
                          style={{
                            backgroundColor: "#292929",
                            color: "#fff",
                          }}
                        >
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div> */}
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
                  <div className="selector">
                    <label htmlFor="otherTongue">Other Tongues</label>
                    <select
                      className="select"
                      value={newStudent.otherTongue}
                      onChange={handleInputValues}
                      name="otherTongue"
                    >
                      {otherTongueOptions.map((otherTongue) => (
                        <option
                          key={otherTongue.label}
                          value={otherTongue.value}
                          style={{
                            backgroundColor: "#292929",
                            color: "#fff",
                          }}
                        >
                          {otherTongue.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div className="selector">
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
                  </div> */}
                  {/* <div className="selector">
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
                  </div> */}
                  <div className="selector">
                    <label htmlFor="complexion">Complexion</label>
                    <select
                      className="select"
                      value={newStudent.complexion}
                      onChange={handleInputValues}
                      name="complexion"
                      id=""
                    >
                      {complexionOptions.map((complexion) => (
                        <option
                          key={complexion.label}
                          value={complexion.value}
                          style={{
                            backgroundColor: "#292929",
                            color: "#fff",
                          }}
                        >
                          {complexion.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="inputField">
                    <label htmlFor="height">Height(M)</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="height"
                      value={newStudent.height}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="weight">Weight(kg)</label>
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
            <div className="addStudentBtnWrap">
              <button
                className="addStudentBtn"
                type="submit"
                disabled={!canSave || registerStudentStatus === "pending"}
              >
                {registerStudentStatus === "pending" ? (
                  <CircularProgress style={{ color: "white", size: "20px" }} />
                ) : registerStudentStatus === "pending" ? (
                  " Application Sent"
                ) : (
                  "Add Student"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
