import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import useAuth from "../hooks/useAuth";
import InitialsAvatar from "./InitialsAvatar";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ maxWidth: 720, width: "100%", mx: "auto", px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
          <ForumRoundedIcon sx={{ color: "primary.main" }} />
          <Typography variant="h6" sx={{ fontSize: 20, letterSpacing: -0.3 }}>
            Circle
          </Typography>
        </Box>

        {user && (
          <>
            <Button
              onClick={handleOpen}
              sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.primary" }}
            >
              <InitialsAvatar username={user.username} size={32} />
              <Typography sx={{ display: { xs: "none", sm: "block" } }} variant="body2" fontWeight={600}>
                {user.username}
              </Typography>
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2" fontWeight={700}>
                  {user.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ gap: 1, color: "error.main" }}>
                <LogoutRoundedIcon fontSize="small" />
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
