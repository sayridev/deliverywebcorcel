import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/HomeScreen';
import {OrderScreen} from '../screens/OrderScreen';
import {ShoppingScreen} from '../screens/ShoppingScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ICategory} from '../interface/ICategory';

export type RootTabsParams = {
  HomeScreen: undefined;
  OrderScreen: undefined;
  ShoppingScreen: {
    category: ICategory;
  };
};
const Tab = createBottomTabNavigator<RootTabsParams>();
export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          title: 'Inicio',
          tabBarIcon: ({size, color}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="OrderScreen"
        options={{
          title: 'Mi Pedido',
          tabBarIcon: ({size, color}) => (
            <Icon name="shopping-cart" color={color} size={size} />
          ),
        }}
        component={OrderScreen}
      />
      <Tab.Screen
        name="ShoppingScreen"
        options={{
          title: 'Productos',
          tabBarIcon: ({size, color}) => (
            <Icon name="heart" color={color} size={size} />
          ),
        }}
        component={ShoppingScreen}
      />
    </Tab.Navigator>
  );
};
