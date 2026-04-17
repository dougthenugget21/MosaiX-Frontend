import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  theme: string;
  textChange: () => void;
};

export default function InputBox({ theme, textChange }: Props) {
  if (theme === "description") {
    return (
      <View
        style={{
          width: "80%",
        }}
      >
        <TextInput
          multiline
          numberOfLines={5}
          maxLength={255}
          style={styles.innerBox}
          onChangeText={textChange}
          placeholder={`Insert ${theme} `}
        />
      </View>
    );
  }
  return (
    <View
      style={{
        width: "80%",
      }}
    >
      <TextInput
        style={styles.innerBox}
        maxLength={255}
        onChangeText={textChange}
        placeholder={`Insert ${theme} `}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  innerBox: {
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 15,
    padding: 10,
    margin: 5,
    flex: 1,
  },
});
