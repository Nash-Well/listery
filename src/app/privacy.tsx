import { 
   View, 
   Text,
   Image,
   ScrollView,
} from 'react-native';

import { IMAGES } from '@/constants';

import { 
   Feather,
   AntDesign 
} from '@expo/vector-icons';

export default function privacy() {
   return (
      <View className='flex-1 bg-white'>
         <View className='mt-4 h-1/4 bg-slate-400'>
            <Image
               className='absolute h-full'
               source={ IMAGES.OnboardBackground }
            />

            <View className='absolute p-4 space-y-5'>
               <View className='w-full flex-row justify-between items-center'>
                  <View className='flex-row items-center space-x-2'>
                     <View className='bg-white p-1 rounded-md'>
                        <AntDesign 
                           name="staro" 
                           size={ 24 } 
                           color="orange" 
                        />
                     </View>
                     
                     <Text className='text-xl text-white font-sans-sm'>
                        Listery
                     </Text>
                  </View>

                  <Feather 
                     name="list" 
                     size={ 28 } 
                     color="white" 
                  />
               </View>

               <View className='flex-1 items-center'>
                  <Text className='text-xl text-white font-sans-r capitalize'>
                     listery app
                  </Text>

                  <Text className='mt-2 capitalize text-white text-4xl font-sans-sm'>
                     privacy policy
                  </Text>
               </View>
            </View>
         </View>

         <View className='flex-1 p-5'>
            <ScrollView 
               className=' space-y-5'
               showsVerticalScrollIndicator={ false }>
               <Text className='text-2xl capitalize mt-4 font-sans-sm'>
                  privacy policy
               </Text>

               <Text className='text-lg capitalize font-sans-r'>
                  By accessing the Platform or using any Services, you are consenting and giving us permission to process your personal information in accordance with and for the purposes outlined in this Privacy Policy. {'\n'}
               </Text>

               <Text className='text-xl font-sans-r'>
                  1. Definitions
               </Text>

               <Text className='text-lg font-sans-r'>
                  1.1 Unless otherwise specified, the definitions used in this Privacy Policy are the same as the definitions used in the Terms of Use Agreement.
               </Text>

               <Text className='text-lg font-sans-r'>
                  1.2 This Privacy Policy forms part of the Terms of Use Agreement.
               </Text>

               <Text className='text-xl font-sans-r'>
                  2. Application of Privacy Policy
               </Text>

               <Text className='text-lg font-sans-r'>
                  2.1 This Privacy Policy (“Policy”) applies to our collection and disclosure of certain information which may identify you personally or which may otherwise be personal to you (your “Personal Information”) when you use the Services or when you register an Account.
               </Text>

               <Text className='text-lg font-sans-r'>
                  2.2 This Policy is intended to describe what information we collect; who is collecting the information; when information is being collected; at what extent; how we use it; the legal basis for processing of information; how long the information is retained; and if we disclose it to a third-party and/or outside the EU. Please read this policy before using the Services or submitting any Personal Information. By using the Services, you are accepting the practices described in this policy.
               </Text>
            </ScrollView>
         </View>
      </View>
   )
}