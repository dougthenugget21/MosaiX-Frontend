import PostComment from "@/assets/logic/PostComment";
import { StyleSheet, Text, View } from "react-native";
import ProfileBar from "./ProfileBar";

type Props = {
  comment: PostComment;
};

export default function Comment({ comment }: Props) {
  return (
    <View style={styles.commemt}>
      <ProfileBar profile={comment.user} />
      <Text style={styles.text}>{comment.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 20,
    marginTop: -6,
    marginBottom: 3,
  },
  commemt: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 14,
  },
});
