import Post from "@/assets/logic/Post";
import { StyleSheet, View } from "react-native";
import CommentButton from "./CommentButton";
import IconButton from "./IconButton";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";

type Props = {
  navOnClick: () => void;
  modelOn: () => void;
  post: Post;
};

export default function PostActions({ navOnClick, modelOn, post }: Props) {
  return (
    <View style={styles.actionContainer}>
      <CommentButton post={post} setModal={modelOn} />
      <SaveButton post={post} />
      <LikeButton post={post} />
      <IconButton icon="location-arrow" onPress={() => {}} />
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
