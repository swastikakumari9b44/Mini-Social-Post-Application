import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import useAuth from "../hooks/useAuth";

// Only Home + Create are real navigation targets in this single-page app.
// "Profile" opens the account menu (logout) rather than a fabricated profile page,
// since no profile feature exists in the backend.
const BottomNav = ({ active, onCreateClick }) => {
  const { logout } = useAuth();

  const items = [
    { key: "home", label: "Home", icon: <HomeRoundedIcon /> },
    { key: "create", label: "Create", icon: <AddCircleRoundedIcon /> },
    { key: "profile", label: "Logout", icon: <PersonRoundedIcon /> },
  ];

  const handleClick = (key) => {
    if (key === "create") onCreateClick?.();
    if (key === "profile") logout();
  };

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        justifyContent: "space-around",
        py: 0.75,
        zIndex: 20,
        pb: "calc(env(safe-area-inset-bottom, 0px) + 6px)",
      }}
    >
      {items.map((item) => {
        const isActive = active === item.key;
        return (
          <Box
            key={item.key}
            component="button"
            onClick={() => handleClick(item.key)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.25,
              background: "none",
              border: "none",
              color: isActive ? "primary.main" : "text.secondary",
              cursor: "pointer",
              fontFamily: "inherit",
              px: 1,
            }}
          >
            {item.key === "profile" ? <LogoutRoundedIcon /> : item.icon}
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: 11 }}>
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default BottomNav;
