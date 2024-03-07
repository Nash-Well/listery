import { FC } from "react";

import { 
   Modal, 
   Dimensions, 
   StyleSheet,
   TouchableOpacity 
} from "react-native";
import { 
   Calendar, 
   LocaleConfig 
} from 'react-native-calendars';

import { COLORS } from "@/constants";

LocaleConfig.locales['us'] = {
   monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ],

   today: "Today",
   dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
   dayNames:  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
   monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const { width } = Dimensions.get('window');

type Props = {
   modal:            boolean;
   handleModal:      () => void;
   handleDateChange: (date: string) => void;
};

const DateModal: FC<Props> = ({ modal, handleModal, handleDateChange }) => {
   return (
      <Modal
         transparent
         visible={ modal }
         animationType="fade"
         onRequestClose={ handleModal }>
         <TouchableOpacity 
            activeOpacity={ 1 }
            onPress={ handleModal }
            className="flex-1 items-center justify-center bg-black-rgba">
            <Calendar
               hideExtraDays
               style={ styles.calendar }
               minDate={ new Date().toDateString() }
               onDayPress={ day => handleDateChange(day.dateString) }

               theme={{
                  textDayFontSize: 16,
                  textMonthFontSize: 18,
                  arrowColor: COLORS.pumpkin,
                  todayTextColor: COLORS.pumpkin,
               }}
            />
         </TouchableOpacity>
      </Modal>
   )
}

export default DateModal;

const styles = StyleSheet.create({
   calendar: {
      padding: 5,
      borderRadius: 15,
      width: width * 0.8,
      backgroundColor: 'white',
   },
})