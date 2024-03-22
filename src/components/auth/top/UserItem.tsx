import { IMAGES } from "@/constants";
import { User } from "@/types";
import { FC } from "react";

import {
   Text, 
   Image,
   TouchableOpacity
} from "react-native";

type Props = {
   item: User;
};

const UserItem: FC<Props> = ({ item }) => {
   return (
      <TouchableOpacity 
         activeOpacity={ 0.6 }
         className='flex-row items-center space-x-3 mb-5'>
         <Image
            resizeMode='cover'
            className='w-14 h-14 rounded-full'
            source={ item.profile_img_uri === '' ? IMAGES.EmptyImage : { uri: item.profile_img_uri } }
         />

         <Text className='text-xl text-gray-700 font-sans-b'>
            { item.nikname }
         </Text>
      </TouchableOpacity>
   )
}

export default UserItem;