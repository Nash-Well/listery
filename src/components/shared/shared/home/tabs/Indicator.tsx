import { FC } from "react";

import { 
   Animated,
   Dimensions,
} from "react-native";

import { Measure } from "@/types";

type Props = {
   measures: Measure[];
   scrollX:  Animated.Value;
};

const { width } = Dimensions.get('window');

const Indicator: FC<Props> = ({ scrollX, measures }) => {
   if(measures.length < 2) {
      return null;
   }
   const inputRange =  measures.map((_, idx) => idx * width);
   
   const interpolateWidth = scrollX.interpolate({
      inputRange,
      outputRange: measures.map(m => m.width),
   });

   const interpolateX = scrollX.interpolate({
      inputRange,
      outputRange: measures.map(m => m.x),
   });

   return (
      <Animated.View
         style={{
            left:  interpolateX,
            width: interpolateWidth,
         }}
         className='absolute -bottom-[-8] h-[2] bg-black'
      />
   )
}

export default Indicator;