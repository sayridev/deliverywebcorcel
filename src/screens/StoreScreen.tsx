import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Dimensions, View} from 'react-native';
import {Button} from 'react-native-paper';
import {ModalSucess} from '../components/ModalSucess';
import {MyOrders} from '../components/MyOrders';
import {SnackBarAlert} from '../components/SnackBarAlert';
import {FirebaseContext} from '../context/firebase/FirebaseContext';

export const StoreScreen = () => {
  const {orders} = useContext(FirebaseContext);
  const navigator = useNavigation<BottomTabNavigationProp<any>>();
  return (
    <View style={{backgroundColor: 'white', alignItems: 'center'}}>
      <SnackBarAlert />
      {orders.length > 0 ? (
        orders.map(id => <MyOrders key={id} id={id} />)
      ) : (
        <View
          style={{
            display: 'flex',
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width - 100,
            justifyContent: 'center',
          }}>
          <Button
            color="black"
            mode="contained"
            style={{height: 40}}
            onPress={() => navigator.navigate('ShoppingScreen')}>
            Tengo hambre!
          </Button>
        </View>
      )}
    </View>
  );
};
