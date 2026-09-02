import api from "./api";

export const fetchPosts = async (page = 1, limit = 20) => {
  const { data } = await api.get(`/posts?page=${page}&limit=${limit}`);
  return data;
};

export const createPostRequest = async ({ text, imageFile }) => {
  const formData = new FormData();
  if (text) formData.append("text", text);
  if (imageFile) formData.append("image", imageFile);

  const { data } = await api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deletePostRequest = async (postId) => {
  const { data } = await api.delete(`/posts/${postId}`);
  return data;
};

export const toggleLikeRequest = async (postId) => {
  const { data } = await api.post(`/posts/${postId}/like`);
  return data;
};

export const addCommentRequest = async (postId, text) => {
  const { data } = await api.post(`/posts/${postId}/comments`, { text });
  return data;
};

export const deleteCommentRequest = async (postId, commentId) => {
  const { data } = await api.delete(`/posts/${postId}/comments/${commentId}`);
  return data;
};
