import { FC } from "react";

import { 
   View,
   Modal,
   SafeAreaView,
} from "react-native";
import EmojiSelector from "react-native-emoji-selector";

type Props = {
   modal:               boolean;
   handleModal:         () => void;
   handleEmojiChange:   (emoji: string) => void;
};

const EmojiModal: FC<Props> = ({ modal, handleModal, handleEmojiChange }) => {
   return (
      <Modal
            transparent
            visible={ modal }
            animationType='slide'
            onRequestClose={ handleModal }>
            <View className='flex-1 bg-black-rgba'>
               <SafeAreaView className='flex-1 py-5'>
                  <EmojiSelector
                     columns={ 8 }
                     showSearchBar={ false }
                     showSectionTitles={ false }
                     onEmojiSelected={ handleEmojiChange }
                  />
               </SafeAreaView>
            </View>
         </Modal>
   )
}

export default EmojiModal;