import { UserData } from "./User";
type postObj = {
  id: number;
  postImgSource: string;
  postTitle: string;
  user: UserData;
  description: string;
  latitude: number;
  longitude: number;
  liked: boolean;
  saved: boolean;
  tags: Array<string>;
};
class Post {
  id: number;
  user: UserData;
  title: string;
  description: string;
  liked: boolean;
  saved: boolean;
  tags: Array<string>;
  latitude: number;
  longitude: number;

  constructor(data: postObj) {
    this.id = data.id;
    this.title = data.postTitle;
    this.description = data.description;
    this.liked = data.liked;
    this.saved = data.saved;
    this.tags = data.tags;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.user = data.user;
  }

  /**
   * likePost
   */
  public likePost(loggedInUserId: number) {
    // fetch request goes here
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
}
