import { useRouter } from 'expo-router';

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

export default function onboard() {
    const router = useRouter();

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
