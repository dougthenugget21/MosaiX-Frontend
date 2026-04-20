import Post from "@/assets/logic/Post";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  post: Post;
};

export default function LikeButton({ post }: Props) {
  const [isLiked, setIsLiked] = useState(post.liked);

  const toggleLiked = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  };

  return (
    <Pressable
      style={styles.iconButton}
      onPress={toggleLiked}
      accessibilityRole="button"
    >
      <Fontisto
        name={isLiked ? "heart" : "heart-alt"}
        size={24}
        color={isLiked ? "red" : "black"}
        testID="icon"
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
