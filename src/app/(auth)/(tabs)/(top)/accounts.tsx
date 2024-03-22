import { useQuery } from 'react-query';
import { useLocalUser } from '@/services/store/user';

import { 
   View,
   Text,
   FlatList,
   ActivityIndicator, 
} from 'react-native';

import { UserItem } from '@/components';

import { COLORS } from '@/constants';

import { getUsers } from '@/types/user';

export default function Accounts() {
   const localUser = useLocalUser(state => state.user);

   const { data, error, isLoading } = useQuery({
      queryKey: 'users',
      queryFn:  () => getUsers(localUser?.email!),

      keepPreviousData: true,
      enabled: !!localUser?.email,
      refetchOnWindowFocus: false,
   });
   
   // TODO: make separate component for such an items with error and load state
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
      <View className='flex-1 p-5 bg-gray-200'>
         <FlatList
            data={ data }
            bounces={ false }
            showsVerticalScrollIndicator={ false }
            renderItem={ ({ item }) => <UserItem item={ item } /> }
         />
      </View>
   )
}