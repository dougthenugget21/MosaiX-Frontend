// Import the required files for this component
import { Image } from "expo-image";
import { ImageSourcePropType, StyleSheet } from "react-native";

//
type Props = {
  imgSource: ImageSourcePropType;
};

export default function PostImage({ imgSource }: Props) {
  return <Image source={imgSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 12,
    width: "auto",
    aspectRatio: "1/1",
    maxHeight: 300,
  },
});
