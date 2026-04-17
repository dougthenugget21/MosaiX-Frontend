import ImageViewer from "@/components/ImageUpload";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const cloudinaryUrl = process.env.CLOUDINARY_URL;

export default function Index() {
  const [selectImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const [titleText, setTitleText] = useState("");
  const [tagText, setTagText] = useState("");
  const [descText, setDescText] = useState("");

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const placeholderImg = require("@/assets/images/add-image-default.jpg");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setImageFile(result.assets[0].file);
    } else {
      alert("You did not select any image.");
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to location must be granted to Post");
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    return location;
  };

  const uploadFile = async (imageFile: File) => {
    console.log(`Uploading ${imageFile}`);

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "mosaix");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dxlpim9vf/upload",
      {
        method: "post",
        body: formData,
      },
    );

    console.log(response);
    const image = await response.json();
    console.log(image);

    return image.url;
  };

  const submit = async () => {
    console.log(cloudinaryUrl);

    console.log(imageFile);

    const loc = await getCurrentLocation();
    console.log(`Lat: ${loc.coords.latitude}, Long: ${loc.coords.longitude}`);

    if (imageFile !== undefined) {
      const imageUrl = await uploadFile(imageFile);
      console.log(imageUrl);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View style={styles.topContainer}>
        <Text style={styles.header}>Create your own Post</Text>
        <TextInput
          style={styles.innerBox}
          maxLength={255}
          onChangeText={(newText) => setTitleText(newText)}
          placeholder={`Title...`}
        />
        <ImageViewer
          imgSource={placeholderImg}
          selectedImage={selectImage}
          onPress={pickImageAsync}
        />
      </View>
      <TextInput
        style={styles.innerBox}
        maxLength={255}
        onChangeText={(newText) => setTagText(newText)}
        placeholder={`Insert tags, e.g: History, Nature, Food...`}
      />
      <TextInput
        multiline
        numberOfLines={5}
        maxLength={255}
        style={styles.innerBox}
        onChangeText={(newText) => setDescText(newText)}
        placeholder={`Description...`}
      />
      <Button title={"Submit"} onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 500,
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#547AA5",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: width * 0.1,
    marginBottom: 15,
  },
  innerBox: {
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    margin: 5,
    width: "80%",
  },
});
