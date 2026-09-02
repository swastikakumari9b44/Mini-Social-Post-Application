import { forwardRef, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import ShortTextRoundedIcon from "@mui/icons-material/ShortTextRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import InitialsAvatar from "./InitialsAvatar";
import useAuth from "../hooks/useAuth";

const MAX_LENGTH = 500;

// The "Promotions" segment is visual scaffolding only — this app has no promotions
// feature, so that segment is disabled rather than pretending to work.
const CreatePost = forwardRef(({ onCreate, onError }, ref) => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      onError?.("Please select a valid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onError?.("Image size must be under 5MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canSubmit = !submitting && (text.trim() || imageFile);

  const handleSubmit = async () => {
    if (!canSubmit) {
      onError?.("Write something or add an image before posting");
      return;
    }

    setSubmitting(true);
    try {
      await onCreate({ text: text.trim(), imageFile });
      setText("");
      removeImage();
    } catch (err) {
      onError?.(err.response?.data?.message || "Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card ref={ref} sx={{ borderRadius: 4, mb: 2.5, bgcolor: "#F7F8FA", border: "none" }} elevation={0}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5, flexWrap: "wrap", gap: 1 }}>
          <Typography variant="h6" sx={{ fontSize: 19 }}>
            Create Post
          </Typography>

          <Box sx={{ display: "flex", bgcolor: "#E4E7EC", borderRadius: 999, p: 0.4 }}>
            <Box
              sx={{
                px: 2,
                py: 0.6,
                borderRadius: 999,
                bgcolor: "primary.main",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              All Posts
            </Box>
            <Tooltip title="Promotions aren't available in this app yet">
              <Box
                sx={{
                  px: 2,
                  py: 0.6,
                  borderRadius: 999,
                  color: "text.secondary",
                  fontSize: 13,
                  fontWeight: 700,
                  opacity: 0.6,
                  cursor: "not-allowed",
                }}
              >
                Promotions
              </Box>
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <InitialsAvatar username={user?.username} />
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              maxRows={8}
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX_LENGTH))}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#FFFFFF",
                },
                "& fieldset": { border: "none" },
              }}
            />

            {imagePreview && (
              <Box sx={{ position: "relative", mt: 1.5, display: "inline-block" }}>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Selected preview"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: 280,
                    borderRadius: 3,
                    display: "block",
                    objectFit: "cover",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                />
                <IconButton
                  size="small"
                  onClick={removeImage}
                  aria-label="Remove selected image"
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                  }}
                >
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              </Box>
            )}

            <Box sx={{ borderTop: "1px solid", borderColor: "divider", mt: 1.5, pt: 1.25 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageSelect}
                  />
                  <Tooltip title="Add image">
                    <IconButton
                      onClick={() => fileInputRef.current?.click()}
                      sx={{ color: "primary.main" }}
                      aria-label="Add image"
                    >
                      <ImageRoundedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Emoji (coming soon)">
                    <span>
                      <IconButton sx={{ color: "primary.main" }} disabled aria-label="Emoji">
                        <InsertEmoticonRoundedIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Formatting (coming soon)">
                    <span>
                      <IconButton sx={{ color: "primary.main" }} disabled aria-label="More options">
                        <ShortTextRoundedIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                    {text.length}/{MAX_LENGTH}
                  </Typography>
                </Box>

                <IconButton
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  aria-label="Post"
                  sx={{
                    bgcolor: canSubmit ? "primary.main" : "#D9DEE7",
                    color: canSubmit ? "#fff" : "#98A2B3",
                    px: 2.5,
                    borderRadius: 999,
                    "&:hover": { bgcolor: canSubmit ? "primary.dark" : "#D9DEE7" },
                  }}
                >
                  {submitting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <>
                      <SendRoundedIcon fontSize="small" sx={{ mr: 0.75 }} />
                      <Typography variant="button" sx={{ fontWeight: 700 }}>
                        Post
                      </Typography>
                    </>
                  )}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

CreatePost.displayName = "CreatePost";

export default CreatePost;
