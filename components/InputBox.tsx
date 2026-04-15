import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  theme: string;
};

export default function InputBox({ theme }: Props) {
  if (theme === "title") {
    return (
      <View>
        <TextInput defaultValue="Input Title Here" />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
