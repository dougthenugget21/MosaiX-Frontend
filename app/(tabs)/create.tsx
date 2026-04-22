import ImageViewer from "@/components/ImageUpload";
import LocationButton from "@/components/LocationButton";
import SubmitButton from "@/components/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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

    console.log(response);
    const image = await response.json();

    return image.url;
  };

  const submit = async () => {
    try {
      if (!titleText) {
        throw new Error("You must add a title to create a post");
      }
      if (!tagText) {
        throw new Error("You must add at least one tag to create a post");
      }
      if (!descText) {
        throw new Error("You must add a description to create a post");
      }

      if (imageFile !== undefined) {
        const imageUrl = await uploadFile(imageFile);
        const loc = await getCurrentLocation();
        const profileID = await AsyncStorage.getItem("profile_id");
        const postBody = JSON.stringify({
          profile_id: profileID,
          photo_url: imageUrl,
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
        console.log(response);
        resetPage();
      } else {
        throw new Error("You must upload a photo to create a post");
      }
    } catch (err) {
      alert(err);
    }
  };

  const resetPage = () => {
    setTitleText("");
    setDescText("");
    setTagText("");
    setSelectedImage(undefined);
    setImageFile(undefined);
    alert("Post successfully created!");
  };

  const testing = () => {
    console.log("testing testing 123");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.bg }}
        edges={["top"]}
      >
        <ScrollView
          scrollEnabled={true}
          contentContainerStyle={styles.scrollView}
        >
          <View style={styles.container}>
            <Text role="heading" style={styles.header}>
              Create your own Post
            </Text>
            <View style={styles.inputOuter}>
              <Text style={styles.inputLable}>Give your post a title</Text>
              <TextInput
                value={titleText}
                style={styles.innerBox}
                maxLength={255}
                onChangeText={(newText) => setTitleText(newText)}
                placeholder={`Title...`}
                placeholderTextColor={"#6c6c6cff"}
              />
            </View>
            <View style={styles.inputOuter}>
              <Text style={styles.inputLable}>Select an image</Text>
              <ImageViewer
                imgSource={placeholderImg}
                selectedImage={selectImage}
                onPress={pickImageAsync}
              />
            </View>
            <View style={styles.inputOuter}>
              <Text style={styles.inputLable}>Choose your Location</Text>
              <LocationButton
                onPressCurrent={testing}
                onPressSelect={testing}
              />
            </View>
            <View style={styles.inputOuter}>
              <Text style={styles.inputLable}>Tag your post</Text>
              <TextInput
                value={tagText}
                style={styles.innerBox}
                maxLength={255}
                onChangeText={(newText) => setTagText(newText)}
                placeholder={`Insert tags, e.g: History,Nature,Food...`}
                placeholderTextColor={"#6c6c6cff"}
              />
            </View>
            <View style={styles.inputOuter}>
              <Text style={styles.inputLable}>
                Give your post a description
              </Text>
              <TextInput
                value={descText}
                multiline
                numberOfLines={5}
                maxLength={255}
                style={[styles.descBox, styles.innerBox]}
                onChangeText={(newText) => setDescText(newText)}
                placeholder={`Description...`}
                placeholderTextColor={"#6c6c6cff"}
              />
            </View>
            <SubmitButton onPress={submit} text="Submit" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const theme = {
  bg: "#E6F2EA",
  card: "#FFFFFF",
  cardSoft: "#D8E9DD",
  primary: "#166534",
  accent: "#F97316",
  text: "#0F1F14",
  muted: "#4B5B52",
  border: "rgba(22, 101, 52, 0.15)",
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    maxWidth: 600,
  },
  header: {
    fontSize: 25,
    fontWeight: 500,
    color: theme.primary,
    margin: 10,
    marginTop: 20,
  },
  inputLable: {
    width: "96%",
    left: 5,
    marginTop: 10,
    color: theme.text,
    fontWeight: 500,
  },
  inputOuter: {
    backgroundColor: theme.card,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginTop: 10,
  },
  innerBox: {
    borderWidth: 1,
    borderColor: "#c5c5c5ff",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    paddingLeft: 20,
    margin: 5,
    width: "96%",
  },
  descBox: {
    minHeight: 100,
  },
});
