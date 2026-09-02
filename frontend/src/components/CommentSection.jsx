import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import InitialsAvatar from "./InitialsAvatar";
import { formatRelativeTime } from "../utils/formatTime";

const CommentSection = ({ comments, onAddComment }) => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    try {
      await onAddComment(trimmed);
      setText("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
      {comments.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          No comments yet. Be the first to comment.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
          {comments.map((comment) => (
            <Box key={comment._id} sx={{ display: "flex", gap: 1.25 }}>
              <InitialsAvatar username={comment.username} size={30} />
              <Box
                sx={{
                  bgcolor: "#F4F5F7",
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.75,
                  flexGrow: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75, flexWrap: "wrap" }}>
                  <Typography variant="body2" fontWeight={700}>
                    @{comment.username}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatRelativeTime(comment.createdAt)}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                  {comment.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            "& .MuiOutlinedInput-root": { borderRadius: 5, bgcolor: "#F9FAFB" },
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSubmit}
          disabled={!text.trim() || submitting}
          sx={{ bgcolor: "primary.main", color: "#fff", "&:hover": { bgcolor: "primary.dark" }, "&.Mui-disabled": { bgcolor: "#E5E7EB" } }}
        >
          {submitting ? <CircularProgress size={18} color="inherit" /> : <SendRoundedIcon fontSize="small" />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default CommentSection;
