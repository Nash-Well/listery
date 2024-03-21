import { FC, createRef } from "react";
import { useRouter } from "expo-router";
import { useQueryClient } from "react-query";

import { 
   Text,
   View,
   Alert,
   TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import RightAction from "./RightAction";

import styles from "@/styles/box_shadow";

import { Feather } from "@expo/vector-icons";

import { List } from "@/types";

import { FIREBASE_DB } from "@/services/firebase";
import { 
   doc, 
   query, 
   where, 
   getDocs, 
   deleteDoc, 
   collection, 
} from "firebase/firestore";

type Props = {
   item: List;
};

const ListItem: FC<Props> = ({ item }) => {
   const router = useRouter();
   const client = useQueryClient();

   const swipeRef = createRef<Swipeable>();

   const deleteItem = async () => {
      try {
         const qs = await getDocs(
            query(
               collection(FIREBASE_DB, "list"), 
               where("id", "==", item.id)
            )
         );
         
         if (!qs.empty) {
            await deleteDoc(
               doc(FIREBASE_DB, "list", qs.docs[0].id)
            );
         }

         client.setQueriesData("lists", (oldList: List[] | undefined) => {
            return (oldList ?? []).filter(i => i.id !== item.id);
         });
      } catch (err) {
         throw err; // FIXME
      }
   };

   const handleEditItem = () => {
      swipeRef.current?.close();

      router.navigate({ pathname: '/add_list', params: item });
   };

   const handleDeleteItem = () => {
      swipeRef.current?.close();
      
      Alert.alert(
         'Ви дійсно хочете видалити список? Усі бажання які містяться у ньому також будуть видалені.', '', 
         [
            {
               text: 'Так',
               onPress: () => deleteItem(),
            }, 
            { text: 'Скасувати' }
         ]
      );
   };
   
   return (
      <Swipeable
         ref={ swipeRef } 
         renderRightActions={ () => 
            <RightAction 
               containerStyle="p-5" 
               handleDelete={ handleDeleteItem } 
               handleEdit={ handleEditItem } 
            /> }>
         <TouchableOpacity 
            activeOpacity={ 1 }
            style={ styles.itemShadow }
            onPress={ () => router.navigate({ 
               pathname: '/(auth)/list', 
               params: { id: item.id.toString() } 
            }) }
            className="mx-4 my-4 p-5 rounded-lg space-y-1 bg-white">
            <View className="flex-row items-center justify-between">
               <Text className="text-4xl">{ item.emoji }</Text>

               <Text className="text-2xl text-gray-400">
                  { 
                     new Date(item.date)
                        .toLocaleDateString('uk-UA', 
                        { day: 'numeric', month: 'long' }) 
                  }
               </Text>
            </View>
            
            <View className="flex-row space-x-3 items-center">
               {
                  item.private &&
                     <Feather 
                        name="eye-off" 
                        size={ 24 } 
                        color="black" 
                     />
               }

               <Text 
                  numberOfLines={ 1 }
                  className="flex-1 text-xl text-gray-800 font-sans-b">
                  { item.title }
               </Text>
            </View>

            <Text className="text-lg text-gray-500 font-sans-r">
               0 бажань
            </Text>
         </TouchableOpacity>
      </Swipeable>
   )
}

export default ListItem;