import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  icon: keyof typeof FontAwesome.glyphMap;
  onPress: () => void;
};

export default function IconButton({ icon, onPress }: Props) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <FontAwesome name={icon} size={24} color="black" />
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
