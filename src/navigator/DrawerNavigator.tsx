import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {styles} from '../theme/appTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Tabs} from './Tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StoreScreen} from '../screens/StoreScreen';
import {AuthContext} from '../context/auth/AuthContext';
import {FirebaseContext} from '../context/firebase/FirebaseContext';
import {ShoppingContext} from '../context/shopping/ShoppingContext';
const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const {order} = useContext(ShoppingContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerRight: () => (
          <View style={{marginRight: 20}}>
            {order.orders.length > 0 && (
              <Text style={styleDrawer.amount}>{order.orders.length}</Text>
            )}
            <Icon name="shopping-cart" color="black" size={30} />
          </View>
        ),
        drawerStyle: {backgroundColor: 'rgb(254,184,10)'},
        headerStyle: {backgroundColor: 'rgb(254,184,10)'},
      }}
      drawerContent={props => <MenuInterno {...props} />}>
      <Drawer.Screen
        name="TabsNavigator"
        options={{title: 'Compra lo que mas te guste!'}}
        component={Tabs}
      />
      <Drawer.Screen
        name="StoreScreen"
        options={{title: 'Seguir mi pedido'}}
        component={StoreScreen}
      />
    </Drawer.Navigator>
  );
};

const MenuInterno = ({navigation}: DrawerContentComponentProps) => {
  const {logout, photo} = useContext(AuthContext);
  const {clearMyOrder} = useContext(FirebaseContext);
  const {clearOrder} = useContext(ShoppingContext);
  const logoutSession = () => {
    clearMyOrder();
    clearOrder();
    logout();
  };
  return (
    <DrawerContentScrollView>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              photo !== null
                ? photo
                : 'https://cdn.pixabay.com/photo/2016/12/04/15/40/animated-1881895_960_720.jpg',
          }}
        />
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('TabsNavigator')}>
          <Text style={styles.menuText}>
            <Icon name="home" size={30} /> Inicio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('StoreScreen')}>
          <Text style={styles.menuText}>
            <Icon name="location-arrow" size={30} /> Ver Mi Pedido
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('OrderScreen')}>
          <Text style={styles.menuText}>
            <Icon name="shopping-cart" size={30} /> Mi Pedido
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => logoutSession()}>
          <Text style={styles.menuText}>
            <Icon name="sign-out" size={30} /> Salir
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styleDrawer = StyleSheet.create({
  amount: {
    backgroundColor: 'red',
    borderRadius: 100,
    padding: 5,
    textAlign: 'center',
    position: 'relative',
    fontWeight: 'bold',
    top: 12,
    zIndex: 2,
    right: 15,
  },
});
