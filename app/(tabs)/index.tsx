import getPostsByLocation from "@/assets/logic/getPostsByLocation";
//import getExampleData from "@/assets/logic/Example";
import Post from "@/assets/logic/Post";
import PostComment from "@/assets/logic/PostComment";
import CommentViewer from "@/components/CommentViewer";
import PostContent from "@/components/PostContent";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TextInputChangeEvent
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../(context)/Authcontext";

export default function Index() {
  // Creating states to be tracked
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Post[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<PostComment[]>([]);
  const [openPostId, setOpenPostId] = useState<number>(-1);
  const { profileId } = useAuth();
  const logo = require("../../assets/images/logo.png");
  useEffect(() => {
    const fetchData = async () => {
      const temp = await getPostsByLocation(profileId);
      setData(temp);
    };
    fetchData();
  }, [profileId]);

  // handlers for states
  const handleSearch = async (e: TextInputChangeEvent) => {
    const term = e.nativeEvent.text;
    setSearch(term);
    if (term === "") {
      setData(await getPostsByLocation(profileId));
    } else {
      const filteredArray = data.filter((item) => {
        const results = item.tags.filter((tag) => tag.includes(term));
        if (results.length > 0) {
          return true;
        } else {
          return false;
        }
      });
      setData(filteredArray);
    }
  };

  const openComments = async (post: Post) => {
    setIsModalVisible(true);
    setOpenPostId(post.id);
    const comments = await post.fetchComments();
    setCommentList(comments);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.bg,
        }}
      >
        {/* Filter Bar*/}
<View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#7A869A" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search tags..."
            placeholderTextColor="#7A869A"
            value={search}
            onChange={handleSearch}
          />
        </View>
      </View>
        <FlatList
          style={styles.postList}
          data={data}
          renderItem={({ item }) => (
            <PostContent post={item} openCommentsAction={openComments} />
          )}
        />
        <CommentViewer
          isVisible={isModalVisible}
          onClose={onModalClose}
          commentList={commentList}
          postId={openPostId}
        ></CommentViewer>
      </SafeAreaView>
    </SafeAreaProvider>
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
  filterBar: {
    width: "100%",
    maxWidth: 600,
    padding: 20,
    backgroundColor: theme.card,
    borderRadius: 6,
    margin: 8,
    marginTop: 10,
  },
  postList: {
    display: "flex",
    maxWidth: 600,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    paddingHorizontal: 12,
    backgroundColor: theme.bg,
    zIndex: 10,
    borderBottomWidth: 2,
    borderBottomColor: theme.muted,
    width: "100%",
  },

  logo: {
    width: "30%",
    maxWidth: 150,
    aspectRatio: 9 / 4,
  },

  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.card,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 60,
    borderWidth: 1,
    borderColor: theme.border,
  },

  searchInput: {
    flex: 1,
    marginLeft: 6,
    fontSize: 14,
    color: theme.text,
  },
});
