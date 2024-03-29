import { useUser } from '@clerk/clerk-expo';
import { 
   useRouter, 
   useLocalSearchParams 
} from 'expo-router';
import { 
   useRef, 
   useState, 
   useEffect, 
} from 'react';
import { useLocalUser } from '@/services/store/user';

import { 
   View, 
   Text,
   Image, 
   FlatList, 
   TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { 
   SliderItem,
   ImageModal, 
} from '@/components';

import { IMAGES } from '@/constants';
import styles from '@/styles/box_shadow';

import {
   User,
   Slide,
} from '@/types';
import slides from '@/configs/slides.json';

import { FIREBASE_DB } from '@/services/firebase';
import { 
   addDoc, 
   collection 
} from 'firebase/firestore';
import { UploadToStorage } from '@/services/utils/image';

type SearchParams = { 
   country?:   string;
   showError?: boolean;
}

export default function Register() {   
   const router = useRouter();
   const sliderRef = useRef<FlatList>(null);
   const email = useUser().user?.primaryEmailAddress?.emailAddress;

   const { country }: SearchParams = useLocalSearchParams();
   useEffect(() => {
      if (country) {
         setDisabled(false);
         setUser(oldUser => ({ ...oldUser, country: country }));
      }
   }, [ country ]);

   const [ user, setUser ] = useState<User>({
      id:               0,
      nikname:          '',
      country:          '',
      profile_img_uri:  '',
      email:            email || '',
   });
   const [ disabled, setDisabled ] = useState(true);
   const [ currentIndex, setCurrentIndex ] = useState(0);

   const [ upload, setUpload ] = useState(false);
   const handleUpload = () => setUpload(!upload);

   const setLocalUser = useLocalUser(state => state.setUser);

   const handleNextPress = async () => {
      let updatedIndex = currentIndex + 1;
      
      if (updatedIndex >= slides.length) {
         try {
            const uri = await UploadToStorage(user.profile_img_uri, `${user.nikname}/profile_img`);
   
            handleSkip(uri);
            return;
         } catch (err) {
            console.error("Error registering user:", err);
         }
      }
   
      setDisabled(true);
      setCurrentIndex(updatedIndex);
      sliderRef.current?.scrollToIndex({ index: updatedIndex });
   };

   const handleSkip = async(uri?: string) => {
      try {
         const docUser: User = { 
            ...user, 
            profile_img_uri: uri || '',
            id: Math.floor(Math.random() * 1000000) + 1,
         };
         await addDoc(collection(FIREBASE_DB, "users"), docUser);
         
         setLocalUser(docUser);
         router.navigate('/(auth)/(tabs)/');
      } catch (err) {
         console.error("Error registering user:", err); // FIXME
      }
   }

   const handleTextChange = (text: string) => {
      setDisabled(!(text.length > 4));
      const slide = slides[currentIndex];

      slide.field_name &&
         setUser(oldUser => ({ 
            ...oldUser, 
            [slide.field_name!]: text 
         })
      );
   };

   const handleImageUpload = (uri: string) => {
      setUser(
         oldUser => ({ 
            ...oldUser, 
            profile_img_uri: uri 
         })
      );
      setDisabled(false);
   }

   return (
      <View className='flex-1 relative'>
         <Image
            source={ IMAGES.RegisterBackground }
            resizeMode='cover'
            className=' absolute w-full h-full'
         />

         <SafeAreaView className='flex-1'>
            <FlatList
               horizontal
               pagingEnabled
               ref={ sliderRef }
               bounces={ false }
               scrollEnabled={ false }
               showsHorizontalScrollIndicator={ false }
               
               data={ slides }
               renderItem={ ({ item }) => 
                  <SliderItem
                     user={ user }
                     item={ item as Slide }
                     handleSkip={ handleSkip }
                     handleUpload={ handleUpload }
                     handleTextChange={ handleTextChange }
                  /> 
               }
            />

            <TouchableOpacity
               disabled={ disabled }
               style={ styles.boxShadow }
               onPress={ handleNextPress }
               className={`py-4 z-30 absolute bottom-[6%] left-5 right-5 rounded-xl items-center justify-center ${ disabled ? 'bg-gray-400' : 'bg-orange-500' }`}>
               <Text className='text-2xl text-white font-sans-sm'>
                  Далі 
               </Text>
            </TouchableOpacity>
         </SafeAreaView>

         <ImageModal
            visible={ upload }
            onHide={ handleUpload }
            uploadImage={ (uri: string) => handleImageUpload(uri) }
         />
      </View>
   )
}