import Fab from "@mui/material/Fab";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

// Scrolls to the existing composer rather than duplicating post-creation logic.
const FabCreate = ({ onClick }) => (
  <Fab
    color="primary"
    onClick={onClick}
    aria-label="Create post"
    sx={{
      position: "fixed",
      right: 20,
      bottom: 76,
      display: { xs: "flex", md: "none" },
      boxShadow: "0px 6px 16px rgba(30,136,245,0.35)",
      zIndex: 20,
    }}
  >
    <AddRoundedIcon />
  </Fab>
);

export default FabCreate;
