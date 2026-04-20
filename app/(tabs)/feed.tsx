import getExampleData from "@/assets/Example";
import CommentViewer from "@/components/CommentViewer";
import PostContent from "@/components/PostContent";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TextInputChangeEvent,
  View,
} from "react-native";

export default function Index() {
  const data = getExampleData();
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
        margin: 4,
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
          <PostContent post={item} openCommentsAction={openComments} />
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
    margin: 8,
    marginTop: 10,
  },
});
