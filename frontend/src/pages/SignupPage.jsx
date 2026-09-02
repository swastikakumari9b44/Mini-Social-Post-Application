import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import useAuth from "../hooks/useAuth";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      return "All fields are required";
    }
    if (form.username.trim().length < 3) {
      return "Username must be at least 3 characters";
    }
    if (!EMAIL_REGEX.test(form.email)) {
      return "Please provide a valid email address";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSubmitting(true);
    const res = await signup(form.username.trim(), form.email.trim(), form.password, form.confirmPassword);
    setSubmitting(false);

    if (res.success) {
      navigate("/", { replace: true });
    } else {
      setError(res.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 4.5 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3.5 }}>
          <ForumRoundedIcon sx={{ fontSize: 34, color: "primary.main", mb: 1 }} />
          <Typography variant="h5" fontWeight={700}>
            Create your account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Join Circle and start sharing
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Username"
            value={form.username}
            onChange={handleChange("username")}
            margin="normal"
            autoComplete="username"
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            margin="normal"
            autoComplete="email"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            margin="normal"
            autoComplete="new-password"
            helperText="At least 6 characters"
          />
          <TextField
            fullWidth
            label="Confirm password"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            margin="normal"
            autoComplete="new-password"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            sx={{ mt: 2.5, py: 1.2 }}
          >
            {submitting ? <CircularProgress size={22} color="inherit" /> : "Sign up"}
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 3 }} color="text.secondary">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1E88F5", fontWeight: 600, textDecoration: "none" }}>
            Log in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignupPage;
