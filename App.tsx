import { StatusBar } from 'expo-status-bar';
import { NativeWindStyleSheet, styled } from 'nativewind';
import { View as RNView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import HomepageCard from './components/HomepageCards';

// 🪄 Wrap RN View using nativewind
const View = styled(RNView);

// ✅ NativeWind setup
NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function App() {
  return (
    <View className="flex-1 bg-white">
      <HomeScreen />
      <HomepageCard />
      <StatusBar style="auto" />
    </View>
  );
}

