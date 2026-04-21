export default function addComment(
  userId: number,
  postId: number,
  commentContent: string,
) {
  fetch(`https://mosaix-backend.onrender.com/comment/add/`, {
    method: "POST",
    headers: {
      contentType: "application/json",
    },
    body: JSON.stringify({
      post_id: postId,
      by_profile_id: userId,
      comment: commentContent,
    }),
  });
}
