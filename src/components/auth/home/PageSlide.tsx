import { FC, JSX } from "react";
import { useLocalUser } from "@/services/store/user";

import { 
   View, 
   Dimensions,
} from "react-native";
import ListsTab from "./ListsTab";
import WishesTab from "./WishesTab";

type Props = {
   index: number;
};

const PageSlider: FC<Props> = ({ index }) => {
   const { width } = Dimensions.get('window');
   const localUser = useLocalUser(state => state.user);

   const handleIndex = (): JSX.Element => {
      switch(index) {
         case 0: return <ListsTab email={ localUser?.email! } />;
         case 1: return <WishesTab email={ localUser?.email! } />;
         default: return <></>;
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