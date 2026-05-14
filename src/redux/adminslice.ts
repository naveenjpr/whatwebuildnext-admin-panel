import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const adminCookie = Cookies.get("admin");

export let loginSlice = createSlice({
    name: "login",
    initialState: {
        adminDetails: adminCookie ? JSON.parse(adminCookie) : null
    },
    reducers: {
        saveLoginDetails: (state, reqData) => {
            state.adminDetails = reqData.payload.admin;
            Cookies.set("admin", JSON.stringify(reqData.payload.admin));
        },
        logOut: (state) => {
            state.adminDetails = null;
            Cookies.remove("admin");
        }
    }
});

export const { saveLoginDetails, logOut } = loginSlice.actions;
export default loginSlice.reducer;