import { UserData } from "./User";

export type postObj = {
  id: number;
  image: string;
  title: string;
  user: UserData;
  description: string;
  latitude: number;
  longitude: number;
  liked: boolean;
  saved: boolean;
  tags: Array<string>;
};

export default class Post {
  id: number;
  user: UserData;
  title: string;
  description: string;
  liked: boolean;
  saved: boolean;
  tags: Array<string>;
  latitude: number;
  longitude: number;
  image: string;

  constructor(data: postObj) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.liked = data.liked;
    this.saved = data.saved;
    this.tags = data.tags;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.user = data.user;
    this.image = data.image;
  }

  /**
   * likePost
   */
  public toggleLikedPost(loggedInUserId: number) {
    if (this.liked) {
      fetch(
        `https://mosaix-backend.onrender.com/posts/unLike?postId=${this.id}&&profileId=${loggedInUserId}`,
        {
          method: "PATCH",
        },
      );
      this.liked = false;
    } else {
      fetch(
        `https://mosaix-backend.onrender.com/posts/addLike?postId=${this.id}&&profileId=${loggedInUserId}`,
        {
          method: "PATCH",
        },
      );
      this.liked = true;
    }
  }

  /**
   * savePost
   */
  public savePost(loggedInUserId: number) {
    // http request goes here
  }

  /**
   * deletePost
   */
  public deletePost(loggedInUserId: number) {
    // https request goes here
  }
  /**
   * fetchComments
   */
  public fetchComments() {
    // http request goes here
  }
}
