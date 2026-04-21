import Post, { postObj } from "./Post";
import { UserData } from "./User";
interface Post_Api {
  id: number;
  profile_id: number;
  photo_url: string;
  longitude: number;
  latitude: number;
  post_title: string;
  post_desc: string;
  like_count: number;
  created_date: string;
  tags: string[];
  profilephoto_url: string;
  reputation_badge: string;
  user_name: string;
  is_liked: boolean;
  is_saved: boolean;
}

export default async function getPostsByLocation(userId: number) {
  try {
    const res = await fetch(
      `https://mosaix-backend.onrender.com/posts/nearby?long=0&&lat0&&dist=100000&&profileId=${userId}`,
    );
    let data = await res.json();
    //data = JSON.parse(data) as Post_Api[];
    return parsePostData(data);
  } catch (error) {
    console.log(error);
    return [];
  }
}

function parsePostData(data: Post_Api[]) {
  const formattedData = data.map((ele) => {
    const profile: UserData = {
      name: ele.user_name,
      id: ele.profile_id,
      title: ele.reputation_badge,
      image: ele.profilephoto_url,
    };
    const obj: postObj = {
      id: ele.id,
      image: ele.photo_url,
      longitude: ele.longitude,
      latitude: ele.latitude,
      title: ele.post_title,
      description: ele.post_desc,
      tags: ele.tags,
      saved: ele.is_saved,
      liked: ele.is_liked,
      user: profile,
    };
    return new Post(obj);
  });
  return formattedData;
}
