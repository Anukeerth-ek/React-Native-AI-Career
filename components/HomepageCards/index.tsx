import React from "react";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { View as RNView, Text as RNText, Image } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";
const SafeArea = styled(RNSafeAreaView);
const View = styled(RNView);
const Text = styled(RNText);

const HomepageCard = () => {
     const homeCardMockData = [
          {
               title: "Resume Reviewer",
               description: "Get instant AI feedback on your resume with actionable improvements",
               icon: "description",
          },
          {
               title: "Career Guidance",
               description: "Discover personalized career paths based on your skills and interests",
               icon: "description",
          },
          {
               title: "Interview Prep",
               description: "Practice with AI-powered mock interviews tailored to your field",
               icon: "description",
          },
          {
               title: "Skill Analysis",
               description: "Identify skill gaps and get learning recommendations",
               icon: "description",
          },
     ];

     return (
          <SafeArea className="px-2 ">
               {homeCardMockData?.map((item, index) => (
                    <View className="flex-row items-center bg-white p-4 rounded-3xl shadow-md" key={index}>
                         <View className="bg-violet-600 p-3 rounded-xl mr-4">
                              <Icon name="description" size={24} color="#ffffff" />
                         </View>
                         <View className="">
                              <Text className="text-base font-semibold text-black">{item.title}</Text>
                              <Text className="text-sm text-gray-500 mt-1">
                                   {item.description}
                              </Text>
                         </View>
                    </View>
               ))}
          </SafeArea>
     );
};

export default HomepageCard;
