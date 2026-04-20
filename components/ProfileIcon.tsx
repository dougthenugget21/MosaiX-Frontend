import { Image } from "expo-image";
import { StyleSheet } from "react-native";

type Props = {
  imgSource: string;
};

export default function ProfileIcon({ imgSource }: Props) {
  return <Image source={imgSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    borderRadius: 10,
    marginRight: 4,
  },
});
