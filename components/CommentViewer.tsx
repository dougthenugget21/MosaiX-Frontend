import addComment from "@/assets/logic/addComment";
import PostComment from "@/assets/logic/PostComment";
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
  const [commentMessage, setCommentMessage] = useState("");
  const uploadComment = () => {
    addComment(1, postId, commentMessage);
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
              multiline
              numberOfLines={4}
              maxLength={240}
              onChangeText={setCommentMessage}
              value={commentMessage}
              placeholder="How Was This Place?"
            />
            <Pressable onPress={uploadComment}>
              <Text>Add Comment</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "50%",
    width: "100%",
    backgroundColor: "#ebedef",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "#d7d7d7",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#1f1d1d",
    fontSize: 16,
  },
  commentContainer: {
    display: "flex",
    justifyContent: "center",
    padding: 4,
  },
});
