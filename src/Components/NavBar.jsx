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
import { ChatContext } from "../store/Context/ChatContext";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { authLogout } = useContext(AuthActions);
  const navigation = useNavigate();

  const { myProfile } = useContext(ChatContext);

  const menuItemStyles = { width: 200, justifyContent: "center" };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
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
              <MenuItem
                sx={[menuItemStyles, { color: "#7F33EB" }]}
                onClick={handleClose}
              >
                {myProfile.name}
              </MenuItem>
              <MenuItem
                sx={menuItemStyles}
                onClick={() => {
                  handleClose();
                  navigation("/add-contact");
                }}
              >
                New Chat
              </MenuItem>
              <MenuItem
                sx={menuItemStyles}
                onClick={() => {
                  handleClose();
                  navigation("/smart-lens");
                }}
              >
                Smart Lens
              </MenuItem>
              <MenuItem
                sx={menuItemStyles}
                onClick={() => {
                  handleClose();
                  navigation("/about-us");
                }}
              >
                About Us
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
