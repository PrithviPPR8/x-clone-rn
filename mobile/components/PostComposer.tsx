import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { useCreatePost } from "@/hooks/useCreatePost";
import { Feather } from "@expo/vector-icons";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const PostComposer = () => {
  const {
    content,
    setContent,
    selectedImage,
    isCreating,
    pickImageFromGallery,
    takePhoto,
    removeImage,
    createPost,
  } = useCreatePost();

  const { currentUser, isLoading } = useCurrentUser();

  return (
    <View className="border-b border-gray-100 p-4 bg-white">
      <View className="flex-row">
        <Image
          source={{ uri: currentUser?.profilePicture }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <TextInput
            className="text-gray-900 text-lg"
            placeholder="What's happening?"
            placeholderTextColor="#657786"
            multiline
            value={content}
            onChangeText={setContent}
            maxLength={280}
          />
        </View>
      </View>

      {selectedImage && (
        <View className="mt-3 ml-15">
          <Image
            source={{ uri: selectedImage }}
            className="w-full h-60 rounded-2xl"
            resizeMode="cover"
          />
          <TouchableOpacity
            className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
            onPress={removeImage}
          >
            <Feather name="x" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      <View className="flex-row items-center mt-4">
        <TouchableOpacity className="mr-4" onPress={pickImageFromGallery}>
          <Feather name="image" size={20} color="#1DA1F2" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4" onPress={takePhoto}>
          <Feather name="camera" size={20} color="#1DA1F2" />
        </TouchableOpacity>
        <View className="flex-1" />
        <TouchableOpacity
          className={`px-4 py-2 rounded-full ${
            content.trim() || selectedImage ? "bg-blue-500" : "bg-gray-300"
          }`}
          onPress={createPost}
          disabled={isCreating || !(content.trim() || selectedImage)}
        >
          {isCreating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              className={`font-bold ${
                content.trim() || selectedImage ? "text-white" : "text-gray-500"
              }`}
            >
              Post
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostComposer;