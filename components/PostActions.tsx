import { StyleSheet, View } from "react-native";
import CommentButton from "./CommentButton";
import IconButton from "./IconButton";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";

type Props = {
  navOnClick: () => void;
  modelOn: () => void;
  liked: boolean;
  saved: boolean;
};

export default function PostActions({
  navOnClick,
  modelOn,
  liked,
  saved,
}: Props) {
  return (
    <View style={styles.actionContainer}>
      <CommentButton id={1} setModal={modelOn} />
      <SaveButton saved={saved} />
      <LikeButton liked={liked} />
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
