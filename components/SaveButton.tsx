import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  saved: boolean;
  onPress: () => void;
};

export default function SaveButton({ saved, onPress }: Props) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <FontAwesome
        name={saved ? "bookmark" : "bookmark-o"}
        size={24}
        color={saved ? "black" : "black"}
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
