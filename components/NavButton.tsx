import Post from "@/assets/logic/Post";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Linking, Pressable, StyleSheet } from "react-native";

type Props = {
  post: Post;
};

export default function NavButton({ post }: Props) {
  const handlePress = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const url = `geo:${post.latitude},${post.longitude}?q=${post.latitude},${post.longitude}(${post.title})`;
    const supported = await Linking.canOpenURL(url);
    console.log(post);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <Pressable style={styles.iconButton} onPress={handlePress}>
      <FontAwesome name="location-arrow" size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "black",
    marginTop: 12,
  },
});
