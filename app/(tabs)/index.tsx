import PostContent from "@/components/PostContent";

import { View } from "react-native";

const PlaceholderImage = require("@/assets/images/bad-house.jpg");
const PlaceholderIcon = require("@/assets/images/icon.png");

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PostContent
        postImgSource={PlaceholderImage}
        userImgSource={PlaceholderIcon}
        title="The Great and Terrible"
        username="Oliver"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
    </View>
  );
}
