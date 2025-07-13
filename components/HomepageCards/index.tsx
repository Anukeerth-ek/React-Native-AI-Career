import React from "react";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { View as RNView, Text as RNText, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
const SafeArea = styled(RNSafeAreaView);
const View = styled(RNView);
const Text = styled(RNText);
export type BottomTabParamList = {
     home: undefined;
     resume: undefined;
     careers: undefined;
     Profile: undefined;
};

const HomepageCard = () => {
     const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
     const homeCardMockData: {
          title: string;
          description: string;
          icon: string;
          route: keyof BottomTabParamList;
     }[] = [
          {
               title: "Resume Reviewer",
               description: "Get instant AI feedback on your resume with actionable improvements",
               icon: "description",
               route: "resume",
          },
          {
               title: "Career Guidance",
               description: "Discover personalized career paths based on your skills and interests",
               icon: "description",
               route: "careers",
          },
          // {
          //      title: "Interview Prep",
          //      description: "Practice with AI-powered mock interviews tailored to your field",
          //      icon: "description",
          //      route: "jobs",
          // },
          {
               title: "Skill Analysis",
               description: "Identify skill gaps and get learning recommendations",
               icon: "description",
               route: "Profile",
          },
     ];

     return (
          <SafeArea className="px-2 gap-6 my-2">
               {homeCardMockData?.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate(item.route)}>
                         <View className="flex-row items-center bg-white p-4 rounded-3xl shadow-md" key={index}>
                              <View className="bg-violet-600 p-3 rounded-xl mr-4">
                                   <Icon name="description" size={24} color="#ffffff" />
                              </View>
                              <View className="">
                                   <Text className="text-base font-semibold text-black">{item.title}</Text>
                                   <Text className="text-sm text-gray-500 mt-1">{item.description}</Text>
                              </View>
                         </View>
                    </TouchableOpacity>
               ))}
          </SafeArea>
     );
};

export default HomepageCard;
