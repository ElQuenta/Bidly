import {
  AppBar, Toolbar,
} from "@mui/material";


const Navbar = () => {


  return (
    <>
      <AppBar position="fixed" sx={{backgroundColor: 'primary'}}>
        <Toolbar>{/* content */}</Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
export default Navbar;