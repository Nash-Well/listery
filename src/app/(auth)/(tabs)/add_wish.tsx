import { useState } from 'react';

import { 
  Text,
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path } from "react-native-svg";

import { ImageButton } from '@/components/shared/shared';

import { AntDesign } from '@expo/vector-icons';

type Props = {
  size: number;
};

export default function AddWish({ size }: Props) {
  const [ modal, setModal ] = useState(false);
  const handleModal = () => setModal(oldModal => !oldModal);
  
  return (
    <View>
      <View className=' items-center'>
        <TouchableOpacity 
          onPress={ handleModal }
          className=' top-[4] w-[60] h-[60] z-30 rounded-full border-gray-50 items-center justify-center bg-orange-500'>              
          <AntDesign 
            name="plus" 
            size={ size } 
            color="white" 
          />
        </TouchableOpacity>

        <View className=' absolute top-[10] -z-10'>
          <Svg
            width={115}
            height={60}
            viewBox="0 0 110 60"
          >
            <Path
              fill="#e5e7eb"
              d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
            />
          </Svg>
        </View>
      </View>

      <Modal
        transparent
        visible={ modal }
        animationType='slide'
        onRequestClose={ handleModal }>
        <View className='flex-1 bg-black-rgba'>
          <SafeAreaView className='flex-1 '>
            <View className=' absolute bottom-10 left-7 right-7 rounded-2xl space-y-3'>
              <View className=' rounded-xl bg-gray-300'>
                <ImageButton
                  border
                  title='Створити бажання'
                  handleFunc={ () => {} }
                />
                <ImageButton
                  title='Створити список'
                  handleFunc={ () => {} }
                />
              </View>

              <TouchableOpacity 
                onPress={ handleModal }
                className='py-3 items-center rounded-lg bg-slate-200'>
                <Text className='text-lg text-blue-500 font-sans-sm'>
                  Скасувати
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
}