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
      <MaterialIcons name="add-circle-outline" size={24} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outterButton: {
    width: "60%",
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 50,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: 500,
    fontSize: 18,
    alignContent: "center",
    justifyContent: "center",
  },
});
