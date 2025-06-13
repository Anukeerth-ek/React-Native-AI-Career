import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet, styled } from "nativewind";
import { View as RNView } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import HomepageCard from "./components/HomepageCards";
import BottomTabs from "./navigations/BottomTabs";
import { NavigationContainer } from "@react-navigation/native";

// 🪄 Wrap RN View using nativewind
const View = styled(RNView);

// ✅ NativeWind setup
NativeWindStyleSheet.setOutput({
     default: "native",
});

export default function App() {
     return (
          <NavigationContainer>
               <View className="flex-1 bg-white">
                    <StatusBar style="auto" />
                    {/* <HomeScreen />
                    <HomepageCard /> */}
                    <BottomTabs />
               </View>
          </NavigationContainer>
     );
}
