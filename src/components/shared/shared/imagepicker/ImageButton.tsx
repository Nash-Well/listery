import { FC } from "react";

import { 
   Text, 
   TouchableOpacity 
} from "react-native";

type Props = {
   title:      string;
   border?:    boolean;
   handleFunc: () => void;
};

const ImageButton: FC<Props> = ({ title, border, handleFunc }) => {
   return (
      <TouchableOpacity 
         onPress={ handleFunc }
         className={`py-4 items-center ${ border && 'border-b border-b-gray-500' }`}>
         <Text className='text-xl text-blue-600 font-sans-r'>
            { title }
         </Text>
      </TouchableOpacity>
   )
}

export default ImageButton;