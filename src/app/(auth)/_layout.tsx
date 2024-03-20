import { Stack, useRouter } from "expo-router";

import { TouchableOpacity } from 'react-native';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Ionicons } from '@expo/vector-icons';

export default function AuthLayout() {
   const router = useRouter();
   
   return (
      <GestureHandlerRootView className="flex-1">
         <BottomSheetModalProvider>
            <Stack 
               initialRouteName="register"
               screenOptions={{ 
                  headerShown: false,
                  headerShadowVisible: false,
                  headerTitleStyle: {
                     fontSize: 20,
                     fontFamily: 'open-sans-semibold'
                  },

                  headerLeft: () => (
                     <TouchableOpacity
                        onPress={ () => router.back() }>
                        <Ionicons 
                           name="arrow-back" 
                           size={ 24 } 
                           color="black" 
                        />
                     </TouchableOpacity>
                  )
               }}>
               <Stack.Screen name='register' />
               
               <Stack.Screen name='countries' />

               <Stack.Screen name='(tabs)' />

               <Stack.Screen name="profile"
                  options={{
                     headerShown: true,
                     headerTitle: 'Редагувати профіль',
                  }}
               />

               <Stack.Screen name="messages" />

               <Stack.Screen name="privacy" />

               <Stack.Screen name="locale" />

               <Stack.Screen 
                  name="help"
                  options={{
                     headerShown: true,
                     title: 'Допомога'
                  }}
               />

               <Stack.Screen name="list" />

               <Stack.Screen name="add_item" />

               <Stack.Screen 
                  name="add_list" 
                  options={{
                     headerShown: true,
                     title: 'Створити список'
                  }}
               />

               <Stack.Screen 
                  name="wish" 
                  options={{ 
                     title: '',
                     headerShown: true,
                  }} 
               />
            </Stack>
         </BottomSheetModalProvider>
      </GestureHandlerRootView>
   )
}