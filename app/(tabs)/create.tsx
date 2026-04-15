import ImageViewer from "@/components/ImageUpload";
import InputBox from "@/components/InputBox";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const [selectImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );
  const placeholderImg = require("@/assets/images/add-image-default.jpg");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageViewer
        imgSource={placeholderImg}
        selectedImage={selectImage}
        onPress={pickImageAsync}
      />
      <InputBox theme={"title"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
