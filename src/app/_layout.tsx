import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router'; 

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { TouchableOpacity} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'open-sans-light':    require('../../assets/fonts/OpenSans-Light.ttf'),
    'open-sans-regular':  require('../../assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-semibold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
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
  const router = useRouter();

  return (
    <Stack 
      initialRouteName='onboard'>
      <Stack.Screen 
        name="onboard" 
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="privacy" 
        options={{
          title: '',
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={ () => router.navigate('/onboard') }>
              <AntDesign 
                name="arrowleft" 
                size={ 24 } 
                color="black" 
              />
            </TouchableOpacity>
          )
        }}
      />
      
      <Stack.Screen 
        name="(tabs)"
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}
