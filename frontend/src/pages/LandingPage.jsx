import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import InitialsAvatar from "../components/InitialsAvatar";

const FEATURES = [
  { icon: <EditNoteRoundedIcon />, title: "Share Your Thoughts", desc: "Post text updates in seconds and start the conversation." },
  { icon: <ImageRoundedIcon />, title: "Share Images", desc: "Attach a photo to any post, with a live preview before you publish." },
  { icon: <FavoriteRoundedIcon />, title: "Like & Comment", desc: "React to posts and reply with comments in a clean, threaded feed." },
  { icon: <PeopleAltRoundedIcon />, title: "Discover the Community", desc: "Browse a public feed of everything the community is sharing." },
];

const STEPS = [
  "Create your account",
  "Share a post",
  "Like, comment and connect",
];

const LandingPage = () => {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Top bar */}
      <Box sx={{ maxWidth: 1080, mx: "auto", px: { xs: 2, sm: 3 }, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ForumRoundedIcon sx={{ color: "primary.main" }} />
          <Typography variant="h6">Circle</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button component={Link} to="/login" sx={{ color: "text.primary" }}>
            Sign In
          </Button>
          <Button component={Link} to="/signup" variant="contained">
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Hero */}
      <Box sx={{ maxWidth: 1080, mx: "auto", px: { xs: 2, sm: 3 }, pt: { xs: 3, md: 6 }, pb: { xs: 4, md: 6 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" sx={{ fontSize: { xs: 32, sm: 40, md: 46 }, lineHeight: 1.15, mb: 2 }}>
              Share. Connect. Engage.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: 17, mb: 3.5, maxWidth: 460 }}>
              Share your thoughts, discover posts, and join meaningful conversations.
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Button component={Link} to="/signup" variant="contained" size="large" sx={{ px: 3.5, py: 1.3 }}>
                Get Started
              </Button>
              <Button component={Link} to="/login" variant="outlined" size="large" sx={{ px: 3.5, py: 1.3, borderColor: "divider", color: "text.primary" }}>
                Sign In
              </Button>
            </Box>
          </Grid>

          {/* Static social feed preview */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 4, p: 2.5, bgcolor: "#F7F8FA", border: "none" }} elevation={0}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.5 }}>
                <InitialsAvatar username="Amara Diallo" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={800}>
                    Amara Diallo
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    2h ago
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mb: 1.5 }}>
                Just wrapped up a sunrise hike 🌄 — nothing beats starting the day like
                this. Who else is an early riser?
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 160,
                  borderRadius: 3,
                  mb: 1.5,
                  background: "linear-gradient(135deg, #4DA3FF 0%, #F5A623 100%)",
                }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Chip
                  icon={<FavoriteRoundedIcon sx={{ fontSize: 16, color: "#fff !important" }} />}
                  label="128"
                  size="small"
                  sx={{ bgcolor: "primary.main", color: "#fff" }}
                />
                <Chip
                  icon={<ChatBubbleOutlineRoundedIcon sx={{ fontSize: 16 }} />}
                  label="32"
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Features */}
      <Box sx={{ maxWidth: 1080, mx: "auto", px: { xs: 2, sm: 3 }, py: { xs: 4, md: 6 } }}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 4 }}>
          Everything you need to stay connected
        </Typography>
        <Grid container spacing={2.5}>
          {FEATURES.map((f) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={f.title}>
              <Card sx={{ borderRadius: 4, p: 2.5, height: "100%", textAlign: "center" }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: "rgba(30,136,245,0.1)",
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1.5,
                  }}
                >
                  {f.icon}
                </Box>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 0.5 }}>
                  {f.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {f.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* How it works */}
      <Box sx={{ maxWidth: 1080, mx: "auto", px: { xs: 2, sm: 3 }, py: { xs: 4, md: 6 } }}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 4 }}>
          How it works
        </Typography>
        <Grid container spacing={2.5}>
          {STEPS.map((step, idx) => (
            <Grid size={{ xs: 12, sm: 4 }} key={step}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1.5,
                    fontWeight: 800,
                  }}
                >
                  {idx + 1}
                </Box>
                <Typography variant="body1" fontWeight={700}>
                  {step}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Final CTA */}
      <Box sx={{ maxWidth: 1080, mx: "auto", px: { xs: 2, sm: 3 }, py: { xs: 5, md: 7 } }}>
        <Card
          sx={{
            borderRadius: 5,
            p: { xs: 4, md: 6 },
            textAlign: "center",
            background: "linear-gradient(135deg, #1E88F5 0%, #1565C7 100%)",
            border: "none",
          }}
        >
          <Typography variant="h4" sx={{ color: "#fff", fontSize: { xs: 26, md: 32 }, mb: 2 }}>
            Ready to share something?
          </Typography>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            size="large"
            sx={{ bgcolor: "#fff", color: "primary.main", px: 4, "&:hover": { bgcolor: "#F2F4F7" } }}
          >
            Create Your Account
          </Button>
        </Card>
      </Box>

      {/* Footer */}
      <Box sx={{ borderTop: "1px solid", borderColor: "divider", py: 3, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ maxWidth: 1080, mx: "auto", display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="subtitle2" fontWeight={800}>
              Circle
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Share your thoughts, discover posts, and join meaningful conversations.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography component={Link} to="/login" variant="body2" sx={{ color: "primary.main", textDecoration: "none", fontWeight: 700 }}>
              Login
            </Typography>
            <Typography component={Link} to="/signup" variant="body2" sx={{ color: "primary.main", textDecoration: "none", fontWeight: 700 }}>
              Sign Up
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
