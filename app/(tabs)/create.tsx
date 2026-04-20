import ImageViewer from "@/components/ImageUpload";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useState } from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const profileID = await AsyncStorage.getItem("profile_id");

export default function Create() {
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
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "mosaix");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_KEY}/upload`,
      {
        method: "post",
        body: formData,
      },
    );

    const image = await response.json();

    return image.url;
  };

  const submit = async () => {
    if (imageFile !== undefined) {
      //const imageUrl = await uploadFile(imageFile);
      const loc = await getCurrentLocation();

      const postBody = JSON.stringify({
        profile_id: profileID,
        photo_url:
          "http://res.cloudinary.com/dxlpim9vf/image/upload/v1776677983/kcltk4ieepy9lf3pjyfr.jpg",
        longitude: loc.coords.longitude,
        latitude: loc.coords.latitude,
        post_title: titleText,
        post_desc: descText,
        tags: tagText.toLowerCase(),
      });

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_CREATE_POST_URL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: postBody,
        },
      );

      const data = await response.json();
    } else {
      alert("You need to upload an image to create a post");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.topContainer}>
        <Text role="heading" style={styles.header}>
          Create your own Post
        </Text>
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
        placeholder={`Insert tags, e.g: History,Nature,Food...`}
      />
      <TextInput
        multiline
        numberOfLines={5}
        maxLength={255}
        style={styles.innerBox}
        onChangeText={(newText) => setDescText(newText)}
        placeholder={`Description...`}
      />
      <Button testID="submitButton" title={"Submit"} onPress={submit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
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
    paddingBottom: 40,
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
    minHeight: 50,
  },
});
