import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../../apiEndPoint/api";

const initialState = {
  adminInfo: "",
  authAdminInfo: "",
  allAdmins: [],
  adminSuccessMessage: "",
  adminError: "",
  registerAdminStatus: "",
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

const getAdminToken = localStorage.getItem("adminToken");
if (getAdminToken) {
  const getAdminInfo = tokenDecoded(getAdminToken);
  if (getAdminInfo) {
    initialState.authAdminInfo = getAdminInfo;
    initialState.authenticated = true;
    initialState.loading = false;
  }
}

export const adminRegistory = createAsyncThunk(
  "Admin/adminRegistory",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_ENDPOINT}/admins/add_admin`, data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminLogin = createAsyncThunk(
  "Admin/adminLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_ENDPOINT}/admins/login`, data);
      console.log("Admin", res.data);
      //   localStorage.setItem("user", res.data);
      localStorage.setItem("adminToken", res.data.token);
      return res.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAdmins = createAsyncThunk("Admin/fetchAdmins", async () => {
  const response = await axios.get(`${API_ENDPOINT}/admins/get_all_Admins`);
  // const students = response.data;
  console.log(response.data);
  return response.data;
});

export const fetchSingleAdmin = createAsyncThunk(
  "Admin/fetchSingleAdmin",
  async () => {
    const response = await axios.get(`${API_ENDPOINT}/admins/get_single_admin`);
    // const students = response.data;
    console.log(response.data);
    return response.data;
  }
);

// export const logoutAdmin = createAsyncThunk(
//   "Admin/logoutAdmin",
//   async ({ rejectWithValue }) => {
//     try {
//       const res = await axios.post(`${API_ENDPOINT}/admins/logout`);
//       console.log(res.data);
//       if (res.data.success) {
//         localStorage.removeItem("adminToken");
//       }
//     } catch (error) {
//       console.log(error.response);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const adminsSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    adminLogout(state, action) {
      localStorage.removeItem("adminToken");
      return {
        ...state,
        adminInfo: "",
        authAdminInfo: "",
        successMessage: "",
        adminError: "",
        registerAdminStatus: "",
        loginStatus: "",
        fetchingStatus: "",
        authenticated: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminRegistory.pending, (state, action) => {
      return { ...state, registerAdminStatus: "pending" };
    });
    builder.addCase(adminRegistory.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          adminInfo: action.payload.admin,
          adminSuccessMessage: action.payload.successMessage,
          registerAdminStatus: "success",
          adminError: "",
          authenticated: false,
        };
      } else return state;
    });
    builder.addCase(adminRegistory.rejected, (state, action) => {
      return {
        ...state,
        registerAdminStatus: "rejected",
        adminError: action.payload,
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
          authAdminInfo: admin,
          adminSuccessMessage: action.payload.successMessage,
          loginStatus: "success",
          authenticated: true,
        };
      } else return state;
    });
    builder.addCase(adminLogin.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        adminError: action.payload,
      };
    });

    // builder.addCase(logoutAdmin.pending, (state, action) => {
    //   return { ...state, logoutStatus: "pending" };
    // });
    // builder.addCase(logoutAdmin.fulfilled, (state, action) => {
    //   if (action.payload) {
    //     return {
    //       ...state,
    //       adminInfo: "",
    //       authAdminInfo: "",
    //       adminSuccessMessage: "",
    //       adminError: "",
    //       registerAdminStatus: "",
    //       loginStatus: "",
    //       fetchingStatus: "",
    //       allAdmins: [],
    //       authenticated: false,
    //     };
    //   } else return state;
    // });
    // builder.addCase(logoutAdmin.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     logoutStatus: "rejected",
    //     adminError: "Logout failed!",
    //   };
    // });

    builder.addCase(fetchAdmins.pending, (state, action) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchAdmins.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          allAdmins: action.payload.admins,
          adminSuccessMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchAdmins.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        adminError: action.payload,
      };
    });

    builder.addCase(fetchSingleAdmin.pending, (state) => {
      return { ...state, fetchingStatus: "pending" };
    });
    builder.addCase(fetchSingleAdmin.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          adminInfo: action.payload.admin,
          adminSuccessMessage: action.payload.successMessage,
          fetchingStatus: "success",
        };
      } else return state;
    });
    builder.addCase(fetchSingleAdmin.rejected, (state, action) => {
      return {
        ...state,
        fetchingStatus: "rejected",
        adminError: action.payload,
      };
    });
  },
});

export const getAllAdmins = (state) => state.admin.allAdmins;
export const getSingleAdmin = (state) => state.admin.adminInfo;
export const getAdminInfo = (state) => state.admin.authAdminInfo;
export const { adminLogout } = adminsSlice.actions;

export default adminsSlice.reducer;
