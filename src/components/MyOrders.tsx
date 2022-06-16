import {doc, onSnapshot} from 'firebase/firestore';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  DefaultTheme,
  Text,
} from 'react-native-paper';
import {Collection} from '../context/firebase/FirebaseContext';
import {db} from '../firebase/firebase';
import {IOrder} from '../interface/IOrder';
import CountDown from 'react-native-countdown-component';
import {SnackBarContext} from '../context/snackBar/SnackBarContext';
import {TYPEALERT} from '../context/snackBar/SnackBarReducer';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {ModalSucess} from './ModalSucess';
interface Props {
  id: string;
}
export const MyOrders = ({id}: Props) => {
  const {openF} = useContext(SnackBarContext);
  const [order, setOrder] = useState<IOrder>();
  const [open, setOpen] = useState(false);
  const navigator = useNavigation<BottomTabNavigationProp<any>>();
  const docRef = doc(db, Collection.Orders, id);
  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, querySnapshot => {
      setOrder({
        ...(querySnapshot.data() as IOrder),
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const successOrder = () => {
    setOpen(true);
    openF('Tu pedido ha llegado!', 2000, TYPEALERT.SUCCESS);
  };
  if (order === undefined) {
    return <ActivityIndicator color="black" size={'large'} />;
  }
  return (
    <>
      {!order.delivered ? (
        <View style={styleMyOrder.content}>
          <Card theme={DefaultTheme} style={styleMyOrder.card}>
            <Card.Title
              theme={DefaultTheme}
              title={'Tu orden del: ' + order?.date}
              titleStyle={{fontWeight: 'bold', color: 'black'}}
              style={{backgroundColor: 'rgba(244,171,37,1)'}}
            />
            <Card.Content>
              <View style={styleMyOrder.body}>
                <View>
                  <Text style={styleMyOrder.titleTotal}>Total:</Text>
                  <Text style={styleMyOrder.total}>${order?.total}</Text>
                </View>
                <View>
                  {order!.time > 0 ? (
                    <View>
                      <Text style={styleMyOrder.time}>
                        Tu pedido llegara en:
                      </Text>
                      <CountDown
                        until={order!.time * 60}
                        size={20}
                        onFinish={() => successOrder()}
                      />
                    </View>
                  ) : (
                    <View>
                      <ActivityIndicator size={'large'} color="black" />
                      <Text style={{color: 'black'}}>
                        Estamos calculando el tiempo de entrega....
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Card.Content>
          </Card>
          <ModalSucess open={open} setOpen={setOpen} order={order} />
        </View>
      ) : (
        <View
          style={{
            alignContent: 'center',
            width: Dimensions.get('screen').width,
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/entrega.jpg')}
            style={{width: 80, height: 80}}
          />
          <Text style={{color: 'black'}}>Tu pedido se ha entregado</Text>
          <Button
            color="black"
            mode="contained"
            style={{height: 40}}
            onPress={() => navigator.navigate('ShoppingScreen')}>
            Quiero mas !
          </Button>
        </View>
      )}
    </>
  );
};

const styleMyOrder = StyleSheet.create({
  content: {
    width: Dimensions.get('screen').width - 50,
    marginTop: 5,
  },
  card: {
    backgroundColor: 'rgba(244,171,37,0.9)',
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTotal: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
  },
  total: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  time: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
