import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import ProfileIcon from "./ProfileIcon";

type Props = {
  imgSource: ImageSourcePropType;
  title: string;
  username: string;
};

export default function ProfileBar({ imgSource, title, username }: Props) {
  return (
    <View style={styles.profileBar}>
      <ProfileIcon imgSource={imgSource} />
      <Text style={styles.profileTitle}>{title} </Text>
      <Text style={styles.profileName}>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileTitle: {
    fontSize: 12,
    color: "#796d6d",
  },
  profileBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  profileName: {
    fontSize: 12,
    color: "#000000",
  },
});
