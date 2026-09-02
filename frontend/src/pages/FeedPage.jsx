import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TopBar from "../components/TopBar";
import CreatePost from "../components/CreatePost";
import FilterPills, { FILTERS } from "../components/FilterPills";
import PostCard from "../components/PostCard";
import PostSkeleton from "../components/PostSkeleton";
import EmptyState from "../components/EmptyState";
import BottomNav from "../components/BottomNav";
import FabCreate from "../components/FabCreate";
import useAuth from "../hooks/useAuth";
import {
  fetchPosts,
  createPostRequest,
  toggleLikeRequest,
  addCommentRequest,
  deletePostRequest,
} from "../services/postService";

const FeedPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Posts");
  const composerRef = useRef(null);

  const showToast = (message, severity = "success") => setToast({ open: true, message, severity });
  const closeToast = () => setToast((prev) => ({ ...prev, open: false }));

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchPosts();
      setPosts(res.data);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to load feed", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleCreatePost = async ({ text, imageFile }) => {
    const res = await createPostRequest({ text, imageFile });
    setPosts((prev) => [res.data, ...prev]);
    showToast("Post published");
  };

  const handleToggleLike = async (postId) => {
    const original = posts;
    setPosts((prev) =>
      prev.map((p) => {
        if (p._id !== postId) return p;
        const alreadyLiked = p.likes.some((l) => String(l.userId) === String(user.id));
        return {
          ...p,
          likes: alreadyLiked
            ? p.likes.filter((l) => String(l.userId) !== String(user.id))
            : [...p.likes, { userId: user.id, username: user.username }],
        };
      })
    );

    try {
      const res = await toggleLikeRequest(postId);
      setPosts((prev) => prev.map((p) => (p._id === postId ? { ...p, likes: res.data.likes } : p)));
    } catch (err) {
      setPosts(original);
      showToast(err.response?.data?.message || "Failed to update like", "error");
    }
  };

  const handleAddComment = async (postId, text) => {
    const original = posts;
    const tempComment = {
      _id: `temp-${Date.now()}`,
      userId: user.id,
      username: user.username,
      text,
      createdAt: new Date().toISOString(),
    };

    setPosts((prev) =>
      prev.map((p) => (p._id === postId ? { ...p, comments: [...p.comments, tempComment] } : p))
    );

    try {
      const res = await addCommentRequest(postId, text);
      setPosts((prev) =>
        prev.map((p) => {
          if (p._id !== postId) return p;
          const filtered = p.comments.filter((c) => c._id !== tempComment._id);
          return { ...p, comments: [...filtered, res.data.comment] };
        })
      );
    } catch (err) {
      setPosts(original);
      showToast(err.response?.data?.message || "Failed to add comment", "error");
    }
  };

  const handleDeletePost = async (postId) => {
    const original = posts;
    try {
      await deletePostRequest(postId);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
      showToast("Post deleted");
    } catch (err) {
      setPosts(original);
      throw err;
    }
  };

  const scrollToComposer = () => {
    composerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Client-side filtering/sorting over posts already loaded. Only "All Posts"
  // reflects true server order — the rest never claim server-side filtering.
  const visiblePosts = useMemo(() => {
    let result = posts;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) => p.text?.toLowerCase().includes(q) || p.user.username.toLowerCase().includes(q)
      );
    }

    switch (filter) {
      case "Most Liked":
        return [...result].sort((a, b) => b.likes.length - a.likes.length);
      case "Most Commented":
        return [...result].sort((a, b) => b.comments.length - a.comments.length);
      case "For You":
      case "All Posts":
      default:
        return result;
    }
  }, [posts, search, filter]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: { xs: 9, md: 3 } }}>
      <TopBar searchValue={search} onSearchChange={setSearch} />

      <Box sx={{ maxWidth: 640, mx: "auto", px: { xs: 1.5, sm: 2 } }}>
        <CreatePost ref={composerRef} onCreate={handleCreatePost} onError={(msg) => showToast(msg, "error")} />

        <FilterPills value={filter} onChange={setFilter} />

        {loading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : visiblePosts.length === 0 ? (
          <EmptyState
            title={posts.length === 0 ? "No posts yet" : "No posts match your search"}
            subtitle={
              posts.length === 0
                ? "Be the first to share something with the community."
                : "Try a different keyword or filter."
            }
          />
        ) : (
          visiblePosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onToggleLike={handleToggleLike}
              onAddComment={handleAddComment}
              onDelete={handleDeletePost}
            />
          ))
        )}
      </Box>

      <FabCreate onClick={scrollToComposer} />
      <BottomNav active="home" onCreateClick={scrollToComposer} />

      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={closeToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeToast} severity={toast.severity} variant="filled" sx={{ borderRadius: 2 }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FeedPage;
