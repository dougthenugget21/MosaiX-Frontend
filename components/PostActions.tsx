import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";

type Props = {
  navOnClick: () => void;
  likeOnClick: () => void;
  saveOnClick: () => void;
  liked: boolean;
  saved: boolean;
};

export default function PostActions({
  navOnClick,
  likeOnClick,
  saveOnClick,
  liked,
  saved,
}: Props) {
  return (
    <View style={styles.actionContainer}>
      <SaveButton onPress={saveOnClick} saved={saved} />
      <LikeButton liked={liked} onPress={likeOnClick} />
      <IconButton icon="location-arrow" onPress={navOnClick} />
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
