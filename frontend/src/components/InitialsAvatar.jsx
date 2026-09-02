import Avatar from "@mui/material/Avatar";
import { getInitials } from "../utils/formatTime";

const COLORS = ["#3355FF", "#22A365", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#EC4899"];

const colorFromName = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
};

const InitialsAvatar = ({ username, size = 40 }) => {
  return (
    <Avatar
      sx={{
        bgcolor: colorFromName(username),
        width: size,
        height: size,
        fontSize: size * 0.4,
        fontWeight: 700,
      }}
    >
      {getInitials(username)}
    </Avatar>
  );
};

export default InitialsAvatar;
