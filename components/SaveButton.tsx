import Post from "@/assets/logic/Post";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  post: Post;
};

export default function SaveButton({ post }: Props) {
  const [isSaved, setIsSaved] = useState(post.saved);

  const toggleSaved = () => {
    if (isSaved) {
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }
  };

  return (
    <Pressable style={styles.iconButton} onPress={toggleSaved}>
      <FontAwesome
        name={isSaved ? "bookmark" : "bookmark-o"}
        size={24}
        color={isSaved ? "black" : "black"}
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
