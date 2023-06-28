import React, { useEffect, useState } from "react";
// import "./adminStudentAdd.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import set from "lodash/set";
import { staffRegistory } from "../../../../features/staff/staffSlice";
// import { staffRegister } from "../../../../store/actions/authActions";

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
export default function AddStaffMember({ toast, toastOptions }) {
  const { registerStatus, error, successMessage } = useSelector(
    (state) => state.staff
  );
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
  // const [staffRole, setStaffRole] = useState(false);
  const [father, setFather] = useState(false);
  const [mother, setMother] = useState(false);
  const [guardian, setGuardian] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  console.log(openSidebar);
  console.log(check);
  console.log(num);
  console.log(date);

  const currentYear = new Date().getFullYear();
  const [newStaff, setNewStaff] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    adminSecret: "",
    teacherSecret: "",
    password: `${currentYear}-${num}`,
    confirmPassword: `${currentYear}-${num}`,
    email: "",
    role: "",
    staffId: `STF-${num}-${currentYear}`,
    teachingCourse: "",
    staffRole: "None",
    isMale: "",
    staffImage: "",
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
    registedDate: date,
  });
  console.log(newStaff.staffRole);
  console.log(newStaff.region);
  console.log(newStaff.staffId);

  const [loadProfileImage, setLoadProfileImage] = useState("");

  const [showpass, setShowPass] = useState(false);
  const [showConfirmpass, setShowConfirmPass] = useState(false);

  console.log(showConfirmpass);

  const showPassword = () => setShowPass((show) => !show);
  const showConfirmPassword = () => setShowConfirmPass(!showConfirmpass);

  const handleInputValues = (e) => {
    setNewStaff({
      ...newStaff,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegionInput = (regionSelected) => {
    const region = regionSelected.value;
    setNewStaff({
      ...newStaff,
      region: region,
    });
  };
  const handleReligionInput = (religionSelected) => {
    const religion = religionSelected.value;
    setNewStaff({
      ...newStaff,
      religion: religion,
    });
  };
  const handleComplexionInput = (complexionSelected) => {
    const complexion = complexionSelected.value;
    setNewStaff({
      ...newStaff,
      complexion: complexion,
    });
  };
  const handleotherTongueInput = (otherTongueSelected) => {
    console.log(otherTongueSelected);
    const otherTongue = otherTongueSelected.map((lang) => {
      return lang.value;
    });
    setNewStaff({
      ...newStaff,
      otherTongue: otherTongue,
    });
  };

  const handleImageFileUpload = (e) => {
    if (e.target.files.length !== 0) {
      setNewStaff({ ...newStaff, [e.target.name]: e.target.files[0] });
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
      staffId,
      adminSecret,
      teacherSecret,
      teachingCourse,
      staffRole,
      isMale,
      staffImage,
      profilePicture,
      address,
      currentCity,
      homeTown,
      region,
      religion,
      height,
      weight,
      motherTongue,
      otherTongue,
      complexion,
      registedDate,
    } = newStaff;
    console.log(newStaff);
    console.log(newStaff.region);
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("placeOfBirth", placeOfBirth);
    formData.append("nationality", nationality);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("email", email);
    formData.append("staffId", staffId);
    formData.append("staffRole", staffRole);
    formData.append("adminSecret", adminSecret);
    formData.append("teacherSecret", teacherSecret);
    formData.append("teachingCourse", teachingCourse);
    formData.append("isMale", isMale);
    formData.append("staffImage", staffImage);
    formData.append("profilePicture", profilePicture);
    formData.append("address", address);
    formData.append("currentCity", currentCity);
    formData.append("homeTown", homeTown);
    formData.append("region", region);
    formData.append("religion", religion);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("motherTongue", motherTongue);
    formData.append("otherTongue", otherTongue);
    formData.append("complexion", complexion);
    formData.append("registedDate", registedDate);
    dispatch(staffRegistory(formData));
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

  const canSave = Boolean(newStaff.firstName) && Boolean(newStaff.lastName);
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
  }, [error, successMessage, registerStatus, toast, toastOptions]);

  return (
    <div className="registerWrap">
      <div className="register">
        <h1>NEW STAFF MEMBER REGISTRATION</h1>
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
                    <h3>New Staff Member ID</h3>
                    <input
                      className="idInput"
                      type="text"
                      name="studentId"
                      onChange={handleInputValues}
                      // value={newStudent.studentId}
                      value={newStaff.staffId}
                    />
                    <div className="staffMember">
                      <span className="staffQuestion">Staff Role:</span>
                      <div className="staffAnswer">
                        <div className="radioGap">
                          <label
                            htmlFor="none"
                            style={{
                              color: "#696969",
                              marginRight: "5px",
                            }}
                          >
                            None
                          </label>
                          <input
                            type="radio"
                            onChange={handleInputValues}
                            name="staffRole"
                            value={"None"}
                            style={{ outline: "none" }}
                            checked={newStaff.staffRole === "None"}
                          />
                        </div>
                        <div className="radioGap">
                          <label
                            htmlFor="admin"
                            style={{
                              color: "#696969",
                              outline: "none",
                              marginRight: "5px",
                            }}
                          >
                            Admin
                          </label>
                          <input
                            type="radio"
                            onChange={handleInputValues}
                            name="staffRole"
                            value={"Admin"}
                            style={{ outline: "none" }}
                            checked={newStaff.staffRole === "Admin"}
                          />
                        </div>
                        <div className="radioGap">
                          <label
                            htmlFor="admin/teacher"
                            style={{
                              color: "#696969",
                              outline: "none",
                              marginRight: "5px",
                            }}
                          >
                            Admin/Teacher
                          </label>
                          <input
                            type="radio"
                            onChange={handleInputValues}
                            name="staffRole"
                            value={"Admin/Teacher"}
                            style={{ outline: "none" }}
                            checked={newStaff.staffRole === "Admin/Teacher"}
                          />
                        </div>
                        <div className="radioGap">
                          <label
                            htmlFor="teacher"
                            style={{
                              color: "#696969",
                              outline: "none",
                              marginRight: "5px",
                            }}
                          >
                            Teacher
                          </label>
                          <input
                            type="radio"
                            onChange={handleInputValues}
                            name="staffRole"
                            value={"Teacher"}
                            style={{ outline: "none" }}
                            checked={newStaff.staffRole === "Teacher"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="keysDiv">
                      {newStaff.staffRole === "Admin" ||
                      newStaff.staffRole === "Admin/Teacher" ? (
                        <div className="studentId">
                          <h3 htmlFor="adminSecret">Admin Secret Key</h3>
                          <input
                            type="text"
                            className="idInput"
                            onChange={handleInputValues}
                            name="adminSecret"
                            value={newStaff.adminSecret}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {newStaff.staffRole === "Teacher" ||
                      newStaff.staffRole === "Admin/Teacher" ? (
                        <div className="studentId">
                          <h3 htmlFor="teacherSecret">Teacher Secret Key</h3>
                          <input
                            type="text"
                            className="idInput"
                            onChange={handleInputValues}
                            name="teacherSecret"
                            value={newStaff.teacherSecret}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {/* <div className="profilePicture">
                            <img
                              src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                              alt=""
                            />
                          </div>
                          <div className="imageFileUpload">
                            <label htmlFor="profilePicture">Select Image</label>
                            <input
                              type="file"
                              onChange={handleImageFileUpload}
                              name="profilePicture"
                              value={newStaff.profilePicture}
                              style={{ display: "none" }}
                              accept=".png,.jpeg,.jpg"
                            />
                          </div> */}
                </div>
              </div>
              <div className="profileDateWrap">
                <h3>Staff Member Profile</h3>
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
                      value={newStaff.firstName}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="lastName">Surname</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="lastName"
                      value={newStaff.lastName}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="dateOfBirth"
                      value={newStaff.dateOfBirth}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="placeOfBirth">Place Of Birth</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="placeOfBirth"
                      value={newStaff.placeOfBirth}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="homeTown">Home Town</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="homeTown"
                      value={newStaff.homeTown}
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
                      value={newStaff.currentCity}
                    />
                  </div>
                </div>
                <div className="middle">
                  {/* <div className="religion">
                      <label htmlFor="role">Member Role(s)</label>
                      <CreatableSelect
                        name="role"
                        id="selector"
                        isMulti={true}
                        // defaultValue={teacherRoleOptions[0]}
                        options={teacherRoleOptions}
                        onChange={handleTeacherRoleInput}
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
                  {newStaff.staffRole === "Admin" ||
                  newStaff.staffRole === "None" ? null : (
                    <div className="inputField">
                      <label htmlFor="teachingCourse">Teaching Course</label>
                      <input
                        type="text"
                        onChange={handleInputValues}
                        name="teachingCourse"
                        value={newStaff.teachingCourse}
                      />
                    </div>
                  )}
                  <div className="inputField">
                    <label htmlFor="nationality">Nationality</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="nationality"
                      value={newStaff.nationality}
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
                            checked={newStaff.isMale === "true"}
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
                            checked={newStaff.isMale === "false"}
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
                      value={newStaff.address}
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
                      value={newStaff.password}
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
                      value={newStaff.motherTongue}
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
                      value={newStaff.height}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="weight">Weight</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="weight"
                      value={newStaff.weight}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      onChange={handleInputValues}
                      name="email"
                      value={newStaff.email}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="password">Confirm Password</label>
                    <input
                      type={showConfirmpass ? "text" : "password"}
                      onChange={handleInputValues}
                      name="confirmPassword"
                      value={newStaff.confirmPassword}
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
              <button
                type="submit"
                disabled={!canSave || registerStatus === "pending"}
              >
                {registerStatus === "pending" ? (
                  <CircularProgress style={{ color: "white", size: "20px" }} />
                ) : (
                  "Add Member"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
