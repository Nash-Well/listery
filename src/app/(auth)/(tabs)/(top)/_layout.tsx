import { withLayoutContext } from "expo-router";

import { 
   createMaterialTopTabNavigator,
   MaterialTopTabNavigationOptions,
   MaterialTopTabNavigationEventMap
} from "@react-navigation/material-top-tabs";
import { 
   ParamListBase, 
   TabNavigationState 
} from "@react-navigation/native";

import { StyleSheet } from "react-native";

const { Navigator } = createMaterialTopTabNavigator();

export const MatirialTopTabs = withLayoutContext<
   MaterialTopTabNavigationOptions,
   typeof Navigator,
   TabNavigationState<ParamListBase>,
   MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
   return (
      <MatirialTopTabs
         initialRouteName="accounts"
         screenOptions={{
            tabBarBounces: false,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIndicatorStyle: styles.tabIndicator,
            tabBarStyle: styles.tabBar,
         }}>
         <MatirialTopTabs.Screen
            name="accounts"
            options={{
               title: 'Акаунти'
            }}
         />

         <MatirialTopTabs.Screen
            name="wishes"
            options={{
               title: 'Бажання'
            }}
         />
      </MatirialTopTabs>
   )
}

export default Layout;

const styles = StyleSheet.create({
   tabLabel: {
      fontSize: 16,
      textTransform: 'capitalize',
      fontFamily: 'open-sans-semibold',
   },
   tabIndicator: { backgroundColor: 'black' },
   tabBar: {
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
   }
});