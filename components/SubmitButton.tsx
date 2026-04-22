import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  text: string;
  onPress: () => void;
};

export default function submitButton({ onPress, text }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.outterButton}>
      <Text style={styles.buttonText}>{text}</Text>
      <MaterialIcons
        name="add-circle-outline"
        size={24}
        color={theme.primary}
      />
    </Pressable>
  );
}

const theme = {
  bg: "#E6F2EA",
  card: "#FFFFFF",
  cardSoft: "#D8E9DD",
  primary: "#166534",
  accent: "#F97316",
  text: "#0F1F14",
  muted: "#4B5B52",
  border: "rgba(22, 101, 52, 0.15)",
};

const styles = StyleSheet.create({
  outterButton: {
    width: "60%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: theme.border,
    padding: 10,
    paddingHorizontal: 50,
    backgroundColor: theme.cardSoft,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: theme.primary,
    fontWeight: 500,
    fontSize: 18,
    alignContent: "center",
    justifyContent: "center",
  },
});
