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
    <Pressable onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 360,
    borderRadius: 17,
  },
  imageContainer: {},
});
