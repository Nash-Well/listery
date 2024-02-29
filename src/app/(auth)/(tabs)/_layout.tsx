import { Tabs } from 'expo-router';

import { 
  View,
  Image,
  StyleSheet 
} from 'react-native';
import AddWish from './add_wish';

import { COLORS, IMAGES } from '@/constants';

import { 
  Entypo,
  Feather,
  AntDesign 
} from '@expo/vector-icons';

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

          headerLeft: () => (
            <View className='ml-5'>
              <Entypo 
                name="list" 
                size={28} 
                color="white" 
              />
            </View>
          ),

          headerRight: () => (
            <View className='mr-5'>
              <Entypo 
                name="share" 
                size={28} 
                color="white" 
              />
            </View>
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
        name='search'
        options={{
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