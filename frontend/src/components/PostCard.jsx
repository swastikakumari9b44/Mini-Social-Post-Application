import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import InitialsAvatar from "./InitialsAvatar";
import CommentSection from "./CommentSection";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { formatRelativeTime } from "../utils/formatTime";
import useAuth from "../hooks/useAuth";

// Follow / badge / status UI is intentionally omitted — this app has no following
// feature or user-status data, so we don't fabricate one for visual parity.
const PostCard = ({ post, onToggleLike, onAddComment, onDelete }) => {
  const { user } = useAuth();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Compare as strings — Mongo ObjectIds and string ids must never be compared
  // with === directly, or an owned post silently reads as "not mine".
  const isOwnPost = Boolean(user?.id) && String(post.user.userId) === String(user.id);
  const isLiked = post.likes.some((like) => String(like.userId) === String(user?.id));
  const likeNames = post.likes.map((l) => l.username).join(", ");

  const handleConfirmDelete = async () => {
    setDeleting(true);
    setDeleteError("");
    try {
      await onDelete(post._id);
      setConfirmOpen(false);
    } catch (err) {
      setDeleteError(err.response?.data?.message || "Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card sx={{ borderRadius: 4, mb: 2, border: "1px solid", borderColor: "divider" }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <InitialsAvatar username={post.user.username} />
            <Box>
              <Typography variant="subtitle2" fontWeight={800}>
                {post.user.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatRelativeTime(post.createdAt)}
              </Typography>
            </Box>
          </Box>

          <IconButton
            size="small"
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            aria-label="Post options"
          >
            <MoreHorizRoundedIcon />
          </IconButton>

          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
            {isOwnPost ? (
              <MenuItem
                onClick={() => {
                  setMenuAnchor(null);
                  setConfirmOpen(true);
                }}
                sx={{ color: "error.main", gap: 0 }}
              >
                <ListItemIcon>
                  <DeleteOutlineRoundedIcon fontSize="small" color="error" />
                </ListItemIcon>
                Delete
              </MenuItem>
            ) : (
              <MenuItem disabled onClick={() => setMenuAnchor(null)}>
                No actions available
              </MenuItem>
            )}
          </Menu>
        </Box>

        {post.text && (
          <Typography
            variant="body1"
            sx={{
              mb: post.image ? 1.5 : 1,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              lineHeight: 1.55,
            }}
          >
            {post.text}
          </Typography>
        )}

        {post.image && (
          <Box
            component="img"
            src={post.image}
            alt="Post attachment"
            loading="lazy"
            sx={{
              width: "100%",
              maxHeight: 480,
              objectFit: "cover",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              mb: 1,
            }}
          />
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}>
          <Tooltip title={likeNames || "No likes yet"} disableHoverListener={post.likes.length === 0}>
            <Button
              onClick={() => onToggleLike(post._id)}
              startIcon={isLiked ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
              sx={{
                color: isLiked ? "#E0245E" : "text.secondary",
                px: 1.25,
                borderRadius: 999,
                transition: "color 0.15s ease, background-color 0.15s ease",
                "&:hover": { bgcolor: "rgba(224,36,94,0.08)" },
              }}
            >
              {post.likes.length}
            </Button>
          </Tooltip>

          <Button
            onClick={() => setCommentsOpen((prev) => !prev)}
            startIcon={<ChatBubbleOutlineRoundedIcon />}
            sx={{ color: "text.secondary", px: 1.25, borderRadius: 999 }}
          >
            {post.comments.length}
          </Button>
        </Box>

        <Collapse in={commentsOpen} timeout={200}>
          <CommentSection
            comments={post.comments}
            onAddComment={(text) => onAddComment(post._id, text)}
          />
        </Collapse>
      </CardContent>

      <ConfirmDeleteDialog
        open={confirmOpen}
        onClose={() => {
          if (!deleting) {
            setConfirmOpen(false);
            setDeleteError("");
          }
        }}
        onConfirm={handleConfirmDelete}
        loading={deleting}
        error={deleteError}
      />
    </Card>
  );
};

export default PostCard;
