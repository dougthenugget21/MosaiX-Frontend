import { Image } from "expo-image";
import { ImageSourcePropType, Pressable, StyleSheet } from "react-native";

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
  onPress?: () => void;
};

export default function ImageViewer({
  imgSource,
  selectedImage,
  onPress,
}: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return (
    <Pressable style={styles.imageContainer} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1 / 1,
    borderRadius: 15,
  },
  imageContainer: {
    width: "80%",
    backgroundColor: "white",
    borderColor: "#000000ff",
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
  },
});
