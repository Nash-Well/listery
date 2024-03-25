import { createRef, FC } from "react";
import { useRouter } from "expo-router";
import { useQueryClient } from "react-query";

import { 
   View,
   Text,
   Image,
   Alert,
   TouchableOpacity 
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import RightAction from "./RightAction";

import styles from "@/styles/box_shadow";
import { IMAGES } from "@/constants";

import { Feather } from "@expo/vector-icons";

import { Wish } from "@/types";

import { FIREBASE_DB } from "@/services/firebase";
import { 
   doc,
   where, 
   query, 
   getDocs, 
   deleteDoc, 
   collection, 
} from "firebase/firestore";

type Props = {
   item: Wish;
};

const WishItem: FC<Props> = ({ item }) => {
   const router = useRouter();
   const client = useQueryClient();
   const swipeRef = createRef<Swipeable>();

   const handleEditItem = () => {
      swipeRef.current?.close();

      router.navigate({ pathname: '/(auth)/add_item', params: { id: item.id.toString() } });
   };

   const deleteItem = async () => {
      try {
         const qs = await getDocs(
            query(
               collection(FIREBASE_DB, "wishes"), 
               where("id", "==", item.id)
            )
         );
         
         if (!qs.empty) {
            await deleteDoc(
               doc(FIREBASE_DB, "wishes", qs.docs[0].id)
            );
         }

         client.setQueriesData("wishes", (oldWishes: Wish[] | undefined) => {
            return (oldWishes ?? []).filter(i => i.id !== item.id);
         });
      } catch (err) {
         throw err; // FIXME
      }
   };

   const handleDeleteItem = () => {
      swipeRef.current?.close();
      
      Alert.alert(
         'Ви дійсно хочете видалити своє бажання?', '', 
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
               containerStyle="px-5 mb-5" 
               handleEdit={ handleEditItem } 
               handleDelete={ handleDeleteItem } 
            /> 
      }>
         <TouchableOpacity 
            activeOpacity={ 1 }
            style={ styles.itemShadow }
            className="mb-5 flex-row items-center mx-5 rounded-lg bg-white"
            onPress={ () => router.push({ pathname: '/(auth)/wish', params: { id: item.id.toString() } }) }>
            <View className="relative">
               <Image
                  resizeMode="cover"
                  className="w-32 h-32 rounded-l-lg"
                  source={ item.imgs.some(img => img !== '') ? { uri: item.imgs.find(img => img !== '') } : IMAGES.EmptyBag }
               />

               {
                  item.hide &&
                     <View className="absolute w-full h-full rounded-l-lg items-center justify-center bg-black-rgba-0.5" >
                        <Feather 
                           name="eye-off" 
                           size={ 32 } 
                           color='white' 
                        />
                     </View>
               }
            </View>

            <View className="p-5">
               <Text 
                  numberOfLines={ 1 }
                  className="text-lg text-gray-800 font-sans-sm">
                  { item.name }
               </Text>

               {
                  item.price != 0 &&
                     <Text 
                        numberOfLines={ 1 }
                        className="text-sm text-gray-500 font-sans-r">
                        Ціна: { item.currency.toUpperCase() } { item.price }
                     </Text>
               }
            </View>
         </TouchableOpacity>
      </Swipeable>
   )
}

export default WishItem;