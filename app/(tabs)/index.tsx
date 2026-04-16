
import PostContent from "@/components/PostContent";

import { FlatList, View } from "react-native";
const PlaceholderImage = require("@/assets/images/flowers.jpg");
const PlaceholderImageTwo = require("@/assets/images/bad-house.jpg");
const PlaceholderIcon = require("@/assets/images/icon.png");

export default function Index() {
  const examplePostOne = {
    postImgSource: PlaceholderImage,
    userImgSource: PlaceholderIcon,
    userTitle: "The Food Finder",
    username: "olilliterate",
    postTitle: "Flowers",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    liked: false,
    saved: false,
  };

  const examplePostTwo = {
    postImgSource: PlaceholderImageTwo,
    userImgSource: PlaceholderIcon,
    userTitle: "The Food Finder",
    username: "olilliterate",
    postTitle: "Scary House",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    liked: false,
    saved: false,
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={[examplePostOne, examplePostTwo]}
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
          />
        )}
      />
    </View>
  );
}
