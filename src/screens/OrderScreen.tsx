import React, {useContext, useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {CardProductCart} from '../components/CardProductCart';
import {SnackBarAlert} from '../components/SnackBarAlert';
import {ShoppingContext} from '../context/shopping/ShoppingContext';
import {styles} from '../theme/appTheme';
import {ModalStore} from '../components/ModalStore';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
export const OrderScreen = () => {
  const {order} = useContext(ShoppingContext);
  const [open, setOpen] = useState(false);
  const navigator = useNavigation<BottomTabNavigationProp<any>>();
  return (
    <View style={[styles.globalMargin, styles.container]}>
      <SnackBarAlert />
      {order.orders.length > 0 ? (
        <>
          <View style={styleShopping.contentSummary}>
            <Text style={styleShopping.summary}>Resumen del Pedido</Text>
          </View>
          <ScrollView style={{zIndex: -1}}>
            <View style={styleShopping.contentCard}>
              {order.orders.length !== 0 &&
                order.orders.map(detail => (
                  <CardProductCart
                    product={detail.product!}
                    amountp={detail.amount!}
                    total={detail.total!}
                    key={detail.product?.id}
                  />
                ))}
            </View>
          </ScrollView>
          <View style={{marginBottom: 50}}>
            <Text style={styleShopping.total}>
              {' '}
              Total: ${order.total.toFixed(2)}
            </Text>
          </View>
          <View style={styleShopping.order}>
            <Button
              mode="contained"
              color="black"
              style={{
                height: 50,
                alignItems: 'center',
              }}
              onPress={() => setOpen(true)}>
              <Text> Ordenar Pedido</Text>
            </Button>
          </View>
        </>
      ) : (
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/carrito.jpg')}
            style={{width: 250, height: 250}}
          />
          <Button
            color="black"
            mode="contained"
            style={{height: 40}}
            onPress={() => navigator.navigate('ShoppingScreen')}>
            Tengo hambre!
          </Button>
        </View>
      )}
      <ModalStore open={open} setOpen={setOpen} />
    </View>
  );
};

const styleShopping = StyleSheet.create({
  containerTitle: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
  },
  contentCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 100,
    marginBottom: 10,
  },
  order: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('screen').width - 40,
    marginHorizontal: 20,
  },
  summary: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  contentSummary: {
    alignItems: 'center',
    backgroundColor: 'rgba(244,171,37,0.98)',
    paddingBottom: 50,
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
    position: 'absolute',
    width: Dimensions.get('screen').width - 40,
    marginHorizontal: 20,
  },
  total: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    borderRadius: 5,
  },
});
