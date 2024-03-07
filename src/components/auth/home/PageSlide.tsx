import { FC, JSX } from "react";
import { useLocalUser } from "@/services/store/user";

import { 
   Text,
   View, 
   Dimensions,
} from "react-native";
import ListsTab from "./ListsTab";


type Props = {
   index: number;
};

const PageSlider: FC<Props> = ({ index }) => {
   const { width } = Dimensions.get('window');
   const localUser = useLocalUser(state => state.user);

   const handleIndex = (): JSX.Element => {
      switch(index) {
         case 0: return <ListsTab email={ localUser?.email! } />
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
      <View className="mb-20" 
         style={{ width }}>
         { handleIndex() }
      </View>
   );
}

export default PageSlider;