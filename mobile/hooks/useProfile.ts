import { useState } from "react";
import { Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../utils/api";
import { useCurrentUser } from "./useCurrentUser";
import { useImagePicker } from "./useImagePicker";

export const useProfile = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    username: "",
  });

  const { currentUser } = useCurrentUser();

  // Image picker logic
  const {
    selectedImage: selectedProfileImage,
    setSelectedImage: setSelectedProfileImage,
    pickImageFromGallery,
    takePhoto,
    removeImage,
  } = useImagePicker();

  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      const form = new FormData();

      // Append profile fields
      Object.entries(profileData).forEach(([key, value]) => {
        // Convert value to string if it's not a Blob
        if (value instanceof Blob) {
            form.append(key, value);
        } else if (value !== undefined && value !== null) {
            form.append(key, String(value));
        }
      });

      // Append image if selected
      if (selectedProfileImage) {
        // If selectedProfileImage is a string URI, you need to construct a file object
        const uriParts = selectedProfileImage.split(".");
        const fileType = uriParts[uriParts.length - 1].toLowerCase();
        const mimeTypeMap: Record<string, string> = {
            png: "image/png",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            gif: "image/gif",
            webp: "image/webp",
        };
        const mimeType = mimeTypeMap[fileType] || "application/octet-stream";

        form.append("profilePicture", {
            uri: selectedProfileImage,
            name: `profile.${fileType}`,
            type: mimeType,
        } as any);
    }

      return api.put("/users/profile", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsEditModalVisible(false); // This closes the modal
      setSelectedProfileImage(null);
      Alert.alert("Success", "Profile updated successfully!");
    },
    onError: (error: any) => {
      Alert.alert("Error", error?.response?.data?.error || "Failed to update profile.");
    },
  });

  const openEditModal = () => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        bio: currentUser.bio || "",
        location: currentUser.location || "",
        username: currentUser.username || "",
      });
      setSelectedProfileImage(null);
    }
    setIsEditModalVisible(true);
  };

  const updateFormField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    isEditModalVisible,
    formData,
    openEditModal,
    closeEditModal: () => setIsEditModalVisible(false),
    saveProfile: () => updateProfileMutation.mutate(formData),
    updateFormField,
    isUpdating: updateProfileMutation.isPending,
    refetch: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    // Image picker
    selectedProfileImage,
    pickImageFromGallery,
    takePhoto,
    removeImage,
  };
};