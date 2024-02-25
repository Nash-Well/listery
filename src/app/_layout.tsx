import { useEffect } from 'react';
import { useFonts } from 'expo-font';

import { 
  Slot,
  useRouter
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { 
  useAuth,
  ClerkProvider 
} from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

SplashScreen.preventAutoHideAsync();

const ClerkPublishKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  const [ loaded, error ] = useFonts({
    'open-sans-light':    require('../../assets/fonts/OpenSans-Light.ttf'),
    'open-sans-regular':  require('../../assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-semibold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
    'open-sans-bold':     require('../../assets/fonts/OpenSans-Bold.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [ error ]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider 
      tokenCache={ tokenCache }
      publishableKey={ ClerkPublishKey! }>
        <InitialLayout />
    </ClerkProvider>
  )
}

const InitialLayout = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    router.replace(
      isSignedIn ? 
        '/(auth)/register' : 
        '/onboard'
    );

    SplashScreen.hideAsync();
  }, [ isSignedIn ]);

  return <Slot />;
};
