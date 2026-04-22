import { Image } from "expo-image";
import { ImageSourcePropType, Pressable, StyleSheet } from "react-native";

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
  onPress?: () => void;
  role?: string;
};

export default function ImageViewer({
  imgSource,
  selectedImage,
  onPress,
  role,
}: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return (
    <Pressable style={styles.imageContainer} onPress={onPress}>
      <Image testID="uploadImage" source={imageSource} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1 / 1,
    borderRadius: 15,
  },
  imageContainer: {
    width: "96%",
    backgroundColor: "white",
    borderRadius: 20,
    margin: 5,
  },
});
