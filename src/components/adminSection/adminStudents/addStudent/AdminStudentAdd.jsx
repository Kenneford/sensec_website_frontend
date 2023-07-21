import React, { useEffect, useState } from "react";
import "./adminStudentAdd.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import { studentRegistory } from "../../../../features/student/studentsSlice";
import { useNavigate } from "react-router-dom";
import {
  classLevelOptions,
  complexionOptions,
  otherTongueOptions,
  regionOptions,
  religionOptions,
} from "../../../../options/options";
import copy from "copy-to-clipboard";
import {
  fetchAllProgrammes,
  fetchAllYears,
  getAllProgrammes,
  getAllYears,
} from "../../../../features/academics/academics";
import { getAdminInfo } from "../../../../features/admin/adminsSlice";

const Programmes = () => {
  return <div>Programmes</div>;
};

export default function AdminStudentAdd({ toastOptions, toast }) {
  const { registerStudentStatus, studentError, studentSuccessMessage } =
    useSelector((state) => state.student);
  const authAdminInfo = useSelector(getAdminInfo);
  const allProgrammes = useSelector(getAllProgrammes);
  const allYears = useSelector(getAllYears);

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
    nationality: "",
    password: `${currentYear}-${num}`,
    confirmPassword: `${currentYear}-${num}`,
    email: "",
    studentId: `STDSSHS-${num}-${currentYear}`,
    academicYear: "",
    program: "",
    studentRegistrar: `${authAdminInfo.firstName} ${authAdminInfo.lastName}`,
    studentRegistrarId: `${authAdminInfo.adminId}`,
    currentClassLevel: "",
    isMale: "",
    profilePicture: "",
    address: "",
    currentCity: "",
    homeTown: "",
    region: "",
    religion: "",
    height: "",
    weight: "",
    motherTongue: "",
    otherTongue: "",
    complexion: "",
    dateEnrolled: date,
  });
  const showPassword = () => setShowPass(!showpass);
  const showConfirmPassword = () => setShowConfirmPass(!showConfirmpass);

  const handleRegionInput = (regionSelected) => {
    const region = regionSelected.value;
    setNewStudent({
      ...newStudent,
      region: region,
    });
  };
  const handleClassLevelInput = (classLevelSelected) => {
    const currentClassLevel = classLevelSelected.value;
    setNewStudent({
      ...newStudent,
      currentClassLevel: currentClassLevel,
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

  const handleRegister = (e) => {
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
    formData.append("academicYear", newStudent.academicYear);
    formData.append("program", newStudent.program);
    formData.append("studentRegistrar", newStudent.studentRegistrar);
    formData.append("studentRegistrarId", newStudent.studentRegistrarId);
    formData.append("currentClassLevel", newStudent.currentClassLevel);
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
    formData.append("dateEnrolled", newStudent.dateEnrolled);
    dispatch(studentRegistory(formData));
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
    registerStudentStatus,
    toast,
    toastOptions,
    navigate,
  ]);

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
    <div className="registerWrap" id="studentReg">
      <div className="register">
        <h1>NEW STUDENT REGISTRATION</h1>
        <div className="registerCont">
          <div className="getIds">
            <div className="getIdsWrap">
              <button
                onClick={() =>
                  setShowProgrammes(!showProgrammes, setShowYears(false))
                }
              >
                Programmes
              </button>
              {showProgrammes && (
                <>
                  <div className="programLists">
                    {allProgrammes.map((prgrm) => (
                      <div className="contentFlex" key={prgrm._id}>
                        <p>{prgrm.name}</p>
                        <ContentCopyIcon
                          className="copyContentIcon"
                          titleAccess="Copy Program's Id"
                          onClick={() =>
                            copy(
                              prgrm._id,
                              toast.success("Id copied to clipboard")
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="getIdsWrap">
              <button
                onClick={() =>
                  setShowYears(!showYears, setShowProgrammes(false))
                }
              >
                Year
              </button>
              {showYears && (
                <>
                  <div className="programLists">
                    {allYears.map((prgrm) => (
                      <div className="contentFlex" key={prgrm._id}>
                        <p>{prgrm.name}</p>
                        <ContentCopyIcon
                          className="copyContentIcon"
                          titleAccess="Copy Program's Id"
                          onClick={() =>
                            copy(
                              prgrm._id,
                              toast.success("Id copied to clipboard")
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
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
                      value={newStudent.studentId}
                    />
                    {/* <button onClick={copyToClipboard}>Copy</button> */}
                    {/* <ContentCopyIcon onClick={copyToClipboard} /> */}
                    <h3>Academic Year ID</h3>
                    <input
                      className="idInput"
                      type="text"
                      name="academicYear"
                      onChange={handleInputValues}
                      // value={newStudent.studentId}
                      value={newStudent.academicYear}
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
                  <div className="region">
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
                    <label htmlFor="program">Program</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="program"
                      value={newStudent.program}
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
