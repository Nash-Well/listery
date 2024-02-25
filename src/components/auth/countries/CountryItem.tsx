import { FC } from "react";
import { useRouter } from "expo-router";

import { 
   Text,
   TouchableOpacity 
} from "react-native";

import { Country } from "@/types/country";

type Props = {
   item: Country;
};

const CountryItem: FC<Props> = ({ item }) => {
   const router = useRouter();
   
   return (
      <TouchableOpacity 
         className='py-[14] border-b border-gray-400'
         onPress={ () => router.navigate({ pathname: '/register', params: { country: item.country } }) }>
         <Text className='text-xl text-gray-900 font-sans-b'>
            { item.country } {'\t'}
            <Text className=' text-gray-500 font-sans-r'>
               { item.name }
            </Text>
         </Text>
      </TouchableOpacity>
   )
}

export default CountryItem;