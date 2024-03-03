import { useRouter } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";
import { useLocalUser } from "@/services/store/user";

import { 
   FC, 
   Ref, 
   JSX,
   forwardRef, 
} from "react";

import { 
   Text,
   View,
   FlatList,
   TouchableOpacity
} from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { COLORS } from "@/constants";

import { 
   Feather, 
   Octicons, 
   AntDesign, 
} from '@expo/vector-icons';

import sheets from '@/configs/bottom-sheet.json';

type Props = {
   ref:              Ref<BottomSheetModal>;
   handleModalClose: () => void;
};

const BottomSheet: FC<Props> = forwardRef((props, ref) => {
   const { handleModalClose } = props;
   
   const router = useRouter();
   const { signOut } = useClerk();
   const setLocalUser = useLocalUser(state => state.setUser);
   
   const sheetIcon = (icon: string): JSX.Element => {
      const [ name, from ] = icon.split('|').map(part => part.trim());

      switch(from) {
         case 'ant': return <AntDesign name={ name as any } color={ COLORS.panton } size={ 24 } />
         case 'feature': return <Feather name={ name as any } color={ COLORS.panton } size={ 24 } />
         default: return <Octicons name="sign-out" size={ 24 } color={ COLORS.panton } />
      }
   }

   const handlePress = (item: any) => {
      handleModalClose();
      
      if(item.route !== '/exit') {
         router.navigate(item.route);
         return;
      } 
      
      signOut();
      setLocalUser(null);
   }
   
   return (
      <BottomSheetModal
         index={ 0 }
         ref={ ref }
         snapPoints={['50%']}
         enablePanDownToClose
         containerStyle={{ backgroundColor: COLORS.blackRGBA }}>
            <View className='flex-1 mt-6'>
               <FlatList
                  data={ sheets }
                  renderItem={ ({ item }) => (
                     <View className='mb-5 pb-4 border-b-0.5 border-b-gray-400'>
                        <TouchableOpacity 
                           activeOpacity={ 0.6 }
                           className='left-5 flex-row items-center space-x-5'
                           onPress={ () => handlePress(item) }>
                           { sheetIcon(item.icon) }
                           
                           <Text className='text-xl text-gray-600 font-sans-r'>
                              { item.title }
                           </Text>
                        </TouchableOpacity>
                     </View>
                  ) }
                  showsVerticalScrollIndicator={ false }
               />
            </View>
      </BottomSheetModal>
   )
});

export default BottomSheet;
