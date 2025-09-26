import { View, Text, Modal, TouchableOpacity, ActivityIndicator, ScrollView, TextInput } from 'react-native'
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
}

const EditProfileModal = ({ isVisible, onClose, formData, saveProfile, updateFormField, isUpdating }
    : EditProfileModalProps) => {

  const handleSave = () => {
    saveProfile();
    onClose();
  };

  return (
    <Modal 
        visible={isVisible} 
        animationType="slide" 
        presentationStyle="pageSheet"
        onRequestClose={onClose}   //handles android back button
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
        <View className="space-y-4">
            <View>
                <Text className="text-gray-500 text-sm mb-2">First Name</Text>
                <TextInput 
                    className="border border-gray-200 rounded-lg p-3 text-base"
                    value={formData.firstName}
                    onChangeText={(text) => updateFormField("firstName", text)}
                    placeholder="Your first name"
                />
            </View>

            <View>
                <Text className="text-gray-500 text-sm mb-2">Last Name</Text>
                <TextInput
                    className="border border-gray-200 rounded-lg px-3 py-3 text-base"
                    value={formData.lastName}
                    onChangeText={(text) => updateFormField("lastName", text)}
                    placeholder="Your last name"
                />
            </View>

            <View>
                <Text className="text-gray-500 text-sm mb-2">Bio</Text>
                <TextInput
                    className="border border-gray-200 rounded-lg px-3 py-3 text-base"
                    value={formData.bio}
                    onChangeText={(text) => updateFormField("bio", text)}
                    placeholder="Tell us about yourself"
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                />
            </View>

            <View>
                <Text className="text-gray-500 text-sm mb-2">Location</Text>
                <TextInput
                    className="border border-gray-200 rounded-lg px-3 py-3 text-base"
                    value={formData.location}
                    onChangeText={(text) => updateFormField("location", text)}
                    placeholder="Where are you located?"
                />
            </View>

            <View>
                <Text className="text-gray-500 text-sm mb-2">Username</Text>
                <TextInput 
                    className="border border-gray-200 rounded-lg px-3 py-3 text-base"
                    value={formData.username}
                    onChangeText={(text) => updateFormField("username", text)}
                    placeholder="Enter your username"
                />
            </View>
        </View>
      </ScrollView>
    </Modal>
  )
}

export default EditProfileModal