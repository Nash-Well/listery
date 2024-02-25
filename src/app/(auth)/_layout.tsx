import { Stack } from "expo-router"

export default function AuthLayout() {
   return (
      <Stack initialRouteName="register">
         <Stack.Screen
            name='register'
            options={{ headerShown: false }}
         />
         
         <Stack.Screen
            name='countries'
            options={{ headerShown: false }}
         />

         <Stack.Screen
            name='(tabs)'
            options={{ headerShown: false }}
         />
      </Stack>
   )
}