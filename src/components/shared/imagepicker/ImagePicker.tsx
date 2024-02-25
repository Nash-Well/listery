import { FC } from "react";

import {
   Text,
   View,
   Modal,
   TouchableOpacity
} from 'react-native';
import { ImageButton } from '../shared';

type Props = {
   visible: boolean;
   onHide:  () => void;
};

const ImagePicker: FC<Props> = ({ visible, onHide }) => {
   return (
      <Modal
         transparent
         visible={ visible }
         animationType='slide'
         onRequestClose={ onHide }>
         <View className='flex-1 relative bg-black-rgba'>
            <View className='absolute bottom-0 right-0 left-0 h-[30%] p-3 space-y-5'>
               <View className=' bg-slate-300 rounded-2xl'>
                  <ImageButton
                     border
                     title="Обрати фото"
                     handleFunc={ () => {} }
                  />
                  <ImageButton
                     title="Зробити фото"
                     handleFunc={ () => {} }
                  />
               </View>

               <TouchableOpacity 
                  onPress={ onHide }
                  activeOpacity={ 0.8 }
                  className='py-4 items-center rounded-xl bg-slate-200'>
                  <Text className=' text-2xl text-blue-600 font-sans-r'>
                     Скасувати
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
   )
}

export default ImagePicker;