// Import the required files for this component
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

//
type Props = {
  imgSource: string;
};

export default function PostImage({ imgSource }: Props) {
  return (
    <View style={styles.imageContainer}>
      <Image source={imgSource} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    objectFit: "cover",
    aspectRatio: "1/1",
    borderRadius: 14,
  },
  imageContainer: {
    width: "auto",
    margin: 5,
    aspectRatio: "1/1",
  },
});
