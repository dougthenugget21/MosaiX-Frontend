import { UserData } from "./User";

export type CommentData = {
  id: number;
  post_id: number;
  body: string;
  user: UserData;
};

export default class PostComment {
  id: number;
  post_id: number;
  body: string;
  user: UserData;
  constructor(data: CommentData) {
    this.id = data.id;
    this.post_id = data.post_id;
    this.body = data.body;
    this.user = data.user;
  }
  /**
   * deleteComment
   */
  public deleteComment() {
    // Add thing here
  }
}
