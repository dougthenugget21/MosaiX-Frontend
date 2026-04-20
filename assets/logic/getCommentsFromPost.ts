import PostComment, { CommentData } from "./PostComment";
import { UserData } from "./User";
interface Comment_APi {
  id: number;
  post_id: 3;
  comment: string;
  by_profile_id: number;
  user_name: string;
  created_date: string;
  profilephoto_url: string;
  reputation_badge: string;
}

export default async function getCommentsFromPost(id: number) {
  try {
    const res = await fetch(
      `https://mosaix-backend.onrender.com/comment/allcomments/${id}`,
    );
    let data = await res.json();
    console.log(data);
    return parseCommentData(data);
  } catch (error) {
    console.log(error);
    return [];
  }
}

function parseCommentData(data: Comment_APi[]) {
  const formattedData = data.map((ele) => {
    const profile: UserData = {
      name: ele.user_name,
      id: ele.by_profile_id,
      title: ele.reputation_badge,
      image: ele.profilephoto_url,
    };
    const obj: CommentData = {
      id: ele.id,
      post_id: ele.post_id,
      body: ele.comment,
      user: profile,
    };
    return new PostComment(obj);
  });
  return formattedData;
}
