import { FC, JSX } from "react";

import { 
   Text,
   View, 
   Dimensions,
   TouchableOpacity,
} from "react-native";

import { Entypo } from '@expo/vector-icons';

type Props = {
   index: number;
};

const PageSlider: FC<Props> = ({ index }) => {
   const { width } = Dimensions.get('window');
   
   const handleIndex = (): JSX.Element => {
      switch(index) {
         case 0: {
            return (
               <View className="flex-1">
                  <TouchableOpacity 
                     activeOpacity={ 0.6 }
                     className="p-5 shadow-xl rounded-lg space-y-1 bg-white">
                     <Text className="text-4xl">😍</Text>

                     <View className="space-y-2">
                        <View className="flex-row items-center space-x-3">
                           <Entypo 
                              name="lock" 
                              size={ 24 } 
                              color="black" 
                           />
                           
                           <Text className="text-2xl font-sans-b">
                              My whishes
                           </Text>
                        </View>
                        <Text className="text-lg text-gray-500 font-sans-r">
                           0 бажань
                        </Text>
                     </View>
                  </TouchableOpacity>
               </View>
            )
         }
         case 1: {
            return (
               <View>
                  <Text>{ index }</Text>
               </View>
            )
         }
         default: {
            return <></>;
         }
      }
   };
   
   return (
      <View style={{ width }}
         className="px-4">
         { 
            handleIndex() 
         }
      </View>
   );
}

export default PageSlider;