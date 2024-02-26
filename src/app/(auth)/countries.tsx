import { useState } from 'react';
import { useRouter } from 'expo-router';

import { 
   Text, 
   View,
   FlatList, 
   TextInput,
   TouchableOpacity,
   ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CountryItem from '@/components/auth/countries/CountryItem';

import { 
   Entypo, 
   AntDesign,
} from '@expo/vector-icons';

import { 
   Country, 
   FetchCountries 
} from '@/types/country';

export default function Countries() {
   const router = useRouter();
   const [ country, setCountry ] = useState('');
   
   const [ isLoading, setIsLoading ] = useState(false);
   const [ countries, setCountries ] = useState<Country[]>([]);

   const handleCountryChange = async (text: string) => {
      setCountry(text);
      text.length < 3 && setCountries([]);

      setIsLoading(true);
      if (text.length > 2) {
         try {
            const data = await FetchCountries(text);
            setCountries(data);
         } catch (err) {
            console.error(err);
         }
      }
      setIsLoading(false);
   };

   const handleClear = () => {
      setCountry('');
      setCountries([]);   
   }

   return (
      <View className='flex-1'>
         <SafeAreaView className='flex-1 px-5 space-y-5'>
            <View className='flex-row items-center justify-between space-x-3'>
               <View className='flex-1 flex-row items-center p-3 h-14 rounded-lg bg-gray-300'>
                  <TextInput
                     value={ country }
                     autoCapitalize='none'
                     autoCorrect={ false }
                     autoComplete='country'
                     placeholder='Країна...'
                     className='flex-1 text-xl'
                     placeholderTextColor='black'
                     onChangeText={ handleCountryChange }
                  />

                  {
                     !country ?
                        <AntDesign 
                           name="search1" 
                           size={ 24 } 
                           color="orange" 
                        /> :
                     <TouchableOpacity onPress={ handleClear }>
                        <Entypo 
                           name="cross" 
                           size={ 24 } 
                           color="black" 
                        />
                     </TouchableOpacity>
                  }
               </View>
               
               <TouchableOpacity
                  onPress={ () => router.navigate({ pathname: '/register', params: { showError: true } }) }>
                  <Text className='text-lg text-orange-500 font-sans-r'>
                     Скасувати
                  </Text>
               </TouchableOpacity>
            </View>

            <View className={ `flex-1 ${ isLoading && 'items-center justify-center' }` }>
               {
                  isLoading ?
                     <ActivityIndicator
                        size='large'
                        color='orange'
                     /> : (
                        <FlatList
                           data={ countries }
                           showsVerticalScrollIndicator={ false }
                           renderItem={ ({ item }) => <CountryItem item={ item } /> }
                        />
                     )
               }
            </View>
         </SafeAreaView>
      </View>
   )
}