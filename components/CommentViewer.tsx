import addComment from "@/assets/logic/addComment";
import PostComment from "@/assets/logic/PostComment";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "@/app/(context)/Authcontext";

import Comment from "./Comment";
type Props = {
  isVisible: boolean;
  onClose: () => void;
  postId: number;
  commentList: PostComment[];
};

export default function CommentViewer({
  isVisible,
  onClose,
  commentList,
  postId,
}: Props) {
  let { profileId } = useAuth();
  const [commentMessage, setCommentMessage] = useState("");
  const uploadComment = () => {
    addComment(profileId, postId, commentMessage);
    setCommentMessage("");
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Comments:</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="black" size={22} />
            </Pressable>
          </View>
          <FlatList
            data={commentList}
            renderItem={({ item }) => <Comment comment={item} />}
          />
          <View style={styles.commentContainer}>
            <TextInput
              style={styles.commentInput}
              multiline
              numberOfLines={2}
              maxLength={240}
              onChangeText={setCommentMessage}
              value={commentMessage}
              placeholder="How Was This Place?"
              placeholderTextColor={"#6c6c6cff"}
            />
            <Pressable onPress={uploadComment} style={styles.commentButton}>
              <FontAwesome name="send" size={24} color={theme.primary} />
            </Pressable>
          </View>
        </View>
      </Modal>
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
  cardBorder: "#7aa98eff",
  border: "rgba(22, 101, 52, 0.15)",
};

const styles = StyleSheet.create({
  modalContent: {
    height: "50%",
    width: "100%",
    backgroundColor: theme.bg,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
    borderWidth: 3,
    borderColor: theme.muted,
  },
  titleContainer: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: theme.muted,
    backgroundColor: theme.bg,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: theme.text,
    fontSize: 16,
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    borderTopWidth: 1,
    borderColor: theme.muted,
  },
  commentInput: {
    flex: 1,
    backgroundColor: theme.card,
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: theme.muted,
  },
  commentButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.cardSoft,
    height: "100%",
    aspectRatio: 1 / 1,
    borderRadius: 14,
    marginLeft: 4,
  },
});
