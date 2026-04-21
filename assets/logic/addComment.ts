export default async function addComment(
  userId: number,
  postId: number,
  commentContent: string,
) {
  const body = JSON.stringify({
    post_id: postId,
    by_profile_id: Number(userId),
    comment: commentContent.toString(),
  });
  console.log(body);
  await fetch(`https://mosaix-backend.onrender.com/comment/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
}
