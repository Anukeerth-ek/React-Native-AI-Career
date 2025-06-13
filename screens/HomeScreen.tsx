import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from "react-native";

const HomeScreen = () => {
     return (
          <SafeAreaView>
               <View>
                    <Text>CareerAI</Text>
                    <Text>Your AI-powered career companion</Text>
               </View>

               <View>
                    <Text>Accelerate Your Career</Text>
                    <Text>Get personalized AI guidance to land your dream job</Text>
               </View>
          </SafeAreaView>
     );
};

export default HomeScreen;
