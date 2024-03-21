import { FC } from "react";
import { useQuery } from "react-query";

import { 
   Text,
   View,
   FlatList,
   TouchableOpacity,
   ActivityIndicator
} from "react-native";

import ListItem from "@/components/shared/auth/ListItem";

import styles from "@/styles/box_shadow";
import { COLORS } from "@/constants";

import { Entypo } from "@expo/vector-icons";

import { getLists } from "@/types/list";

type Props = {
   email: string;
};

const ListsTab: FC<Props> = ({ email }) => {
   const { data, error, isLoading } = useQuery({
      queryKey: 'lists',
      queryFn: () => getLists(email),

      keepPreviousData: true,
      enabled: !!email,
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
      <View className="flex-1 pb-5">
         <FlatList
            data={ data }
            renderItem={ ({ item }) => <ListItem item={ item } /> }

            ListHeaderComponent={ () => (
               <TouchableOpacity 
                  activeOpacity={ 0.6 }
                  style={ styles.itemShadow }
                  className="p-5 mb-4 mx-4 rounded-lg space-y-1 bg-white">
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
            ) }
            showsVerticalScrollIndicator={ false }
         />
      </View>
   )
}

export default ListsTab;