import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1E88F5", // vivid blue, TaskPlanet-inspired
      dark: "#1565C7",
      light: "#4DA3FF",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F5A623", // gold/yellow accent for highlighted social content
      dark: "#C97F00",
      light: "#FFC55C",
      contrastText: "#1A1D29",
    },
    background: {
      default: "#F2F4F7",
      paper: "#FFFFFF",
    },
    surface: {
      main: "#F7F8FA",
    },
    text: {
      primary: "#101828",
      secondary: "#667085",
    },
    divider: "#E4E7EC",
    error: { main: "#E0245E" },
    success: { main: "#22A365" },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h5: { fontWeight: 800 },
    h6: { fontWeight: 800 },
    button: { fontWeight: 700, textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 8,
          paddingBottom: 8,
          boxShadow: "none",
        },
        contained: {
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
          "&.Mui-disabled": {
            backgroundColor: "#D9DEE7",
            color: "#98A2B3",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #E4E7EC",
          boxShadow: "0px 2px 10px rgba(16, 24, 40, 0.04)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 999,
        },
      },
    },
  },
});

export default theme;
