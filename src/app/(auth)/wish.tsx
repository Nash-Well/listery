import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocalSearchParams, useNavigation } from 'expo-router';

import { 
   View,
   Text, 
   Image, 
   Linking,
   FlatList,
   Share,
   TouchableOpacity,
   ActivityIndicator,
} from 'react-native';

import { COLORS, IMAGES } from '@/constants';

import { Entypo } from '@expo/vector-icons';

import { getWishByID } from '@/types/wish';

type SearchParams = {
   id: string;
}

export default function WishItem() {
   const { id }: SearchParams = useLocalSearchParams();

   const handleShareWish = async () => {
      try {
         const result = await Share.share({
            message: data?.name,
            url: data?.imgs.find(img => img !== '') || ''
         });
         if (result.action === Share.sharedAction) {
            if (result.activityType) {
               // shared with activity type of result.activityType
            } else {
               // shared
            }
         } else if (result.action === Share.dismissedAction) {
           // dismissed
         }
      } catch (error) {
         console.log(error) // FIXME
      }
   }

   const navigation = useNavigation();
   useEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <TouchableOpacity
               activeOpacity={ 0.6 }
               onPress={ handleShareWish }>
               <Entypo 
                  name="dots-three-horizontal" 
                  size={ 24 } 
                  color="black" 
               />
            </TouchableOpacity>
         )
      });
   }, [ navigation ]);

   const { data, error, isLoading } = useQuery({
      queryKey: id,
      queryFn:  () => getWishByID(+id),

      keepPreviousData:     true,
      refetchOnWindowFocus: false,
   });

   return isLoading ? (
      <View className="flex-1 items-center justify-center">
         <ActivityIndicator
            size='large'
            color={ COLORS.pumpkin }
         />
      </View>
   ) : error ? (
      <View className="flex-1 items-center justify-center">
         <Text className="text-2xl text-gray-800 font-sans-b">
            Some error interrupted a work of program.
         </Text>
      </View>
   ) : (
      <View className='flex-1 bg-white'>
         <View className='mt-5'>
         {
            (data?.imgs.every(img => img === '') || !data?.imgs.length) ? (
               <View className='w-48 h-48 self-center items-center justify-center rounded-lg bg-slate-100'>
                  <Image
                     resizeMode='contain'
                     className='w-44 h-44'
                     source={ IMAGES.EmptyBag }
                  />
               </View>
            ) : (
               data.imgs.filter(img => img !== '').length == 1 ? (
                  <View className='w-48 h-48 self-center'>
                     <Image
                        resizeMode='cover'
                        className='w-full h-full rounded-lg'
                        source={{ uri: data.imgs.find(img => img !== '')  }}
                     />
                  </View>
               ) : (
                  <FlatList
                     horizontal
                     data={data?.imgs.filter(img => img !== '')}
                     renderItem={({ item }) => (
                        <Image
                           resizeMode='cover'
                           source={{ uri: item }}
                           className='ml-5 w-48 h-48 rounded-lg'
                        />
                     )}
                     showsHorizontalScrollIndicator={false}
                  />
               )
            )
         }

         </View>

         <View className='p-5 space-y-4'>
            {
               data?.link &&
                  <TouchableOpacity
                     onPress={ () => Linking.openURL(data?.link!) }
                     className='py-5 items-center rounded-md bg-orange-400'>
                        <Text className='text-lg text-white font-sans-b'>
                           Дивитись на сайті
                        </Text>
                  </TouchableOpacity>
            }

            <View className='space-y-0'>
               <Text className='text-lg text-gray-400 font-sans-r'>
                  Ім'я
               </Text>

               <View className='space-y-1'>
                  <Text className='text-2xl text-gray-700 font-sans-b'>
                     { data?.name }
                  </Text>

                  {
                     data?.price !== 0 &&
                        <Text className='text-2xl text-gray-700 font-sans-b'>
                           { data?.currency }{ data?.price }
                        </Text>
                  }
               </View>
            </View>

            <View className='space-y-3'>
               {
                  data?.description !== "" &&
                     <View>
                        <Text className='text-base text-gray-400 font-sans-r'>
                           Замітка
                        </Text>

                        <Text className='text-base text-gray-700 font-sans-l'>
                           { data?.description }
                        </Text>
                     </View>
               }

               <View>
                  <Text className='text-base text-gray-400 font-sans-r'>
                     Подія
                  </Text>

                  <Text className='text-base text-gray-700 font-sans-l'>
                     { data?.list_name }
                  </Text>
               </View>
            </View>
         </View>
      </View>
   )
}