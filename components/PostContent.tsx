import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import PostActions from "./PostActions";
import PostImage from "./PostImage";
import PostTags from "./PostTags";
import ProfileBar from "./ProfileBar";

type Props = {
  postImgSource: ImageSourcePropType;
  userImgSource: ImageSourcePropType;
  description: string;
  userTitle: string;
  username: string;
  postTitle: string;
  liked: boolean;
  saved: boolean;
  tags: Array<String>;
  openCommentsAction: () => void;
};

export default function postContent({
  postImgSource,
  userImgSource,
  description,
  userTitle,
  username,
  postTitle,
  liked,
  saved,
  tags,
  openCommentsAction,
}: Props) {
  const navAction = () => {};
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.postTitleText}>{postTitle}</Text>
      <PostImage imgSource={postImgSource} />
      <View style={styles.textContainer}>
        <ProfileBar
          imgSource={userImgSource}
          title={userTitle}
          username={username}
        />
        <Text>{description}</Text>
        <PostTags tags={tags}></PostTags>
        <PostActions
          navOnClick={navAction}
          liked={liked}
          saved={saved}
          modelOn={openCommentsAction}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    margin: 6,
    maxWidth: 600,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
  },
  descriptionText: {},
  postTitleText: {
    fontSize: 20,
  },
});
