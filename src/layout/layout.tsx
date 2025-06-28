import {
  Box,
  CssBaseline,
} from "@mui/material";

import { Outlet } from "react-router";
import Navbar from "./NavBar";



export const Layout = ({ children }: { children?: React.ReactNode }) => {

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box component="main" sx={{ p: 3 }}>
          {children ?? <Outlet />}
        </Box>
      </Box>
    </Box>
  );
};