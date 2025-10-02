import { View, Text, Modal, TouchableOpacity, ActivityIndicator, ScrollView, TextInput, Image } from 'react-native'
import React from 'react'

interface EditProfileModalProps {
    isVisible: boolean;
    onClose: () => void;
    formData: {
        firstName: string,
        lastName: string,
        bio: string,
        location: string,
        username: string,
    };
    saveProfile: () => void;
    updateFormField: (field:string, value: string) => void;
    isUpdating: boolean;
    selectedProfileImage: string | null;
    pickImageFromGallery: () => void;
    takePhoto: () => void;
    removeImage: () => void;
    currentProfilePicture: string;
}

const EditProfileModal = ({
    isVisible, onClose, formData, saveProfile, updateFormField, isUpdating,
    selectedProfileImage, pickImageFromGallery, takePhoto, removeImage, currentProfilePicture
}: EditProfileModalProps) => {

  const handleSave = () => {
    saveProfile();
    // onClose();
  };

  return (
    <Modal 
        visible={isVisible} 
        animationType="slide" 
        presentationStyle="pageSheet"
        onRequestClose={onClose}
    >
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={onClose}>
            <Text className="text-blue-500 text-lg">Close</Text>
        </TouchableOpacity>

        <Text className="text-lg font-semibold">Edit Profile</Text>

        <TouchableOpacity
            onPress={handleSave}
            disabled={isUpdating}
            className={`${isUpdating ? "opacity-50" : ""}`}
        >
            {isUpdating ? (
                <ActivityIndicator size="small" color="#1DA1F2" />
            ) : (
                <Text className="text-blue-500 text-lg font-semibold">Save</Text>
            )}
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        {/* Profile Picture Section */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: selectedProfileImage || currentProfilePicture }}
            className="w-28 h-28 rounded-full mb-2"
          />
          <View className="flex-row space-x-4">
            <TouchableOpacity onPress={pickImageFromGallery} className="bg-blue-100 px-4 py-2 rounded-full mr-2">
              <Text className="text-blue-500 font-semibold">Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhoto} className="bg-blue-100 px-4 py-2 rounded-full mr-2">
              <Text className="text-blue-500 font-semibold">Camera</Text>
            </TouchableOpacity>
            {selectedProfileImage && (
              <TouchableOpacity onPress={removeImage} className="bg-gray-200 px-4 py-2 rounded-full">
                <Text className="text-gray-500 font-semibold">Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Profile Fields */}
        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 mb-1">First Name</Text>
            <TextInput
              className="border border-gray-200 rounded-lg p-3 text-base"
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={text => updateFormField("firstName", text)}
            />
          </View>
          <View>
            <Text className="text-gray-700 mb-1">Last Name</Text>
            <TextInput
              className="border border-gray-200 rounded-lg p-3 text-base"
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={text => updateFormField("lastName", text)}
            />
          </View>
          <View>
            <Text className="text-gray-700 mb-1">Username</Text>
            <TextInput
              className="border border-gray-200 rounded-lg p-3 text-base"
              placeholder="Username"
              value={formData.username}
              onChangeText={text => updateFormField("username", text)}
              autoCapitalize="none"
            />
          </View>
          <View>
            <Text className="text-gray-700 mb-1">Bio</Text>
            <TextInput
              className="border border-gray-200 rounded-lg p-3 text-base"
              placeholder="Bio"
              value={formData.bio}
              onChangeText={text => updateFormField("bio", text)}
              multiline
              maxLength={160}
            />
            <Text className="text-gray-400 text-xs text-right">{formData.bio.length}/160</Text>
          </View>
          <View>
            <Text className="text-gray-700 mb-1">Location</Text>
            <TextInput
              className="border border-gray-200 rounded-lg p-3 text-base"
              placeholder="Location"
              value={formData.location}
              onChangeText={text => updateFormField("location", text)}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  )
}

export default EditProfileModal