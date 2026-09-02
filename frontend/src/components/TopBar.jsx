import { useState } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import useAuth from "../hooks/useAuth";
import InitialsAvatar from "./InitialsAvatar";

/**
 * Top search area: rounded search field + search icon button + avatar button.
 * Search UI is visual-only (no backend search exists) — it never claims to filter results.
 */
const TopBar = ({ searchValue, onSearchChange }) => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        bgcolor: "background.default",
        pt: { xs: 1.5, sm: 2 },
        pb: 1,
        px: { xs: 1.5, sm: 0 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, maxWidth: 640, mx: "auto" }}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            bgcolor: "#EEF0F3",
            borderRadius: 999,
            px: 2,
            py: 1,
            minWidth: 0,
          }}
        >
          <InputBase
            placeholder="Search promotions, users, posts..."
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            sx={{ flexGrow: 1, fontSize: 15, color: "text.secondary", minWidth: 0 }}
            inputProps={{ "aria-label": "Search posts and users" }}
          />
        </Box>

        <IconButton
          sx={{ bgcolor: "primary.main", color: "#fff", "&:hover": { bgcolor: "primary.dark" } }}
          aria-label="Search"
        >
          <SearchRoundedIcon />
        </IconButton>

        <IconButton onClick={handleOpen} sx={{ p: 0 }} aria-label="Account menu">
          <InitialsAvatar username={user?.username} size={40} />
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" fontWeight={700}>
              {user?.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ gap: 1, color: "error.main" }}>
            <LogoutRoundedIcon fontSize="small" />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default TopBar;
