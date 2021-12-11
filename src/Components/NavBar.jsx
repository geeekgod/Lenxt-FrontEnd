import React, { memo, useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThreeDotIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { AuthActions } from "../store/Actions/AuthActions";
import { useNavigate } from "react-router";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { authLogout } = useContext(AuthActions);
  const navigation = useNavigate();

  const menuItemStyles = { width: 200, justifyContent: "center" };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#9757EF" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lenxt Chat
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <ThreeDotIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem sx={menuItemStyles} onClick={handleClose}>
                My Profile
              </MenuItem>
              <MenuItem sx={menuItemStyles} onClick={handleClose}>
                New Chat
              </MenuItem>
              <MenuItem sx={menuItemStyles} onClick={handleClose}>
                Privacy Policy
              </MenuItem>
              <MenuItem sx={menuItemStyles} onClick={handleClose}>
                Smart Lens
              </MenuItem>
              <MenuItem
                sx={menuItemStyles}
                onClick={() => {
                  handleClose();
                  authLogout();
                  navigation("/auth/signin");
                }}
              >
                Log Out
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default memo(NavBar);
