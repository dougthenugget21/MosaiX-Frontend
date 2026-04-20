import PostComment from "@/assets/logic/PostComment";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Comment from "./Comment";
type Props = {
  isVisible: boolean;
  onClose: () => void;
  commentList: PostComment[];
};

export default function CommentViewer({
  isVisible,
  onClose,
  commentList,
}: Props) {
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
});
