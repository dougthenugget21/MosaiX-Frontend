import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";

type Props = {
  navOnClick: () => void;
  liked: boolean;
  saved: boolean;
};

export default function PostActions({ navOnClick, liked, saved }: Props) {
  return (
    <View style={styles.actionContainer}>
      <SaveButton saved={saved} />
      <LikeButton liked={liked} />
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
