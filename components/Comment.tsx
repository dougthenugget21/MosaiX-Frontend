import PostComment from "@/assets/logic/PostComment";
import { Text, View } from "react-native";
import ProfileBar from "./ProfileBar";

type Props = {
  comment: PostComment;
};

export default function Comment({ comment }: Props) {
  return (
    <View>
      <ProfileBar profile={comment.user} />
      <Text>{comment.body}</Text>
    </View>
  );
}
