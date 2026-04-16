import Fontisto from "@expo/vector-icons/Fontisto";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  liked: boolean;
};

export default function LikeButton({ liked }: Props) {
  const [isLiked, setIsLiked] = useState(liked);

  const toggleLiked = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  };

  return (
    <Pressable style={styles.iconButton} onPress={toggleLiked}>
      <Fontisto
        name={isLiked ? "heart" : "heart-alt"}
        size={24}
        color={isLiked ? "red" : "black"}
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
