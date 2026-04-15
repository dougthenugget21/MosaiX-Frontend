import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import PostImage from "./PostImage";
import ProfileBar from "./ProfileBar";

type Props = {
  postImgSource: ImageSourcePropType;
  userImgSource: ImageSourcePropType;
  description: string;
  title: string;
  username: string;
};

export default function postContent({
  postImgSource,
  userImgSource,
  description,
  title,
  username,
}: Props) {
  return (
    <View style={styles.contentContainer}>
      <PostImage imgSource={postImgSource} />
      <View style={styles.textContainer}>
        <ProfileBar
          imgSource={userImgSource}
          title={title}
          username={username}
        />
        <Text>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    margin: 6,
    maxWidth: 800,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  descriptionText: {},
});
