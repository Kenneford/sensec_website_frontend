import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../apiEndPoint/api";
import jwtDecode from "jwt-decode";

const initialState = {
  allUsers: [],
  userInfo: "",
  signUpUserStatus: "",
  loginUserStatus: "",
  fetchSingleUser: "",
  updateUserStatus: "",
  userEmailVerificationStatus: "",
  fetchingSingleUserStatus: "",
  fetchingUsersStatus: "",
  error: "",
  signUpError: "",
  successMessage: "",
  authenticated: false,
};

const tokenDecoded = (token) => {
  const decodeToken = jwtDecode(token);
  const expTime = new Date(decodeToken.exp * 1000);
  if (new Date() > expTime) {
    return null;
  }
  return decodeToken;
};

const getUserToken = localStorage.getItem("userToken");
if (getUserToken) {
  const getUserInfo = tokenDecoded(getUserToken);
  if (getUserInfo) {
    initialState.userInfo = getUserInfo;
    initialState.authenticated = true;
  }
}

export const signUpUser = createAsyncThunk(
  "User/signUpUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_ENDPOINT}/authusers/sign_up`, data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "User/userLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_ENDPOINT}/authusers/sign_in`, data);
      console.log("User", res.data);
      localStorage.setItem("userToken", res.data.token);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userEmailVerification = createAsyncThunk(
  "User/userEmailVerification",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/authusers/verify_email/${data}`
      );
      console.log(res.data);
      localStorage.setItem("userToken", res.data.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "User/fetchAllUsers",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINT}/authusers/fetch_users/admin`
    );
    console.log(response.data);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    studentUpdated(state, action) {
      const {
        _id,
        firstName,
        lastName,
        dateOfBirth,
        placeOfBirth,
        gender,
        jhsAttended,
        shsAttended,
        nationality,
        district,
        address,
        currentCity,
        homeTown,
        region,
        email,
        uniqueId,
        role,
        currentClassLevel,
        program,
        academicYear,
        studentRegistrar,
        studentRegistrarId,
        // religion,
        height,
        weight,
        // parents,
        // guardian,
        motherTongue,
        otherTongue,
        complexion,
        updatedBy,
        updatedByAdminId,
        updatedDate,
        password,
      } = action.payload;
      const updatedStudent = state.find((user) => user._id === _id);
      if (updatedStudent) {
        updatedStudent.firstName = firstName;
        updatedStudent.lastName = lastName;
        updatedStudent.dateOfBirth = dateOfBirth;
        updatedStudent.placeOfBirth = placeOfBirth;
        updatedStudent.gender = gender;
        updatedStudent.jhsAttended = jhsAttended;
        updatedStudent.shsAttended = shsAttended;
        updatedStudent.nationality = nationality;
        updatedStudent.district = district;
        updatedStudent.address = address;
        updatedStudent.currentCity = currentCity;
        updatedStudent.homeTown = homeTown;
        updatedStudent.region = region;
        updatedStudent.email = email;
        updatedStudent.uniqueId = uniqueId;
        updatedStudent.role = role;
        updatedStudent.currentClassLevel = currentClassLevel;
        updatedStudent.program = program;
        updatedStudent.academicYear = academicYear;
        updatedStudent.studentRegistrar = studentRegistrar;
        updatedStudent.studentRegistrarId = studentRegistrarId;
        // religion,
        updatedStudent.height = height;
        updatedStudent.weight = weight;
        // parents,
        // guardian,
        updatedStudent.motherTongue = motherTongue;
        updatedStudent.otherTongue = otherTongue;
        updatedStudent.complexion = complexion;
        updatedStudent.updatedBy = updatedBy;
        updatedStudent.updatedByAdminId = updatedByAdminId;
        updatedStudent.updatedDate = updatedDate;
        updatedStudent.password = password;
      }
    },
    userLogout(state) {
      localStorage.removeItem("userToken");
      return {
        ...state,
        userInfo: "",
        signUpUserStatus: "",
        fetchSingleUser: "",
        updateUserStatus: "",
        userEmailVerificationStatus: "",
        fetchingSingleUserStatus: "",
        fetchingUsersStatus: "",
        userError: "",
        userSuccessMessage: "",
        authenticated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state, action) => {
      return { ...state, signUpUserStatus: "pending" };
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          userInfo: action.payload.user,
          allUsers: [...state.allUsers, action.payload.user],
          signUpUserSuccessMessage: action.payload.successMessage,
          signUpUserStatus: "success",
        };
      } else return state;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      return {
        ...state,
        signUpUserStatus: "rejected",
        signUpError: action.payload,
      };
    });

    builder.addCase(userLogin.pending, (state, action) => {
      return { ...state, loginUserStatus: "pending" };
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload) {
        const user = tokenDecoded(action.payload.token);
        return {
          ...state,
          userInfo: user,
          successMessage: action.payload.successMessage,
          loginUserStatus: "success",
        };
      } else return state;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      return {
        ...state,
        loginUserStatus: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(userEmailVerification.pending, (state, action) => {
      return { ...state, loginUserStatus: "pending" };
    });
    builder.addCase(userEmailVerification.fulfilled, (state, action) => {
      if (action.payload) {
        const user = tokenDecoded(action.payload.token);
        return {
          ...state,
          userInfo: user,
          successMessage: action.payload.successMessage,
          loginUserStatus: "success",
        };
      } else return state;
    });
    builder.addCase(userEmailVerification.rejected, (state, action) => {
      return {
        ...state,
        loginUserStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchAllUsers.pending, (state, action) => {
      return { ...state, fetchingUsersStatus: "pending" };
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allUsers: action.payload.users,
          userSuccessMessage: action.payload.successMessage,
          fetchingUsersStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      return {
        ...state,
        fetchingUsersStatus: "rejected",
        userError: action.payload,
      };
    });
  },
});

export const { studentUpdated, userLogout } = userSlice.actions;
export const getAllUsers = (state) => state.user.allUsers;
export const getUser = (state) => state.user.userInfo;
export default userSlice.reducer;
