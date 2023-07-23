import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import {
  complexionOptions,
  otherTongueOptions,
  regionOptions,
  religionOptions,
} from "../../../options/options";
import { teacherRegistory } from "../../../features/teacher/teachersSlice";

export default function TeacherEmploymentForm({ toast, toastOptions }) {
  const { registerTeacherStatus, teacherError, teacherSuccessMessage } =
    useSelector((state) => state.teacher);

  const [num] = useState(Math.floor(1000000 + Math.random() * 9000000));
  const [date] = useState(new Date().toDateString());

  const dispatch = useDispatch();

  const currentYear = new Date().getFullYear();
  const [newTeacher, setNewTeacher] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    teacherSecret: "",
    program: "",
    teachingSubject: "",
    password: `${currentYear}-${num}`,
    confirmPassword: `${currentYear}-${num}`,
    email: "",
    role: "",
    teacherId: `TCH-${num}-${currentYear}`,
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
    dateEmployed: date,
  });
  console.log(newTeacher.staffRole);
  console.log(newTeacher.region);
  console.log(newTeacher.staffId);

  const [loadProfileImage, setLoadProfileImage] = useState("");

  const [showpass, setShowPass] = useState(false);
  const [showConfirmpass, setShowConfirmPass] = useState(false);

  console.log(showConfirmpass);

  const showPassword = () => setShowPass((show) => !show);
  const showConfirmPassword = () => setShowConfirmPass(!showConfirmpass);

  const handleInputValues = (e) => {
    setNewTeacher({
      ...newTeacher,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegionInput = (regionSelected) => {
    const region = regionSelected.value;
    setNewTeacher({
      ...newTeacher,
      region: region,
    });
  };
  const handleReligionInput = (religionSelected) => {
    const religion = religionSelected.value;
    setNewTeacher({
      ...newTeacher,
      religion: religion,
    });
  };
  const handleComplexionInput = (complexionSelected) => {
    const complexion = complexionSelected.value;
    setNewTeacher({
      ...newTeacher,
      complexion: complexion,
    });
  };
  const handleotherTongueInput = (otherTongueSelected) => {
    console.log(otherTongueSelected);
    const otherTongue = otherTongueSelected.map((lang) => {
      return lang.value;
    });
    setNewTeacher({
      ...newTeacher,
      otherTongue: otherTongue,
    });
  };

  const handleImageFileUpload = (e) => {
    if (e.target.files.length !== 0) {
      setNewTeacher({ ...newTeacher, [e.target.name]: e.target.files[0] });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLoadProfileImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(newTeacher);
    const formData = new FormData();
    formData.append("firstName", newTeacher.firstName);
    formData.append("lastName", newTeacher.lastName);
    formData.append("dateOfBirth", newTeacher.dateOfBirth);
    formData.append("placeOfBirth", newTeacher.placeOfBirth);
    formData.append("nationality", newTeacher.nationality);
    formData.append("password", newTeacher.password);
    formData.append("confirmPassword", newTeacher.confirmPassword);
    formData.append("email", newTeacher.email);
    formData.append("role", newTeacher.role);
    formData.append("teacherId", newTeacher.teacherId);
    formData.append("teacherSecret", newTeacher.teacherSecret);
    formData.append("program", newTeacher.program);
    formData.append("teachingSubject", newTeacher.teachingSubject);
    formData.append("isMale", newTeacher.isMale);
    formData.append("profilePicture", newTeacher.profilePicture);
    formData.append("address", newTeacher.address);
    formData.append("currentCity", newTeacher.currentCity);
    formData.append("homeTown", newTeacher.homeTown);
    formData.append("region", newTeacher.region);
    formData.append("religion", newTeacher.religion);
    formData.append("height", newTeacher.height);
    formData.append("weight", newTeacher.weight);
    formData.append("motherTongue", newTeacher.motherTongue);
    formData.append("otherTongue", newTeacher.otherTongue);
    formData.append("complexion", newTeacher.complexion);
    formData.append("dateEmployed", newTeacher.dateEmployed);
    dispatch(teacherRegistory(formData));
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

  const canSave = Boolean(newTeacher.firstName) && Boolean(newTeacher.lastName);

  useEffect(() => {
    if (registerTeacherStatus === "rejected") {
      teacherError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
        })
      );
      return;
    }
    if (registerTeacherStatus === "success") {
      toast.success(teacherSuccessMessage, {
        position: "top-right",
        theme: "dark",
      });
    }
  }, [
    registerTeacherStatus,
    teacherError,
    teacherSuccessMessage,
    toast,
    toastOptions,
  ]);

  return (
    <form onSubmit={handleRegister}>
      <div className="studentProfile">
        <div className="title">
          <div className="studentImageWrap">
            <div className="file">
              <label htmlFor="profilePicture" className="profileImageUpload">
                <img
                  className="profileImg"
                  src={
                    loadProfileImage ? loadProfileImage : "/assets/noAvatar.png"
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
              <h3>Teacher's ID</h3>
              <input
                className="idInput"
                type="text"
                name="teacherId"
                onChange={handleInputValues}
                disabled
                // value={newStudent.studentId}
                placeholder="Will generate automatically."
                value={newTeacher.teacherId}
              />
              <h3>Teacher's Role</h3>
              <input
                className="idInput"
                type="text"
                name="role"
                onChange={handleInputValues}
                placeholder="Enter teacher's role here..."
                value={newTeacher.role}
              />
            </div>
          </div>
        </div>
        <div className="profileDateWrap">
          <h3>Teacher's Profile</h3>
          <div className="date">
            <h3>Date:</h3>
            <input
              className="dateInput"
              type="text"
              name="dateEmployed"
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
                value={newTeacher.firstName}
              />
            </div>
            <div className="inputField">
              <label htmlFor="lastName">Surname</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="lastName"
                value={newTeacher.lastName}
              />
            </div>
            <div className="inputField">
              <label htmlFor="dateOfBirth">Date Of Birth</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="dateOfBirth"
                value={newTeacher.dateOfBirth}
              />
            </div>
            <div className="inputField">
              <label htmlFor="placeOfBirth">Place Of Birth</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="placeOfBirth"
                value={newTeacher.placeOfBirth}
              />
            </div>
            <div className="inputField">
              <label htmlFor="homeTown">Home Town</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="homeTown"
                value={newTeacher.homeTown}
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
              <label htmlFor="currentCity">Current City</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="currentCity"
                value={newTeacher.currentCity}
              />
            </div>
          </div>
          <div className="middle">
            <div className="inputField">
              <label htmlFor="nationality">Nationality</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="nationality"
                value={newTeacher.nationality}
              />
            </div>
            <div className="inputField">
              <label htmlFor="teachingSubject">Subject Teaching</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="teachingSubject"
                value={newTeacher.teachingSubject}
              />
            </div>
            <div className="inputField">
              <label htmlFor="program">Program</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="program"
                value={newTeacher.program}
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
                      checked={newTeacher.isMale === "true"}
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
                      checked={newTeacher.isMale === "false"}
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
                value={newTeacher.address}
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
            <div className="inputField">
              <label htmlFor="password">Password</label>
              <input
                type={showpass ? "text" : "password"}
                onChange={handleInputValues}
                name="password"
                disabled
                value={newTeacher.password}
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
                value={newTeacher.motherTongue}
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
                value={newTeacher.height}
              />
            </div>
            <div className="inputField">
              <label htmlFor="weight">Weight</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="weight"
                value={newTeacher.weight}
              />
            </div>
            <div className="inputField">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={handleInputValues}
                name="email"
                value={newTeacher.email}
              />
            </div>
            <div className="inputField">
              <label htmlFor="password">Confirm Password</label>
              <input
                type={showConfirmpass ? "text" : "password"}
                onChange={handleInputValues}
                name="confirmPassword"
                disabled
                value={newTeacher.confirmPassword}
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
      <div className="addStudentBtn">
        <div className="addStudentBtnWrap">
          <button
            className="addStudentBtn"
            type="submit"
            disabled={!canSave || registerTeacherStatus === "pending"}
          >
            {registerTeacherStatus === "pending" ? (
              <CircularProgress style={{ color: "white", size: "20px" }} />
            ) : (
              "Add Member"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
