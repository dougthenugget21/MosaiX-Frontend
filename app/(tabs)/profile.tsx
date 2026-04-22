import Post, { postObj } from "@/assets/logic/Post";
import PostComment from "@/assets/logic/PostComment";
import { UserData } from "@/assets/logic/User";
import CommentViewer from "@/components/CommentViewer";
import MyProfilePostContent from "@/components/MyProfilePostContent";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { useAuth } from "../(context)/Authcontext";

import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type ProfileData = {
  user_name: string;
  bio: string;
  profilephoto_url: string | null;
  is_private?: boolean;
};

export default function Profile() {
  const { profileId, logout, token } = useAuth();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [myposts, setMyPosts] = useState<Post[]>([]);
  const [savedposts, setSavedPosts] = useState<Post[]>([]);
  const [commentList, setCommentList] = useState<PostComment[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [editedUsername, setEditedUsername] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [isPrivate, setIsPrivate] = useState(false);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [openPostId, setOpenPostId] = useState<number>(-1);

  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadProfileData();
    }, [profileId, token]),
  );

  const loadProfileData = async () => {
    try {
      if (!profileId || !token) return;

      const res = await fetch(
        `https://mosaix-backend.onrender.com/userProfile/profileid/${profileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok)
        throw new Error(
          "Failed to load profile details. Please try again later!",
        );

      const data: ProfileData = await res.json();

      setProfile(data);
      setEditedUsername(data.user_name || "");
      setDescription(data.bio || "");
      setIsPrivate(data.is_private || false);
      setAvatar(data.profilephoto_url || null);

      //  MY POSTS
      const resMyPosts = await fetch(
        `https://mosaix-backend.onrender.com/posts/profile/${profileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!resMyPosts.ok) {
        throw new Error("Failed to load posts. Please try again later!");
      }

      const datamypost = await resMyPosts.json();
      setMyPosts(parsePostData(datamypost));

      //  SAVED POSTS
      const resSavedPosts = await fetch(
        `https://mosaix-backend.onrender.com/posts/saved/${profileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!resSavedPosts.ok) {
        throw new Error("Failed to load posts. Please try again later!");
      }

      const datasavedpost = await resSavedPosts.json();
      setSavedPosts(parsePostData(datasavedpost));
    } catch {
      Alert.alert("Error", "Could not load profile");
    } finally {
      setLoading(false);
    }
  };

  function parsePostData(data: Post[]) {
    const formattedData = data.map((ele) => {
      const profile: UserData = {
        name: ele.user_name,
        id: ele.profile_id,
        title: ele.reputation_badge,
        image: ele.profilephoto_url,
      };
      const obj: postObj = {
        id: ele.id,
        image: ele.photo_url,
        longitude: ele.longitude,
        latitude: ele.latitude,
        title: ele.post_title,
        description: ele.post_desc,
        tags: ele.tags,
        saved: ele.is_saved,
        liked: ele.is_liked,
        user: profile,
      };
      return new Post(obj);
    });
    return formattedData;
  }

  // Pick Image
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      setAvatar(file.uri);
      try {
        const imageURL = await uploadFile(file);
        console.log(imageURL);
        if (imageURL) {
          setSavedImageUrl(imageURL);
          await saveProfile();
        }
      } catch (e) {
        console.error("Upload failed:", e);
      }
    }
  };

  // Upload profile image
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

    //console.log(response);
    const image = await response.json();
    return image.url;
  };

  // Save Profile
  const saveProfile = async () => {
    try {
      setSaving(true);
      const payload = {
        user_name: editedUsername,
        bio: description,
        is_private: isPrivate,
        profilephoto_url: savedImageUrl,
      };
      //alert(payload.profilephoto_url);

      const res = await fetch(
        `https://mosaix-backend.onrender.com/userProfile/${profileId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) throw new Error();

      //update UI
      setProfile((prev) => ({
        ...prev,
        user_name: editedUsername,
        bio: description,
        profilephoto_url: savedImageUrl,
        is_private: isPrivate,
      }));

      setEditMode(false);

      Alert.alert("Success", "Profile updated");
    } catch {
      Alert.alert("Error", "Could not save profile");
    } finally {
      setSaving(false);
    }
  };

  //Comments
  const openComments = async (post: Post) => {
    setIsModalVisible(true);
    setOpenPostId(post.id);
    const comments = await post.fetchComments();
    setCommentList(comments);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoutSection}>
        <Pressable onPress={logout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={theme.muted} />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
      <Pressable onPress={pickImage} style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person" size={50} color={theme.muted} />
          )}
        </View>
      </Pressable>

      <View style={styles.badgeToggleRow}>
        {profile?.reputation_badge && (
          <View style={styles.badgeContainer}>
            <Ionicons name="trophy" size={16} color={theme.accent} />
            <Text style={styles.badgeText}>{profile.reputation_badge}</Text>
          </View>
        )}
        <View style={styles.privateGroup}>
          <Text style={styles.label}>Private Profile</Text>
          <Pressable
            onPress={() => {
              setIsPrivate(!isPrivate);
              setEditMode(true);
            }}
            style={[styles.toggle, isPrivate && styles.toggleActive]}
          />
        </View>
      </View>
      {editMode && (
        <Pressable onPress={saveProfile} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>
            {saving ? "Saving..." : "Save"}
          </Text>
        </Pressable>
      )}
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Username</Text>
          <Pressable onPress={() => setEditMode(true)}>
            <Ionicons name="pencil" size={18} color={theme.muted} />
          </Pressable>
        </View>

        {editMode ? (
          <TextInput
            value={editedUsername}
            onChangeText={setEditedUsername}
            style={styles.input}
          />
        ) : (
          <Text style={styles.value}>{editedUsername}</Text>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Bio</Text>
          <Pressable onPress={() => setEditMode(true)}>
            <Ionicons name="pencil" size={18} color={theme.muted} />
          </Pressable>
        </View>

        {editMode ? (
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline
            style={[styles.input, { height: 80 }]}
          />
        ) : (
          <Text style={styles.value}>{description || "No bio added"}</Text>
        )}
      </View>
      {/* TAB BUTTONS */}
      <View style={styles.tabBar}>
        <Pressable onPress={() => setActiveTab("posts")} style={styles.tabItem}>
          <Text
            style={[
              styles.tabText,
              activeTab === "posts" && styles.tabActiveText,
            ]}
          >
            My Posts
          </Text>
        </Pressable>

        <Pressable onPress={() => setActiveTab("saved")} style={styles.tabItem}>
          <Text
            style={[
              styles.tabText,
              activeTab === "saved" && styles.tabActiveText,
            ]}
          >
            Saved Posts
          </Text>
        </Pressable>
      </View>

      {/* TAB CONTENT */}
      <View style={{ flex: 1, marginTop: 10 }}>
        {activeTab === "posts" ? (
          <>
            <FlatList
              data={myposts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <MyProfilePostContent
                  post={item}
                  openCommentsAction={openComments}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
            />

            <CommentViewer
              isVisible={isModalVisible}
              onClose={onModalClose}
              commentList={commentList}
              postId={openPostId}
            />
          </>
        ) : (
          <>
            <FlatList
              data={savedposts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <MyProfilePostContent
                  post={item}
                  openCommentsAction={openComments}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
            />

            <CommentViewer
              isVisible={isModalVisible}
              onClose={onModalClose}
              commentList={commentList}
            />
          </>
        )}
      </View>
    </View>
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
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.text,
  },

  avatarWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: theme.cardSoft,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 55,
  },

  section: {
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    color: theme.muted,
    marginBottom: 6,
  },

  value: {
    fontSize: 17,
    color: theme.text,
    fontWeight: "500",
  },

  input: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: theme.text,
    backgroundColor: theme.cardSoft,
  },

  saveButton: {
    backgroundColor: theme.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  saveButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },

  toggle: {
    width: 44,
    height: 24,
    borderRadius: 20,
    backgroundColor: theme.cardSoft,
  },

  toggleActive: {
    backgroundColor: theme.primary,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: theme.muted,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 4,
    marginTop: 10,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },

  tabText: {
    fontSize: 14,
    color: theme.muted,
    fontWeight: "600",
  },

  tabActiveText: {
    color: theme.primary,
    fontWeight: "700",
  },

  postCard: {
    backgroundColor: theme.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.border,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: theme.cardSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: theme.border,
  },
  badgeContainer: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: theme.cardSoft,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: theme.border,
    gap: 6,
  },

  badgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.primary,
  },
  logoutSection: {
    marginTop: 0,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    alignItems: "flex-end",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  logoutText: {
    color: theme.muted,
    fontSize: 15,
    fontWeight: "600",
  },
  badgeToggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  privateGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
