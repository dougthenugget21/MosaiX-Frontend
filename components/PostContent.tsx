import Post from "@/assets/logic/Post";
import { StyleSheet, Text, View } from "react-native";
import PostActions from "./PostActions";
import PostImage from "./PostImage";
import PostTags from "./PostTags";
import ProfileBar from "./ProfileBar";

type Props = {
  post: Post;
  openCommentsAction: (post: Post) => void;
};

export default function postContent({ post, openCommentsAction }: Props) {
  const navAction = () => {};
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.postTitleText}>{post.title}</Text>
      <PostImage imgSource={post.image} />
      <View style={styles.textContainer}>
        <ProfileBar profile={post.user} />
        <Text>{post.description}</Text>
        <PostTags tags={post.tags}></PostTags>
        <PostActions
          post={post}
          modelOn={openCommentsAction}
          navOnClick={navAction}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    margin: 6,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
  },
  descriptionText: {},
  postTitleText: {
    fontSize: 20,
  },
});
