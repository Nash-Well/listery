import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useLocalUser } from '@/services/store/user';

import { 
  Slot,
  useRouter
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { 
  useAuth,
  useClerk,
  ClerkProvider, 
} from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

import { 
  where, 
  query, 
  getDocs, 
  collection, 
} from 'firebase/firestore';
import { FIREBASE_DB } from '@/services/firebase'; 

import { User } from '@/types';

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
  const setLocalUser = useLocalUser(state => state.setUser);

  const { user } = useClerk();
  const { isLoaded, isSignedIn } = useAuth();

  const userByEmail = async (email: string): Promise<User | null> => {
    try {
      const doc = await getDocs(
        query(
          collection(FIREBASE_DB, 'users'), where('email', '==', email)
        )
      ); 
      return (doc.docs[0].data()) as User || null;
    } catch (error) {
      return null;
    }
  }
  
  useEffect(() => {
    if (!isLoaded) return;

    const navigateTo = async () => {
      if(isSignedIn) {
        try {
          const doc = await userByEmail(user?.primaryEmailAddress?.emailAddress!);
          
          setLocalUser(doc);
          router.replace(
            doc ?
              '/(auth)/(tabs)/' : 
              '/(auth)/register'
          );

          return;
        } catch(err) {
          console.log(err);
        }
      }

      router.replace('/onboard');
    }

    navigateTo();
    SplashScreen.hideAsync();
  }, [ isSignedIn ]); 

  return <Slot />;
};
