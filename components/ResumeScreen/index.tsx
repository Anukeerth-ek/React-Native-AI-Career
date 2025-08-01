import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity as RNTouchableOpacity,
  ActivityIndicator as RNActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const TouchableOpacity = styled(RNTouchableOpacity);
const ActivityIndicator = styled(RNActivityIndicator);
const ScrollContainer = styled(ScrollView);

const ResumeReviewScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handlePickDocument = async () => {
    try {
      setIsLoading(true);
      setFeedback(null); // Clear previous feedback

      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) {
        setIsLoading(false);
        return;
      }

      const file = result.assets[0];
      setResumeName(file.name);

      const fileUri = file.uri;

      const formData = new FormData();
      formData.append("resume", {
        uri: fileUri,
        type: "application/pdf",
        name: file.name,
      } as any);

const response = await fetch("http://10.0.2.2:3000/review", {
  method: "POST",
  body: formData,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

if (!response.ok) {
  const text = await response.text();
  console.error("Backend Error:", text);
  Alert.alert("Error", "Server error while reviewing resume.");
  return;
}

const json = await response.json();


      if (json.feedback) {
        setFeedback(json.feedback);
      } else {
        Alert.alert("Error", "No feedback received.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollContainer className="flex-1 bg-white px-4 py-6">
      <StyledView className="justify-center items-center">
        <TouchableOpacity
          onPress={handlePickDocument}
          className="bg-violet-600 px-6 py-4 rounded-2xl flex-row items-center"
        >
          <Icon name="upload-file" size={24} color="#fff" />
          <StyledText className="text-white text-base font-semibold ml-2">
            {resumeName ? "Change Resume" : "Upload Resume"}
          </StyledText>
        </TouchableOpacity>

        {resumeName && !isLoading && (
          <StyledText className="mt-4 text-gray-800 text-sm italic">
            Selected: {resumeName}
          </StyledText>
        )}

        {isLoading && (
          <StyledView className="mt-6 flex-row items-center">
            <ActivityIndicator size="large" color="#6C63FF" />
            <StyledText className="ml-2 text-violet-600 font-semibold">
              Analyzing your resume...
            </StyledText>
          </StyledView>
        )}
      </StyledView>

      {feedback && (
        <StyledView className="mt-8 p-4 bg-gray-100 rounded-2xl">
          <StyledText className="text-lg font-semibold text-gray-900 mb-2">
            AI Review Feedback:
          </StyledText>
          <StyledText className="text-sm text-gray-800 leading-relaxed">
            {feedback}
          </StyledText>
        </StyledView>
      )}
    </ScrollContainer>
  );
};

export default ResumeReviewScreen;
