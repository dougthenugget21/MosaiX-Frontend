import Fontisto from "@expo/vector-icons/Fontisto";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  liked: boolean;
  onPress: () => void;
};

export default function LikeButton({ liked, onPress }: Props) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <Fontisto
        name={liked ? "heart" : "heart-alt"}
        size={24}
        color={liked ? "red" : "black"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "black",
    marginTop: 12,
  },
});
