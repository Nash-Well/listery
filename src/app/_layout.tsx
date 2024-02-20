import { useFonts } from 'expo-font';
import { useEffect } from 'react';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import FontAwesome from '@expo/vector-icons/FontAwesome';

export {
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
      }} 
      initialRouteName='onboard'>
      <Stack.Screen 
        name="(tabs)" 
      />

      <Stack.Screen 
        name="onboard" 
      />
    </Stack>
  );
}
