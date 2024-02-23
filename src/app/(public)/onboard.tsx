import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

import { 
    View, 
    Text, 
    Image,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '@/styles/box_shadow';

import { AntDesign } from '@expo/vector-icons';

import { IMAGES } from '@/constants';

import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function onboard() {
    const router = useRouter();

    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const handleLogin = useCallback(async () => {
        try {
            const { 
                signIn, 
                signUp,
                setActive, 
                createdSessionId 
            } = await startOAuthFlow();
        
            if (createdSessionId) {
                setActive?.({ session: createdSessionId });
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    return (
        <View className='flex-1 relative'>
            <Image
                resizeMode='cover'
                className='w-full h-full absolute'
                source={ IMAGES.OnboardBackground }
            />
            
            <SafeAreaView className='flex-1 absolute left-5 right-5 bottom-5'>
                <View className='gap-6'>
                    <View className='gap-y-4'>
                        <Text className='font-sans-sm text-5xl text-white'>
                            Ласкаво {'\n'}
                            просимо {'\n'}
                            до Listery
                        </Text>

                        <Text className='text-white text-xl font-sans-sm'>
                            Місце, де зберігаються {'\n'}
                            ваші бажання
                        </Text>
                    </View>

                    <TouchableOpacity 
                        activeOpacity={ 0.8 }
                        onPress={ handleLogin }
                        style={ styles.boxShadow }
                        className='p-4 flex-row space-x-3 rounded-xl items-center justify-center bg-white'>
                        <AntDesign 
                            name="google" 
                            size={ 28 } 
                            color="black" 
                        />
                        
                        <Text className='font-sans-sm text-2xl text-black'>
                            Увійти з Google
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={ 1 }
                        onPress={ () => router.push('/privacy') }>
                        <View className='items-center'>
                            <Text className='font-sans-r text-xl text-white'>
                                Політика конфіденційності
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}
