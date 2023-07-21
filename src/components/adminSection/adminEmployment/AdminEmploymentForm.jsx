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
import { adminRegistory } from "../../../features/admin/adminsSlice";

export default function AdminEmployment({ toast, toastOptions }) {
  const { registerAdminStatus, adminError, adminSuccessMessage } = useSelector(
    (state) => state.admin
  );
  const [num] = useState(Math.floor(1000000 + Math.random() * 9000000));
  const [date] = useState(new Date().toDateString());
  const dispatch = useDispatch();

  const currentYear = new Date().getFullYear();

  const [newStaff, setNewStaff] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    adminSecret: "",
    password: `${currentYear}-${num}`,
    confirmPassword: `${currentYear}-${num}`,
    email: "",
    role: "",
    adminId: `ADM-${num}-${currentYear}`,
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
    const formData = new FormData();
    formData.append("firstName", newStaff.firstName);
    formData.append("lastName", newStaff.lastName);
    formData.append("dateOfBirth", newStaff.dateOfBirth);
    formData.append("placeOfBirth", newStaff.placeOfBirth);
    formData.append("nationality", newStaff.nationality);
    formData.append("password", newStaff.password);
    formData.append("confirmPassword", newStaff.confirmPassword);
    formData.append("email", newStaff.email);
    formData.append("role", newStaff.role);
    formData.append("adminId", newStaff.adminId);
    formData.append("adminSecret", newStaff.adminSecret);
    formData.append("isMale", newStaff.isMale);
    formData.append("profilePicture", newStaff.profilePicture);
    formData.append("address", newStaff.address);
    formData.append("currentCity", newStaff.currentCity);
    formData.append("homeTown", newStaff.homeTown);
    formData.append("region", newStaff.region);
    formData.append("religion", newStaff.religion);
    formData.append("height", newStaff.height);
    formData.append("weight", newStaff.weight);
    formData.append("motherTongue", newStaff.motherTongue);
    formData.append("otherTongue", newStaff.otherTongue);
    formData.append("complexion", newStaff.complexion);
    formData.append("dateEmployed", newStaff.dateEmployed);
    dispatch(adminRegistory(formData));
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
    if (registerAdminStatus === "rejected") {
      adminError.errorMessage.message.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (registerAdminStatus === "success") {
      toast.success(adminSuccessMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
    }
  }, [
    registerAdminStatus,
    adminError,
    adminSuccessMessage,
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
              <h3>Admin's ID</h3>
              <input
                className="idInput"
                type="text"
                name="adminId"
                onChange={handleInputValues}
                placeholder="Will generate automatically."
                disabled
                value={newStaff.adminId}
              />
              <h3>Admin's Role</h3>
              <input
                className="idInput"
                type="text"
                name="role"
                onChange={handleInputValues}
                placeholder="Enter admin's role here..."
                value={newStaff.role}
              />
            </div>
          </div>
        </div>
        <div className="profileDateWrap">
          <h3>Staff Member Profile</h3>
          <div className="date">
            <h3>Date:</h3>
            <input
              className="dateInput"
              type="text"
              name="dateEmployed"
              onChange={handleInputValues}
              value={newStaff.dateEmployed}
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
                disabled
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
                disabled
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
        <div className="addStudentBtnWrap">
          <button
            className="addStudentBtn"
            type="submit"
            disabled={!canSave || registerAdminStatus === "pending"}
          >
            {registerAdminStatus === "pending" ? (
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
