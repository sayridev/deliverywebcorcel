import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {DefaultTheme, Text} from 'react-native-paper';
import {IProduct} from '../interface/IProduct';

interface Props {
  product: IProduct;
}
export const CardItem = ({product}: Props) => {
  let total: number = 0;
  total = Math.round(product.price) + 3;
  return (
    <View style={sytleItem.container}>
      <View style={{padding: 20}}>
        <Image style={sytleItem.img} source={{uri: product.image!}} />
      </View>
      <View style={sytleItem.content}>
        <View>
          <Text theme={DefaultTheme} style={sytleItem.title}>
            {product.name}
          </Text>
          <Text theme={DefaultTheme} style={sytleItem.subtitle}>
            En descuento
          </Text>
        </View>
        <View style={sytleItem.prices}>
          <Text theme={DefaultTheme} style={sytleItem.price}>
            ${total}
          </Text>
          <Text theme={DefaultTheme} style={sytleItem.normal}>
            ${product.price}
          </Text>
        </View>
      </View>
    </View>
  );
};

const sytleItem = StyleSheet.create({
  img: {
    width: 120,
    height: 100,
    borderRadius: 10,
  },
  container: {
    display: 'flex',
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.24,
    elevation: 4,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.5,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 30,
    textDecorationLine: 'line-through',
    color: 'red',
  },
  normal: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: 220,
  },
  prices: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
