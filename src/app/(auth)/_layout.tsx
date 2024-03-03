import { Stack } from "expo-router";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AuthLayout() {
   return (
      <GestureHandlerRootView className="flex-1">
         <BottomSheetModalProvider>
            <Stack 
               initialRouteName="register"
               screenOptions={{ headerShown: false }}>
               <Stack.Screen name='register' />
               
               <Stack.Screen name='countries' />

               <Stack.Screen name='(tabs)' />

               <Stack.Screen name="profile" />

               <Stack.Screen name="messages" />

               <Stack.Screen name="privacy" />

               <Stack.Screen name="locale" />

               <Stack.Screen name="help" />
            </Stack>
         </BottomSheetModalProvider>
      </GestureHandlerRootView>
   )
}