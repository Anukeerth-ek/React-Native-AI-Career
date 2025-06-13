import React from "react";
import { ScrollView } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView, View as RNView, Text as RNText } from "react-native";
import HomepageCard from "../components/HomepageCards";

const SafeAreaView = styled(RNSafeAreaView);
const View = styled(RNView);
const Text = styled(RNText);

const HomeScreen = () => {
  return (
    <SafeAreaView className="h-[300px] bg-white">
      <ScrollView >
        <View className="items-center justify-center bg-purple-500 rounded-b-3xl py-10">
          <Text className="text-white text-3xl font-extrabold">CareerAI</Text>
          <Text className="text-white text-base  mt-1 ">Your AI-powered career companion</Text>
        </View>

        <View className="mt-8 px-4">
          <Text className="text-2xl font-bold text-black text-center">Accelerate Your Career</Text>
          <Text className="text-base text-gray-500 text-center mt-2 text-lg">
            Get personalized AI guidance to land your dream job
          </Text>
        </View>

        {/* <HomepageCard /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
