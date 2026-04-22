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
  profileTitle: {
    fontSize: 12,
    color: "#796d6d",
  },
  profileBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  profileName: {
    fontSize: 12,
    color: "#000000",
  },
});
