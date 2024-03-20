import { 
   View,
   Text,
   TouchableOpacity,
} from "react-native";

type Props = {
   containerStyle?:  string;
   handleEdit:       () => void;
   handleDelete:     () => void;
};

const RightAction = ({ containerStyle, handleEdit, handleDelete }: Props) => {
   return (
      <View className={ `${containerStyle} flex-row` }>
         <TouchableOpacity 
            activeOpacity={ 0.6 }
            onPress={ handleEdit }
            className="w-32 rounded-l-xl items-center justify-center bg-orange-400">
            <Text className="text-white text-lg font-sans-sm">
               Редагувати
            </Text>
         </TouchableOpacity>

         <TouchableOpacity 
            activeOpacity={ 0.6 }
            onPress={ handleDelete }
            className="w-32 rounded-r-xl items-center justify-center bg-red-500">
            <Text className="text-white text-lg font-sans-sm">
               Видалити
            </Text>
         </TouchableOpacity>
      </View>
   )
}

export default RightAction;