import { View, Text, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Help() {
   return (
      <View className='flex-1 p-5 bg-white'>
         <View className='flex-1 items-center space-y-3'>
            <Text className='text-xl text-center text-gray-900 font-sans-sm'>
               З усіх питань і пропозицій, будь ласка, зв'яжіться з нами
            </Text>

            <TouchableOpacity>
               <Text className='text-xl text-blue-600 font-sans-sm'>
                  info@listery.app
               </Text>
            </TouchableOpacity>
         </View>
      </View>
   )
}