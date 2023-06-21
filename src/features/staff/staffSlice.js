import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  staffInfo: "",
  successMessage: "",
  error: "",
  registerStatus: "",
  loginStatus: "",
  fetchingStatus: "",
  // loginError: "",
  allStaffs: [
    // {
    //   id: 1,
    //   name: "Patrick Annan",
    //   course: "Science",
    // },
    // {
    //   id: 2,
    //   name: "Robert Afful",
    //   course: "E-Maths",
    // },
  ],
  loading: true,
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

const getStaffToken = localStorage.getItem("staffToken");
if (getStaffToken) {
  const getStaffInfo = tokenDecoded(getStaffToken);
  if (getStaffInfo) {
    initialState.staffInfo = getStaffInfo;
    initialState.authenticated = true;
    initialState.loading = false;
  }
}

export const staffRegistory = createAsyncThunk(
  "staffs/staffRegistory",
  async (data, { rejectWithValue }) => {
    try {
      await axios.post(`${API_ENDPOINT}/authusers/add_staff`, data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const staffLogin = createAsyncThunk(
  "staffs/staffLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/authusers/staff_login`,
        data
      );
      console.log("Staff", res.data);
      //   localStorage.setItem("user", res.data);
      localStorage.setItem("staffToken", res.data.token);
      return res.data.token;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminLogin = createAsyncThunk(
  "admins/adminLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/authusers/admin_login`,
        data
      );
      console.log("Admin", res.data);
      //   localStorage.setItem("user", res.data);
      localStorage.setItem("staffToken", res.data.token);
      return res.data.token;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
export const teacherLogin = createAsyncThunk(
  "teachers/teacherLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/authusers/teacher_login`,
        data
      );
      console.log("Teacher", res.data);
      //   localStorage.setItem("user", res.data);
      localStorage.setItem("staffToken", res.data.token);
      return res.data.token;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const staffsSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    // loadUser(state, action) {
    //   const staffInfo = state.staffInfo;
    //   if (staffInfo) {
    //     const user = tokenDecoded(staffInfo);
    //     return {
    //       ...state,
    //       staffInfo,
    //       name: user.name,
    //       email: user.email,
    //       _id: user._id,
    //       userLoaded: true,
    //     };
    //   } else return { ...state, userLoaded: true };
    // },
    staffLogout(state, action) {
      localStorage.removeItem("staffToken");

      return {
        ...state,
        staffInfo: "",
        successMessage: "",
        error: "",
        registerStatus: "",
        loginStatus: "",
        // loginError: "",
        allStaffs: [
          // {
          //   id: 1,
          //   name: "Patrick Annan",
          //   course: "Science",
          // },
          // {
          //   id: 2,
          //   name: "Robert Afful",
          //   course: "E-Maths",
          // },
        ],
        loading: true,
        authenticated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(staffRegistory.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(staffRegistory.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          staffInfo: action.payload,
          successMessage: "Staff Registered Successfully...",
          registerStatus: "success",
          error: "",
          authenticated: false,
          loading: false,
        };
      } else return state;
    });
    builder.addCase(staffRegistory.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(staffLogin.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(staffLogin.fulfilled, (state, action) => {
      if (action.payload) {
        const staff = tokenDecoded(action.payload);
        return {
          ...state,
          staffInfo: staff,
          successMessage: "Login Successful...",
          loginStatus: "success",
          authenticated: true,
          loading: false,
        };
      } else return state;
    });
    builder.addCase(staffLogin.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(adminLogin.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      if (action.payload) {
        const admin = tokenDecoded(action.payload);
        return {
          ...state,
          staffInfo: admin,
          successMessage: "Login Successful...",
          loginStatus: "success",
          authenticated: true,
          loading: false,
        };
      } else return state;
    });
    builder.addCase(adminLogin.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(teacherLogin.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(teacherLogin.fulfilled, (state, action) => {
      if (action.payload) {
        const teacher = tokenDecoded(action.payload);
        return {
          ...state,
          staffInfo: teacher,
          successMessage: "Login Successful...",
          loginStatus: "success",
          authenticated: true,
          loading: false,
        };
      } else return state;
    });
    builder.addCase(teacherLogin.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        error: action.payload,
      };
    });
    // builder.addCase(fetchAllStaffs.pending, (state, action) => {
    //   return { ...state, fetchingStatus: "pending" };
    // });
    // builder.addCase(fetchAllStaffs.fulfilled, (state, action) => {
    //   if (action.payload) {
    //     // const staff = tokenDecoded(action.payload);
    //     return {
    //       ...state,
    //       allStaffs: action.payload,
    //       successMessage: "All staffs data fetch successful!",
    //       loading: false,
    //     };
    //   } else return state;
    // });
    // builder.addCase(fetchAllStaffs.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     fetchingStatus: "rejected",
    //     errorMessage: action.payload,
    //   };
    // });
  },
});

export const getAllStaffs = (state) => state.staffs.allStaffs;
export const getStaffInfo = (state) => state.staffs.staffInfo;
export const { staffLogout } = staffsSlice.actions;

export default staffsSlice.reducer;
