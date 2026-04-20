import { UserData } from "@/assets/logic/User";
import { StyleSheet, Text, View } from "react-native";
import ProfileIcon from "./ProfileIcon";

type Props = {
  profile: UserData;
};

export default function ProfileBar({ profile }: Props) {
  return (
    <View style={styles.profileBar}>
      <ProfileIcon imgSource={profile.image} />
      <Text style={styles.profileTitle}>{profile.title} </Text>
      <Text style={styles.profileName}>{profile.name}</Text>
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
    justifyContent: "flex-start",
    backgroundColor: "#f5f0f0",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  profileName: {
    fontSize: 12,
    color: "#000000",
  },
});
