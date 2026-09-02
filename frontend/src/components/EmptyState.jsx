import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const EmptyState = ({ title, subtitle }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 3,
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <AutoAwesomeRoundedIcon sx={{ fontSize: 36, color: "primary.main", mb: 1.5 }} />
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default EmptyState;
