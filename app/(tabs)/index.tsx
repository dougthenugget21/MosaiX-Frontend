import CommentViewer from "@/components/CommentViewer";
import PostContent from "@/components/PostContent";
import { useState } from "react";
import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  TextInputChangeEvent,
  View,
} from "react-native";
const PlaceholderImage = require("@/assets/images/flowers.jpg");
const PlaceholderImageTwo = require("@/assets/images/bad-house.jpg");
const PlaceholderIcon = require("@/assets/images/icon.png");

export default function Index() {
  //Dummy data setup

  type Post = {
    id: number;
    postImgSource: ImageSourcePropType;
    userImgSource: ImageSourcePropType;
    userTitle: string;
    username: string;
    postTitle: string;
    description: string;
    liked: boolean;
    saved: boolean;
    tags: Array<string>;
  };

  const examplePostOne: Post = {
    id: 1,
    postImgSource: PlaceholderImage,
    userImgSource: PlaceholderIcon,
    userTitle: "The Food Finder",
    username: "olilliterate",
    postTitle: "Flowers",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    liked: false,
    saved: false,
    tags: ["pretty", "nature", "flowers"],
  };

  const examplePostTwo: Post = {
    id: 2,
    postImgSource: PlaceholderImageTwo,
    userImgSource: PlaceholderIcon,
    userTitle: "The Food Finder",
    username: "olilliterate",
    postTitle: "Scary House",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    liked: false,
    saved: false,
    tags: ["scary", "abandoned", "seaside", "house"],
  };
  const data = [examplePostOne, examplePostTwo];

  // Creating states to be tracked
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // handlers for states
  const handleSearch = (e: TextInputChangeEvent) => {
    const term = e.nativeEvent.text;
    setSearch(term);
    if (term === "") {
      setFilteredData(data);
    } else {
      const filteredArray = data.filter((item) => {
        const results = item.tags.filter((tag) => tag.includes(term));
        if (results.length > 0) {
          return true;
        } else {
          return false;
        }
      });
      setFilteredData(filteredArray);
    }
  };

  const openComments = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Filter Bar*/}
      <TextInput
        style={styles.filterBar}
        placeholder="Filter by tags here..."
        value={search}
        onChange={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <PostContent
            postImgSource={item.postImgSource}
            userImgSource={item.userImgSource}
            username={item.username}
            userTitle={item.userTitle}
            postTitle={item.postTitle}
            description={item.description}
            liked={item.liked}
            saved={item.saved}
            tags={item.tags}
            openCommentsAction={openComments}
          />
        )}
      />
      <CommentViewer
        isVisible={isModalVisible}
        onClose={onModalClose}
      ></CommentViewer>
    </View>
  );
}

const styles = StyleSheet.create({
  filterBar: {
    width: "100%",
    maxWidth: 600,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 6,
    margin: 6,
    marginTop: 8,
  },
});
