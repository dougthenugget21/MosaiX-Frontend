import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  id: number;
  setModal: () => void;
};

export default function CommentButton({ id, setModal }: Props) {
  return (
    <Pressable style={styles.iconButton} onPress={setModal}>
      <FontAwesome name="comment-o" size={24} color="black" />
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
