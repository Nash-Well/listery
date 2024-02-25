import { useUser } from '@clerk/clerk-expo';
import { useLocalSearchParams } from 'expo-router';
import { 
   useRef, 
   useState, 
   useEffect, 
} from 'react';

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
   ImagePicker 
} from '@/components';

import { IMAGES } from '@/constants';
import styles from '@/styles/box_shadow';

import {
   User,
   Slide,
} from '@/types';
import slides from '../../../slides.json';

type SearchParams = { 
   country?:   string;
   showError?: boolean;
}

export default function Register() {   
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
      nikname: '',
      country: '',
      email:   email || '',
   });
   const [ disabled, setDisabled ] = useState(true);
   const [ currentIndex, setCurrentIndex ] = useState(0);

   const [ upload, setUpload ] = useState(false);
   const handleUpload = () => setUpload(!upload);

   const handleNextPress = () => {
      let updatedIndex = currentIndex + 1;
      if (updatedIndex >= slides.length) {
         updatedIndex = 0;
      }

      setCurrentIndex(updatedIndex);
      setDisabled(slides[updatedIndex].required);
      sliderRef.current?.scrollToIndex({ index: updatedIndex });
   };

   const hanldeTextChange = (text: string) => {
      setDisabled(!(text.length > 4));
      const slide = slides[currentIndex];

      slide.field_name &&
         setUser(oldUser => ({ 
            ...oldUser, 
            [slide.field_name!]: text 
         })
      );
   };

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
                     handleUpload={ handleUpload }
                     hanldeTextChange={ hanldeTextChange }
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

         <ImagePicker
            visible={ upload }
            onHide={ handleUpload }
         />
      </View>
   )
}