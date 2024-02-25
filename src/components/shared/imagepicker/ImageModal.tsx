import { FC } from "react";

import {
   Text,
   View,
   Modal,
   TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { ImageButton } from '../shared';

type Props = {
   visible:       boolean;
   onHide:        () => void;
   uploadImage:   (uri: string) => void;
};

const ImageModal: FC<Props> = ({ visible, onHide, uploadImage }) => {
   const handleImageUpload = async () => {
      onHide();
      
      try {
         let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
         });
   
         !res.canceled && uploadImage(res.assets[0].uri);
      } catch(err) {
         console.log(err); // FIXME
      }
   };
   
   const handleCameraImage = async () => {
      onHide();
      
      try {
         await ImagePicker.requestCameraPermissionsAsync();

         let res = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.front,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
         });
   
         !res.canceled && uploadImage(res.assets[0].uri);
      } catch(err) {
         console.log(err); // FIXME
      }
   }

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
                     handleFunc={ handleImageUpload }
                  />
                  <ImageButton
                     title="Зробити фото"
                     handleFunc={ handleCameraImage }
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

export default ImageModal;