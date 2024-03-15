import { FC, useState } from "react";

import { TextInput } from "react-native";

type Props = {
   value:         string;
   placeholder:   string;
   setValue:      (text: string) => void;
};

const ExpandInput: FC<Props> = ({ value, placeholder, setValue }) => {
   const [ height, setHeight ] = useState(50);

   return (
      <TextInput
         editable
         multiline
         value={ value }
         maxLength={ 150 }
         numberOfLines={ 2 }
         autoCapitalize="none"
         autoCorrect={ false }
         onChangeText={ setValue }
         style={{ height: height }}
         placeholder={ placeholder }
         className='flex-1 ml-2 text-lg text-gray-800 font-sans-sm'
         onContentSizeChange={ (e) => setHeight(e.nativeEvent.contentSize.height) }
      />
   )
}

export default ExpandInput;