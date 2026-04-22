import Post from "@/assets/logic/Post";
import { StyleSheet, Text, View } from "react-native";
import PostActions from "./PostActions";
import PostImage from "./PostImage";
import PostTags from "./PostTags";
import ProfileBar from "./ProfileBar";

type Props = {
  post: Post;
  openCommentsAction: (post: Post) => void;
};

export default function postContent({ post, openCommentsAction }: Props) {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.titlePicContainer}>
        <Text style={styles.postTitleText}>{post.title}</Text>
        <PostImage imgSource={post.image} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textSubContainer}>
          <ProfileBar profile={post.user} />
          <Text>{post.description}</Text>
          <PostTags tags={post.tags}></PostTags>
        </View>
        <PostActions
          post={post}
          modelOn={openCommentsAction}
          navOnClick={navAction}
        />
      </View>
    </View>
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
  cardBorder: "#7aa98eff",
  border: "rgba(22, 101, 52, 0.15)",
};

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    margin: 6,
    borderWidth: 0,
    borderColor: theme.card,
    backgroundColor: theme.card,
    borderRadius: 20,
    paddingBottom: 5,
  },
  titlePicContainer: {
    backgroundColor: theme.card,
    borderRadius: 14,
    paddingTop: 3,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 5,
  },
  textSubContainer: {
    backgroundColor: theme.cardSoft,
    borderRadius: 14,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  descriptionText: {},
  postTitleText: {
    fontSize: 20,
    fontWeight: 400,
    color: theme.text,
    paddingLeft: 5,
  },
});
