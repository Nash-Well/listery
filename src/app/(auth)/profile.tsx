import { useLocalUser } from '@/services/store/user';

import { 
   View, 
   Text, 
   Image,
   TouchableOpacity
} from 'react-native';

import styles from '@/styles/box_shadow';

import { AntDesign } from '@expo/vector-icons';

export default function Profile() {
   const localUser = useLocalUser(state => state.user);

   return (
      <View className='flex-1 p-5 bg-white'>
         <View className='relative items-center'>
            <View>
               <Image
                  resizeMode='contain'
                  className='w-36 h-36 rounded-full'
                  source={{ uri: localUser?.profile_img_uri }}
               />

               <View className='absolute bottom-0 right-0 p-2 rounded-full bg-orange-400'>
                  <AntDesign 
                     name="camerao" 
                     size={ 24 } 
                     color="white" 
                  />
               </View>
            </View>
         </View>

         <View className='flex-1'>

         </View>

         <TouchableOpacity
            style={ styles.boxShadow } 
            className='absolute bottom-10 left-4 right-5 p-5 rounded-lg items-center justify-center bg-gray-400'>
            <Text className='text-2xl font-sans-b text-white'>
               Зберегти
            </Text>
         </TouchableOpacity>
      </View>
   )
}