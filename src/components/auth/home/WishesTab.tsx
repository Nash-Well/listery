import { useQuery } from "react-query";
import { FC } from "react";

import { 
   Text,
   View,
   FlatList,
   ActivityIndicator,
} from "react-native";
import WishItem from "@/components/shared/auth/WishItem";

import { COLORS } from "@/constants";

import { getWishes } from "@/types/wish";

type Props = {
   email: string;
};

const WishesTab: FC<Props> = ({ email }) => {
   const { data, error, isLoading } = useQuery({
      queryKey: 'wishes',
      queryFn: () => getWishes(email),

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
            renderItem={ ({ item }) => <WishItem item={ item } /> }

            showsVerticalScrollIndicator={ false }
         />
      </View>
   )
}

export default WishesTab;