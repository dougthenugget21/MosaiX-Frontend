import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  onPressCurrent: () => void;
  onPressSelect: () => void;
};

export default function LocationButton({
  onPressCurrent,
  onPressSelect,
}: Props) {
  const [selected, setSelected] = useState<Boolean | false>(false);

  function colorChange() {}

  return (
    <View style={styles.buttonHolder}>
      <Pressable onPress={onPressCurrent} style={styles.outterButton}>
        <Text style={styles.buttonText}>Current</Text>
        <MaterialCommunityIcons
          name="map-marker-radius-outline"
          size={24}
          color={theme.primary}
        />
      </Pressable>
      <Pressable onPress={onPressSelect} style={styles.outterButton}>
        <Text style={styles.buttonText}>Select</Text>
        <MaterialCommunityIcons
          name="map-search-outline"
          size={24}
          color={theme.primary}
        />
      </Pressable>
    </View>
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
  buttonHolder: {
    flexDirection: "row",
    justifyContent: "center",
    gap: "2%",
    marginTop: 10,
    width: "100%",
    marginBottom: 10,
  },
  outterButton: {
    width: "40%",
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 50,
    backgroundColor: theme.cardSoft,
    borderColor: theme.border,
    borderWidth: 3,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignContent: "center",
  },
  buttonText: {
    color: theme.primary,
    fontWeight: 500,
    fontSize: 14,
    alignContent: "center",
    justifyContent: "center",
  },
});
