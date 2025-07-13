import React, { useState } from "react";
import {
     View,
     Text,
     TouchableOpacity as RNTouchableOpacity,
     ActivityIndicator as RNActivityIndicator,
     Alert,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const ResumeReviewScreen = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [resumeName, setResumeName] = useState<string | null>(null);
     const TouchableOpacity = styled(RNTouchableOpacity);
     const ActivityIndicator = styled(RNActivityIndicator);
     const handlePickDocument = async () => {
          try {
               setIsLoading(true);
               const res = await DocumentPicker.pickSingle({
                    type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText],
               });
               setResumeName(res.name);
               // Simulate feedback delay
               setTimeout(() => {
                    setIsLoading(false);
                    Alert.alert("Resume Uploaded", `You uploaded: ${res.name}`);
               }, 1500);
          } catch (err: any) {
               if (!DocumentPicker.isCancel(err)) {
                    Alert.alert("Error", "Failed to pick a document.");
               }
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
                    <StyledText className="text-white text-base font-semibold ml-2">Upload Resume</StyledText>
               </TouchableOpacity>

               {isLoading && <ActivityIndicator size="large" color="#6C63FF" className="mt-4" />}

               {resumeName && !isLoading && (
                    <StyledText className="mt-6 text-center text-black">Selected: {resumeName}</StyledText>
               )}
          </StyledView>
     );
};

export default ResumeReviewScreen;
