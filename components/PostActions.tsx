import Post from "@/assets/logic/Post";
import { StyleSheet, View } from "react-native";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import NavButton from "./NavButton";
import SaveButton from "./SaveButton";

type Props = {
  modelOn: (post: Post) => void;
  post: Post;
};

export default function PostActions({ modelOn, post }: Props) {
  return (
    <View style={styles.actionContainer}>
      <CommentButton post={post} setModal={modelOn} />
      <SaveButton post={post} />
      <LikeButton post={post} />
      <NavButton post={post} />
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
