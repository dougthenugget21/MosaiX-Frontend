import { FlatList, Pressable, StyleSheet, Text } from "react-native";

type Props = {
  tags: Array<String>;
};

export default function PostTags({ tags }: Props) {
  return (
    <FlatList
      style={styles.tagList}
      data={tags}
      renderItem={({ item }) => (
        <Pressable>
          <Text style={styles.tagText}>#{item}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  tagList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagText: {
    color: "blue",
    padding: 2,
  },
});
