import {
  Box,
  CssBaseline,
  Toolbar,
} from "@mui/material";

import { Outlet } from "react-router";
// import Navbar from "./NavBar";



export const Layout = () => {

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        {/* <Navbar /> */}
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};