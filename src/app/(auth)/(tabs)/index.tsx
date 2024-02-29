import { IMAGES } from '@/constants';

import { 
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { PageSlider } from '@/components';

// TODO: divide into components
export default function Home() {
  return (
    <View className='flex-1 bg-gray-200 border-t-0.5 border-t-white'>
      <View className='h-40'>
        <Image
          resizeMode='cover'
          source={ IMAGES.ProfileBackground }
          className=' w-full h-full absolute opacity-95'
        />

        <View className='flex-1 justify-center'>
          <View className='p-4 space-x-5 flex-row items-center'>
            <View className='w-20 h-20 rounded-full bg-slate-600'></View>
            <View className='flex-1 space-y-1'>
              <Text 
                numberOfLines={ 2 }
                className=' text-2xl text-white font-sans-b'>
                artem
              </Text>

              <Text className=' text-base text-gray-200 font-sans-sm'>
                0 Читачі | 0 Друзів
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className='-top-3 h-16 rounded-t-2xl bg-gray-200'>
        <View className='flex-1 flex-row items-center justify-around'>
          <TouchableOpacity 
            activeOpacity={ 0.5 }
            className='w-1/2 items-center pb-2'>
            <Text className='font-sans-sm text-xl'>
              Списки
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            activeOpacity={ 0.5 }
            className='w-1/2 items-center pb-2'>
            <Text className='font-sans-sm text-xl'>
              Бажання
            </Text>
          </TouchableOpacity>

          <Indicator />
        </View>
      </View>

      <View className='flex-1'>
        <FlatList
          horizontal
          pagingEnabled
          bounces={ false }
          scrollEnabled={ true }
          showsHorizontalScrollIndicator={ false }

          data={ new Array(2) }
          renderItem={ ({ index }) => <PageSlider index={ index } />}
        />
      </View>
    </View>
  );
}

// TODO: implement
const Indicator = () => {
  return (
    <View
      className='absolute -bottom-[-10] h-[2] w-48 bg-black'
    />
  )
}