import { 
   Stack, 
   useRouter 
} from "expo-router";

import { TouchableOpacity } from "react-native"; 

import { AntDesign } from '@expo/vector-icons';

export default function PublicLayout() {
   const router = useRouter();
   
   return (
      <Stack initialRouteName='onboard'>
         <Stack.Screen 
            name="onboard" 
            options={{ headerShown: false }}
         />

         <Stack.Screen 
            name="privacy" 
            options={{
               title: '',
               headerShadowVisible: false,

               headerLeft: () => (
                  <TouchableOpacity
                  onPress={ () => router.navigate('/onboard') }>
                  <AntDesign 
                     name="arrowleft" 
                     size={ 24 } 
                     color="black" 
                  />
                  </TouchableOpacity>
               )
            }}
         />
      </Stack>
   )
}