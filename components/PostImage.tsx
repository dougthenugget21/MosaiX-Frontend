// Import the required files for this component
import { Image } from "expo-image";
import { ImageSourcePropType, StyleSheet, View } from "react-native";

//
type Props = {
  imgSource: ImageSourcePropType;
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
    width: "100%",
    aspectRatio: "1/1",
  },
});
