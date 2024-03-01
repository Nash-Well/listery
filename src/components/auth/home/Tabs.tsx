import { 
   FC, 
   useRef, 
   useState, 
   createRef, 
   RefObject, 
   useLayoutEffect, 
} from "react";

import { 
   View, 
   Text, 
   Animated, 
   TouchableOpacity, 
} from "react-native";

import { Indicator } from "@/components/shared/shared";

import { Measure } from "@/types";

type Props = {
   scrollX: Animated.Value;
   handleTabChange: (idx: number) => void;
};

type TabsData = {
   title: string;
   ref: RefObject<TouchableOpacity>;
};

const tabs: TabsData[] = [
   { 
      title: 'Списки', 
      ref: createRef<TouchableOpacity>() 
   },
   { 
      title: 'Бажання', 
      ref: createRef<TouchableOpacity>() 
   }
];

const Tabs: FC<Props> = ({ scrollX, handleTabChange }) => {
   const tabsContainer = useRef<View>(null);

   const [loading, setLoading] = useState(true);
   const [measures, setMeasures] = useState<Measure[]>([]);

   useLayoutEffect(() => {
      const mrs: Measure[] = [];
      const promises: Promise<void>[] = [];

      tabs.forEach(tab => {
         promises.push(new Promise<void>((resolve) => {
            if (tabsContainer.current && tab.ref.current) {
               tab.ref.current.measureLayout(
                  tabsContainer.current,
                  (x, y, width, height) => {
                     mrs.push({
                        x: x,
                        y: y,
                        width: width,
                        height: height,
                     });

                     if (mrs.length === tabs.length) {
                        setMeasures(mrs);
                        setLoading(false);
                        resolve();
                     }
                  }
               );
            }
         }));
      });

      Promise.all(promises).then(() => setLoading(false));
   }, [ tabsContainer.current ]);

   return (
      <View className='-top-3 h-16 rounded-t-2xl bg-gray-200'>
         <View
            ref={ tabsContainer }
            className='flex-1 flex-row items-center justify-around'>
            {
               tabs.map((tab, idx) => (
                  <TouchableOpacity
                     key={ idx }
                     ref={ tab.ref }
                     activeOpacity={ 0.5 }
                     className='w-1/2 items-center pb-2'
                     onPress={() => handleTabChange(idx)}>
                     <Text className='font-sans-sm text-xl'>
                        { tab.title }
                     </Text>
                  </TouchableOpacity>
               ))
            }

            {
               !loading && measures.length > 0 &&
                  <Indicator
                     scrollX={ scrollX }
                     measures={ measures }
                  />
            }
         </View>
      </View>
   );
};

export default Tabs;