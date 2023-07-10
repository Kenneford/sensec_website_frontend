import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  staffInfo: "",
  authStaffInfo: "",
  allStaffs: [],
  successMessage: "",
  error: "",
  registerStatus: "",
  loginStatus: "",
  logoutStatus: "",
  fetchingStatus: "",
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
    initialState.authStaffInfo = getStaffInfo;
    initialState.authenticated = true;
    initialState.loading = false;
  }
}

export const staffRegistory = createAsyncThunk(
  "Staff/staffRegistory",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/staffs/add_staff/admin`,
        data
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStaffs = createAsyncThunk("staff/fetchStaffs", async () => {
  const response = await axios.get(`${API_ENDPOINT}/staffs/get_all_staffs`);
  console.log(response.data);
  return response.data;
});

export const fetchTeachers = createAsyncThunk(
  "Staff/fetchTeachers",
  async () => {
    const response = await axios.get(`${API_ENDPOINT}/staffs/get_all_teachers`);
    console.log(response.data);
    return response.data;
  }
);

export const staffLogin = createAsyncThunk(
  "Staff/staffLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_ENDPOINT}/staffs/login`, data);
      console.log("Staff", res.data);
      localStorage.setItem("staffToken", res.data.token);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
export const adminLogin = createAsyncThunk(
  "Staff/adminLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/authusers/admin_login`,
        data
      );
      console.log("Admin", res.data);
      localStorage.setItem("staffToken", res.data.token);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
export const teacherLogin = createAsyncThunk(
  "Staff/teacherLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/authusers/teacher_login`,
        data
      );
      console.log("Teacher", res.data);
      localStorage.setItem("staffToken", res.data.token);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutStaff = createAsyncThunk(
  "Staff/logoutStaff",
  async ({ rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_ENDPOINT}/staffs/staff_logout`);
      console.log(res.data);
      if (res.data.success) {
        localStorage.removeItem("staffToken");
      }
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
const staffsSlice = createSlice({
  name: "Staff",
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
        authStaffInfo: "",
        successMessage: "",
        error: "",
        registerStatus: "",
        loginStatus: "",
        fetchingStatus: "",
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
          staffInfo: action.payload.staff,
          successMessage: action.payload.successMessage,
          registerStatus: "success",
          error: "",
          authenticated: false,
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
        const staff = tokenDecoded(action.payload.token);
        return {
          ...state,
          authStaffInfo: staff,
          successMessage: action.payload.successMessage,
          loginStatus: "success",
          authenticated: true,
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
        const admin = tokenDecoded(action.payload.token);
        return {
          ...state,
          authStaffInfo: admin,
          successMessage: action.payload.successMessage,
          loginStatus: "success",
          authenticated: true,
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
        const teacher = tokenDecoded(action.payload.token);
        return {
          ...state,
          authStaffInfo: teacher,
          successMessage: action.payload.successMessage,
          loginStatus: "success",
          authenticated: true,
        };
      } else return state;
    });
    builder.addCase(teacherLogin.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        error: action.payload.errorMessage,
      };
    });
    builder.addCase(logoutStaff.pending, (state, action) => {
      return { ...state, logoutStatus: "pending" };
    });
    builder.addCase(logoutStaff.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          staffInfo: "",
          authStaffInfo: "",
          successMessage: "",
          error: "",
          registerStatus: "",
          loginStatus: "",
          fetchingStatus: "",
          allStaffs: [],
          authenticated: false,
        };
      } else return state;
    });
    builder.addCase(logoutStaff.rejected, (state, action) => {
      return {
        ...state,
        logoutStatus: "rejected",
        error: "Logout failed!",
      };
    });

    builder.addCase(fetchStaffs.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchStaffs.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allStaffs: action.payload.staffs,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchStaffs.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(fetchTeachers.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allTeachers: action.payload.teachers,
          successMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchTeachers.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        error: action.payload,
      };
    });
  },
});

export const getAllStaffs = (state) => state.staff.allStaffs;
export const getAllTeachers = (state) => state.staff.allTeachers;
export const getStaffInfo = (state) => state.staff.authStaffInfo;
export const { staffLogout } = staffsSlice.actions;

export default staffsSlice.reducer;
