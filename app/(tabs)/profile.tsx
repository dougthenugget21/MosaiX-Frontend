import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function Profile() {
  const [title] = useState('Legendary');
  const [username] = useState('@doug');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploads] = useState<string[]>([]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Please allow access to your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.username}>{username}</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline
            style={styles.descriptionInput}
            placeholder="Write a description"
            placeholderTextColor="#8f949b"
          />
        </View>

        <Pressable onPress={pickImage} style={styles.avatarButton}>
          <View style={styles.avatar}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <Ionicons name="person" size={42} color="#8f949b" />
            )}
          </View>
        </Pressable>
      </View>

      <FlatList
        data={uploads}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={() => <View style={styles.card} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your uploads will appear here.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#547AA5',
    padding: 16,
  },
  profileBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#DCE3EC',
    padding: 16,
    borderRadius: 18,
    marginTop: 20,
    marginBottom: 20,
  },
  textBlock: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    color: '#1B1B1B',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 6,
  },
  username: {
    color: '#3D5A80',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionInput: {
  color: 'black',
  fontSize: 14,
  lineHeight: 20,
  padding: 10,
  marginTop: 8,
  minHeight: 60,
  borderWidth: 1,
  borderColor: '#3A5A80',
  borderRadius: 12,
},
  avatarButton: {
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#3a3f46',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarLabel: {
    color: '#1B1B1B',
    fontSize: 12,
    marginTop: 8,
  },
  grid: {
    paddingTop: 10,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#d9d9d9',
    borderRadius: 16,
  },
  emptyText: {
    color: 'black',
    marginTop: 20,
    textAlign: 'center',
  },
});