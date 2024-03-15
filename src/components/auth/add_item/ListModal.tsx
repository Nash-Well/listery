import { FC } from "react";

import { 
   Text,
   View, 
   Modal,
   FlatList,
   TouchableOpacity,
} from "react-native";

import { Entypo } from '@expo/vector-icons';

import { List } from "@/types";

type Props = {
   lists:      List[];
   visible:    boolean;
   setVisible: () => void;
   setList:    (id: number) => void;
};

const ListModal: FC<Props> = ({ lists, visible, setList, setVisible }) => {   
   return (
      <Modal
         transparent
         visible={ visible }
         animationType='slide'
         onRequestClose={ setVisible }>
            <View className="flex-1 bg-black-rgba">
               <View className="absolute bottom-0 left-0 right-0 h-[40%] rounded-t-xl bg-white">
                  <View className="p-3 flex-row items-center border-b-0.5 border-b-gray-400 space-x-5">
                     <TouchableOpacity 
                        activeOpacity={ 0.6 }
                        onPress={ setVisible }>
                        <Entypo 
                           name="cross" 
                           size={24} 
                           color="black" 
                        />
                     </TouchableOpacity>

                     <Text className="text-xl text-gray-800 font-sans-b">
                        Обрати список
                     </Text>
                  </View>

                  <FlatList
                     data={ lists }
                     renderItem={ ({ item }) => (
                        <TouchableOpacity 
                           activeOpacity={ 0.6 }
                           onPress={ () => setList(item.id) }
                           className="py-3 border-b-0.5 border-b-gray-400">
                           <Text className="px-5 text-xl font-sans-sm">
                              { item.title }
                           </Text>
                        </TouchableOpacity>
                     ) }

                     bounces={ false }
                     showsVerticalScrollIndicator={ false }
                  />
               </View>
            </View>
      </Modal>
   )
}

export default ListModal;