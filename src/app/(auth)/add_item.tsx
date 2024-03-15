import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useLocalUser } from '@/services/store/user';
import { useRouter, useNavigation } from 'expo-router';

import { 
   View, 
   Text, 
   Image,
   Switch,
   FlatList,
   TextInput,
   TouchableOpacity 
} from 'react-native';

import { 
   ListModal, 
   ImageModal,
   ExpandInput
} from '@/components';

import { COLORS } from '@/constants';

import { 
   Entypo, 
   Feather,
   Ionicons,
   AntDesign,
   MaterialIcons,
} from '@expo/vector-icons';

import { Wish, List } from '@/types';

import { UploadToStorage } from '@/services/utils/image';

import { FIREBASE_DB } from '@/services/firebase';
import { addDoc, collection } from 'firebase/firestore';

type UploadState = {
   show:  boolean;
   index: number;
}

// TODO: refactor
export default function AddItem() {
   const router = useRouter();
   const client = useQueryClient();
   const navigation = useNavigation();
   const localUser = useLocalUser(state => state.user);

   useEffect(() => {
      navigation.setOptions({
         title: '',
         headerShown: true,

         headerLeft: () => (
            <TouchableOpacity onPress={ () => router.back() }>
               <Entypo 
                  name="cross" 
                  size={ 24 } 
                  color="black" 
               />
            </TouchableOpacity>
         )
      });
   }, [ navigation ]);

   const [ wish, setWish ] = useState<Wish>({
      id:            0,
      name:          '',
      list_id:       -1,
      link:          '',
      imgs:          ['', '', ''],
      description:   '',
      price:         0,
      currency:      'uan',
      hide:          false,
      email:         localUser?.email!,
   });
   const lists = client.getQueryData<List[]>("lists");

   const [ upload, setUpload ] = useState<UploadState>({
      show:  false,
      index: -1,
   });
   const handleUpload = (index?: number) => {
      setUpload(oldUpload => ({
         ...oldUpload,
         show: !oldUpload.show,
         index: index ? index : 0,
      }));
   };

   const [ disabled, setDisabled ] = useState(false);
   const isAble = () => wish.list_id !== -1 && wish.name !== '';

   const [ listModal, setListModal ] = useState(false);
   const handleListModal = () => setListModal(oldListModal => !oldListModal);

   const isValidURL = () => {
      if(wish.link.length < 2) return true;
      
      const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
      return urlRegex.test(wish.link);
   };

   const setList = (id: number) => {
      setWish(oldWish => ({ 
            ...oldWish, 
            list_id: id 
         })
      );
      handleListModal();
   }

   const handleAddWish = async () => {
      try {
         let newWish: Wish = {
            ...wish,
            id: Math.floor(Math.random() * 1000000) + 1,
         }

         let newImgs: string[] = [];
         if (wish.imgs.some(img => img && img.trim() !== '')) {
            newImgs = await Promise.all(wish.imgs.map(async (imgUrl, index) => {
                  if (imgUrl && imgUrl.trim() !== '') {
                     const imgUrlFirebase = await UploadToStorage(imgUrl, `${localUser?.nikname}/wishes/${newWish.id}/img-${index}`);
                     return imgUrlFirebase;
                  }
                  return imgUrl;
            }));
         }
         newWish.imgs = newImgs;
         
         await addDoc(collection(FIREBASE_DB, "wishes"), newWish);
         client.setQueryData("wishes", (oldLists: Wish[] | undefined) => { return [...oldLists!, newWish ] });
      } catch (err) {
          console.log(err); // FIXME
      }
   }

   const handleImageUpload = (uri: string) => {
      setWish(oldWish => {
         const updatedImgs = [...oldWish.imgs];
         updatedImgs[upload.index] = uri;
         return {
            ...oldWish,
            imgs: updatedImgs,
         };
      });
   };   

   const updatedWish = <T extends string | number | boolean>(key: string, value: T) => {
      setWish(oldWish => ({ 
         ...oldWish, 
         [key]: value 
      }));
   };

   return (
      <View className='flex-1 p-5 bg-white'>
         <View className='space-y-4'>
            <View className='flex-row items-center space-x-2'>
               <MaterialIcons 
                  name="title" 
                  size={ 28 }
                  color={ COLORS.panton } 
               />
               
               <TextInput
                  autoComplete='off'
                  autoCapitalize='none'
                  autoCorrect={ false }
                  placeholder='Додати назву'
                  className='flex-1 text-lg text-gray-800 font-sans-sm'
                  onChangeText={ (text) => updatedWish("name", text) }
               />
            </View>
            
            <View className='flex-row items-center space-x-2'>
               <Entypo 
                  name="link" 
                  size={ 28 } 
                  color={ isValidURL() ? COLORS.panton : 'red' } 
               />
               
               <TextInput
                  autoComplete='url'
                  autoCapitalize='none'
                  autoCorrect={ false }
                  placeholder='Додати посилання'
                  className='flex-1 text-lg text-gray-800 font-sans-sm'
                  onChangeText={ (text) => updatedWish("link", text) }
               />
            </View>
            
            <View className='flex-row items-center space-x-2'>
               <Feather 
                  name="list" 
                  size={ 28 } 
                  color={ COLORS.panton }
               />
               
               <TouchableOpacity
                  activeOpacity={ 0.6 }
                  onPress={ handleListModal }>
                  <Text className='text-lg text-gray-400 font-sans-sm'>
                     {
                        wish.list_id !== -1 ? (
                           lists?.find(list => list.id === wish.list_id)?.title || ''
                        ) : 'Обрати список'
                     }
                  </Text>
               </TouchableOpacity>
            </View>

            {/* TODO: Make separate component */}
            <FlatList
               horizontal
               data={ wish.imgs }
               renderItem={ ({ item, index }) => (
                  <TouchableOpacity 
                     activeOpacity={ 0.6 }
                     onPress={ () => handleUpload(index) }
                     className='relative mr-3 p-1 w-32 h-32 border border-dashed border-gray-500 rounded-md items-center justify-center'>
                     {
                        item ?
                           <Image
                              resizeMode='cover'
                              source={{ uri: item }}
                              className='absolute w-full h-full rounded-md bg-red-400'
                           />
                        :
                        <Ionicons 
                           name="camera" 
                           size={ 28 } 
                           color="gray" 
                        />
                     }
                  </TouchableOpacity>
               ) }

               bounces={ false }
               showsHorizontalScrollIndicator={ false }
            />

            <View className='flex-row items-center space-x-2'>
               <MaterialIcons 
                  name="filter-list" 
                  size={ 28 } 
                  color={ COLORS.panton } 
               />
               
               <ExpandInput
                  value={ wish.description }
                  placeholder='Додати опис'
                  setValue={ (text: string) => updatedWish("description", text) }
               />
            </View>
            
            <View className='flex-row items-center space-x-2'>
               <AntDesign 
                  name="tago"
                  size={ 28 } 
                  color={ COLORS.panton } 
               />
               
               <TextInput
                  placeholder='0,00'
                  keyboardType='numeric'
                  className='text-lg text-gray-800 font-sans-r'
                  onChangeText={ (text) => updatedWish("price", +text) }
               />
            </View>

            {/* TODO: make separate component */}
            <View className='flex-row py-3 border-y-0.5 border-y-gray-300 items-center justify-between'>
               <View className='flex-row items-center space-x-5'>
                  <Feather 
                     name="eye-off" 
                     size={ 32 } 
                     color={ COLORS.panton } 
                  />

                  <Text className='text-lg text-gray-700 font-sans-r'>
                     Приватний список
                  </Text>
               </View>
               <Switch 
                  value={ wish.hide }
                  onValueChange={ () => updatedWish("hide", !wish.hide) }
               />
            </View>
         </View>

         {/* TODO: Make separate component */}
         <TouchableOpacity 
            disabled={ isAble() }
            activeOpacity={ 0.6 }
            onPress={ handleAddWish }
            className={ `absolute bottom-8 right-5 left-5 p-5 rounded-lg items-center bg-${ isAble() ? 'orange' : 'gray' }-400` }>
            <Text className='text-xl text-white font-sans-b'>
               Додати бажання
            </Text>
         </TouchableOpacity>

         <ImageModal
            visible={ upload.show }
            onHide={ handleUpload }
            uploadImage={ handleImageUpload }
         />

         <ListModal 
            setList={ setList }
            lists={ lists || [] }
            visible={ listModal }
            setVisible={ handleListModal }
         />
      </View>
   )
}