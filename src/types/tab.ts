import { RefObject } from "react";

import { TouchableOpacity } from "react-native";

interface Tab {
   title:  string;
   ref:    RefObject<TouchableOpacity>;
}

export { Tab };