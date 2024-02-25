import { useRouter } from "expo-router";

import { FC } from "react";

import {
   Text,
   View,
   Image,
   TextInput,
   Dimensions,
   TouchableOpacity,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { 
   User,
   Slide 
} from "@/types";

type Props = {
   user:             User;
   item:             Slide;
   error?:           boolean;
   handleUpload:     () => void;
   hanldeTextChange: (t: string) => void;
};

const SliderItem: FC<Props> = ({ 
   user, 
   item, 
   error,
   handleUpload, 
   hanldeTextChange 
}) => {
   const router = useRouter();
   const { width } = Dimensions.get('window');
   
   return (
      <View 
         style={{ width }}>
         {
            !item.required &&
               <TouchableOpacity className='absolute top-5 right-5'>
                  <Text className='text-xl text-gray-500 font-sans-r'>
                     Пропустити
                  </Text>
               </TouchableOpacity>
         }
         
         <View className='flex-1 p-5 top-[8%] space-y-8'>
            <View className='space-y-2'>
               <Text 
                  style={{ lineHeight: 60 }}
                  className='text-5xl font-sans-b text-gray-700'>
                  { item.title }
               </Text>

               <Text className='text-xl text-gray-400 font-sans-r'>
                  { item.description }
               </Text>
            </View>

            {
               item.icon !== "camera" ? (
                  <View className='space-y-2'>
                     <View className='flex-row items-center space-x-4 pb-1 border-b border-gray-400'>
                        <AntDesign
                           size={ 28 }
                           color="black"
                           name={ item.icon as any }
                        />

                        <TextInput
                           autoComplete='name'
                           autoCapitalize='none'
                           autoCorrect={ false }
                           placeholder={ item.placeholder }
                           onChangeText={ hanldeTextChange }
                           value={ (user as any)[`${ item.field_name }`] }
                           className=' flex-1 text-2xl text-gray-600 font-sans-sm'
                           onPressIn={ item.field_name === 'country' ? () => router.navigate("/countries") : () => {} }
                        />
                     </View>
                     {
                        (error && item.error_title) &&
                           <Text className=' text-lg text-red-500 font-sans-sm'>
                              { item.error_title }
                           </Text>
                     }
                  </View>
               ) : (
                  <View className='flex-1 items-center'>
                     <TouchableOpacity 
                        onPress={ handleUpload }
                        className=' top-[15%] w-56 h-56 border-2 border-dashed border-orange-400 rounded-full items-center justify-center'>
                        {
                           user.profile_img_uri ?
                              <Image
                                 resizeMode='cover'
                                 className='w-52 h-52 rounded-full'
                                 source={{ uri: user.profile_img_uri }}
                              /> :
                           <AntDesign
                              size={ 48 }
                              name='camera'
                              color='orange'
                           />
                        }
                     </TouchableOpacity>
                  </View>
               )
            }
         </View>
      </View>
   )
}

export default SliderItem;