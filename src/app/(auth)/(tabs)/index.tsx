import { useRef, useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { useLocalUser } from '@/services/store/user';

import { 
  Text,
  View,
  Image,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Skeleton } from 'moti/skeleton';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { 
  Tabs, 
  PageSlider, 
  BottomSheet 
} from '@/components';

import { IMAGES } from '@/constants';

import { Entypo } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Home() {
  const navigation = useNavigation();

  const tabsRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const sheetRef = useRef<BottomSheetModal>(null);

  const localUser = useLocalUser(state => state.user);

  const handleTabChange = (idx: number) => {
    tabsRef.current?.scrollToOffset({
      offset: idx * width
    })
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity 
            className='ml-5'
            activeOpacity={ 0.6 }
            onPress={ () => sheetRef.current?.present() }>
            <Entypo 
              name="list" 
              size={ 28 } 
              color="white" 
            />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <View className='mr-5'>
          <Entypo 
            name="share" 
            size={ 28 } 
            color="white" 
          />
        </View>
      )
    })
  }, [ navigation ]);

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
            <Skeleton
              width={ 80 }
              height={ 80 }
              radius='round'
              colorMode='light'
              
              transition={{
                type: 'timing',
                duration: 1500,
              }}>
              {
                !!localUser?.profile_img_uri ?
                  <Image
                    resizeMode='contain'
                    className='w-20 h-20 rounded-full'
                    source={{ uri: localUser?.profile_img_uri }}
                  /> : 
                <Image
                  resizeMode='contain'
                  className='w-20 h-20 rounded-full'
                  source={ IMAGES.EmptyImage }
                />
              }
            </Skeleton>

            <View className='flex-1 space-y-1'>
              <Text 
                numberOfLines={ 2 }
                className=' text-2xl text-white font-sans-b'>
                { localUser?.nikname }
              </Text>

              <Text className=' text-base text-gray-200 font-sans-sm'>
                0 Читачі | 0 Друзів
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Tabs
        scrollX={ scrollX }
        handleTabChange={ handleTabChange }
      />

      <View className='flex-1'>
        <FlatList
          horizontal
          pagingEnabled
          ref={ tabsRef }
          bounces={ false }
          scrollEnabled={ false }
          showsHorizontalScrollIndicator={ false }
          onScroll={ Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }], 
            { useNativeDriver: false }) 
          }

          data={ new Array(2) }
          renderItem={ ({ index }) => <PageSlider index={ index } />}
        />
      </View>

      <BottomSheet 
        ref={ sheetRef } 
        handleModalClose={ () => sheetRef.current?.close() } 
      />
    </View>
  );
}