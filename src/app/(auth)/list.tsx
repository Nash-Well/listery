import { useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useQueryClient } from 'react-query';

import { 
   View, 
   Text,
   FlatList,
   TouchableOpacity,
   ActivityIndicator,
} from 'react-native';
import WishItem from "@/components/shared/auth/WishItem";

import styles from '@/styles/box_shadow';
import { COLORS } from '@/constants';

import { 
   Entypo,
   AntDesign, 
} from "@expo/vector-icons";

import { Wish } from '@/types';

type SearchParams = {
   id: string;
};

export default function List() {
   const navigation = useNavigation();
   const { id }: SearchParams = useLocalSearchParams();
   const wishes = useQueryClient().getQueryData<Wish[]>('wishes')?.filter(wish => wish.list_id === +id);
   
   useEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <TouchableOpacity className='mr-2'>
               <Entypo 
                  name="dots-three-horizontal" 
                  size={ 24 } 
                  color="black" 
               />
            </TouchableOpacity>
         ),
      });
   }, [ navigation ]);

   return (
      <View className='flex-1 bg-gray-100'>
         {
            !wishes ? (
               <View className='flex-1 items-center justify-center'>
                  <ActivityIndicator
                     size='large'
                     color={ COLORS.pumpkin }
                  />
               </View>
            ) : wishes?.length > 0 ? (
               <View className='mt-5'>
                  <FlatList
                     data={ wishes }
                     renderItem={({ item }) => <WishItem item={ item } />}

                     bounces={ false }
                     showsVerticalScrollIndicator={ false }
                  />
               </View>
            ) : (
               <View className='flex-1 items-center justify-center space-y-2'>
                  <Text style={{ lineHeight: 55 }} className='text-5xl'>😢</Text>
                  
                  <Text className='text-2xl text-gray-700 text-center font-sans-b'>
                     У цьому списку ще немає жодного бажання.
                  </Text>
               </View>
            )
         }

         <TouchableOpacity
            activeOpacity={ 0.6 }
            style={ styles.boxShadow }
            className='absolute bottom-10 right-5 w-16 h-16 items-center justify-center rounded-full bg-orange-400'>
            <AntDesign 
               name="plus" 
               size={ 24 } 
               color="white" 
            />
         </TouchableOpacity>
      </View>
   )
}