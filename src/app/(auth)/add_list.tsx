import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQueryClient } from 'react-query';
import { useLocalUser } from '@/services/store/user';

import { 
   View, 
   Text,
   Switch,
   TextInput,
   TouchableOpacity,
} from 'react-native';

import { DateModal, EmojiModal } from '@/components';

import { COLORS } from '@/constants';

import { 
   Feather,
   AntDesign,
   MaterialIcons
} from '@expo/vector-icons';

import { List } from '@/types';

import { FIREBASE_DB } from '@/services/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function AddList() {
   const router = useRouter();
   const client = useQueryClient();

   // @ts-ignore
   const params: List = useLocalSearchParams(); // FIXME
   
   const [ disabled, setDisabled ] = useState(true);
   const localUser = useLocalUser(state => state.user);

   const [ emojiModal, setEmojiModal ] = useState(false);
   const handleModal = () => setEmojiModal(oldModal => !oldModal);

   const [ dateModal, setDateModal ] = useState(false);
   const handleDateModal = () => setDateModal(oldModal => !oldModal);

   const [ list, setList ] = useState<List>({
      id:      0,
      emoji:   params?.emoji   || '⭐',
      title:   params?.title   ||  '',
      date:    params?.date    || '',
      private: params?.private || false,
      email:   params?.email   || ''
   });

   const handleTextChange = (text: string) => {
      setDisabled(text.length < 3);
      updatedList("title", text);
   }

   const updatedList = <T extends string | boolean>(key: string, value: T) => {
      setList(oldList => ({ 
         ...oldList, 
         [key]: value 
      }));
   };

   const handleEmojiChange = (emoji: string) => {
      handleModal();
      updatedList("emoji", emoji);
   }

   const handleDateChange = (date: string) => {
      handleDateModal(); 
      updatedList("date", date);
   }

   const handleCreateList = async () => {
      try {
         const updatedList: List = {
            ...list,
            email:   localUser?.email!,
            id:      Math.floor(Math.random() * 10000000) + 1
         };

         await addDoc(collection(FIREBASE_DB, "list"), updatedList);
         client.setQueryData("lists", (oldLists: List[] | undefined) => { return [...oldLists!, updatedList ] });

         router.navigate('/(auth)/(tabs)/');
      } catch(err) {
         throw err; // FIXME
      }
   }

   return (
      <View className='flex-1 p-5 bg-white'>
         <View className='flex-1 space-y-5'>
            <View className='flex-row items-center space-x-4'>
               <AntDesign 
                  name="tago" 
                  size={ 32 } 
                  color={ COLORS.panton } 
               />

               <TouchableOpacity onPress={ handleModal }>
                  <Text className='text-4xl'>{ list.emoji }</Text>
               </TouchableOpacity>
            </View>

            <View className='flex-row items-center space-x-4'>
               <MaterialIcons 
                  name="title" 
                  size={ 32 }
                  color={ COLORS.panton } 
               />
               
               <TextInput
                  autoComplete='off'
                  value={ list.title }
                  autoCapitalize='none'
                  autoCorrect={ false }
                  placeholder='Додайте заголовок'
                  placeholderTextColor={ COLORS.panton }
                  className='text-xl text-black font-sans-r'
                  onChangeText={ handleTextChange }
               />
            </View>

            <View className='flex-row items-center space-x-4'>
               <Feather 
                  name="calendar" 
                  size={ 32 } 
                  color={ COLORS.panton }
               />
               
               <TouchableOpacity
                  onPress={ handleDateModal }>
                  <Text className='text-xl text-gray-400 font-sans-r'>
                     {
                        list.date ?
                           list.date :
                        "Додати дату події"
                     }
                  </Text>
               </TouchableOpacity>
            </View>

            <View className='flex-row py-4 border-y-0.5 border-y-gray-300 items-center justify-between'>
               <View className='flex-row items-center space-x-5'>
                  <Feather 
                     name="eye-off" 
                     size={ 32 } 
                     color={ COLORS.panton } 
                  />

                  <Text className='text-xl text-gray-700 font-sans-r'>
                     Приватний список
                  </Text>
               </View>
               <Switch 
                  value={ list.private }
                  onValueChange={ () => updatedList("private", !list.private) }
               />
            </View>
         </View>

         <TouchableOpacity 
            disabled={ disabled }
            onPress={ handleCreateList }
            className={ `absolute bottom-8 right-5 left-5 py-5 rounded-lg items-center justify-center bg-${ disabled ? 'gray' : 'orange' }-400` }>
            <Text className='text-xl text-white font-sans-b'>
               Створити список
            </Text>
         </TouchableOpacity>

         <EmojiModal
            modal={ emojiModal }
            handleModal={ handleModal }
            handleEmojiChange={ handleEmojiChange }
         />

         <DateModal
            modal={ dateModal }
            handleModal={ handleDateModal }
            handleDateChange={ handleDateChange }
         />
      </View>
   )
}