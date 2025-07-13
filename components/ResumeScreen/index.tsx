import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity as RNTouchableOpacity,
  ActivityIndicator as RNActivityIndicator,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const TouchableOpacity = styled(RNTouchableOpacity);
const ActivityIndicator = styled(RNActivityIndicator);

const ResumeReviewScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeName, setResumeName] = useState<string | null>(null);

  const handlePickDocument = async () => {
    try {
      setIsLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // or 'application/pdf'
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) {
        setIsLoading(false);
        return;
      }

      const file = result.assets[0];
      console.log("file", file)
      setResumeName(file.name);

      // Simulate feedback delay
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert("Resume Uploaded", `You uploaded: ${file.name}`);
      }, 1500);
    } catch (err) {
      Alert.alert("Error", "Failed to pick a document.");
      setIsLoading(false);
    }
  };

  return (
    <StyledView className="flex-1 justify-center items-center px-4 bg-white">
      <TouchableOpacity
        onPress={handlePickDocument}
        className="bg-violet-600 px-6 py-4 rounded-2xl flex-row items-center"
      >
        <Icon name="upload-file" size={24} color="#fff" />
        <StyledText className="text-white text-base font-semibold ml-2">
          {resumeName ? 'Change Resume' : 'Upload Resume'}
        </StyledText>
      </TouchableOpacity>

      {isLoading && (
        <ActivityIndicator size="large" color="#6C63FF" className="mt-4" />
      )}

      {resumeName && !isLoading && (
        <StyledText className="mt-6 text-center text-black">
          Selected: {resumeName}
        </StyledText>
      )}
    </StyledView>
  );
};

export default ResumeReviewScreen;
