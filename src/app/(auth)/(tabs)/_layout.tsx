import { Tabs } from 'expo-router';

import { 
  View,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';

import AddWish from './add_wish';

import { 
  COLORS, 
  IMAGES 
} from '@/constants';

import { 
  Feather,
  AntDesign 
} from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: COLORS.pumpkin,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Listery',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,

          headerBackground: () => (
            <Image
              resizeMode='cover'
              source={ IMAGES.ProfileBackground }
              className='w-full h-full opacity-90'
            />
          ),

          tabBarIcon: ({ size, color }) => (
            <View className='top-3'>
              <AntDesign 
                name="user" 
                size={ size } 
                color={ color } 
              />
            </View>
          )
        }}
      />

      <Tabs.Screen
        name="add_wish"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ size }) => <AddWish size={ size } />
        }}

        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          }
        }}
      />

      <Tabs.Screen
        name="(top)"
        options={{
          headerShadowVisible: false,

          headerTitle: () => (
            <View 
              style={{ width: width * 0.9 }}
              className='flex-1 rounded-md bg-gray-300'>
              <View className='flex-1 mx-3 flex-row items-center justify-between space-x-1'>
                <TextInput
                  placeholder='Пошук'
                  placeholderTextColor='gray'
                  clearButtonMode='while-editing'
                  className='flex-1 text-base text-gray-700 font-sans-r'
                />

                <Feather 
                  name="search" 
                  size={ 24 } 
                  color={ COLORS.pumpkin } 
                />
              </View>
            </View>
          ),

          tabBarIcon: ({ size, color }) => (
            <View className='top-3'>
              <Feather 
                name="search" 
                size={ size } 
                color={ color }
              />
            </View>
          )
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 25,
    height: 70,
    borderRadius: 99,
    paddingHorizontal: 10,

    shadowColor: COLORS.charcoal,
    shadowOffset: {
      width: -1, 
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontFamily: "open-sans-bold"
  },

  header: {
    backgroundColor: COLORS.pumpkin,
  }
})