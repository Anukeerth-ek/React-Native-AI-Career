import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/MaterialIcons";

import HomeScreen from '../screens/HomeScreen';
import ResumeScreen from '../components/ResumeScreen';
import CareerGuidance from '../components/CareerScreen';
import SkillAnalysisScreen from '../components/SkillAnalysisScreen'

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'home':
              iconName = 'home';
              break;
            case 'resume':
              iconName = 'description';
              break;
            case 'careers':
              iconName = 'cases';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
          }
          return <Icon name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="resume" component={ResumeScreen} />
      <Tab.Screen name="careers" component={CareerGuidance} />
      <Tab.Screen name="Profile" component={SkillAnalysisScreen} />
    </Tab.Navigator>
  );
}
