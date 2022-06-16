import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Colors, DefaultTheme, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {ShoppingContext} from '../context/shopping/ShoppingContext';
import {SnackBarContext} from '../context/snackBar/SnackBarContext';
import {IProduct} from '../interface/IProduct';
interface Props {
  product: IProduct;
  amountp: number;
  total: number;
}
export const CardProductCart = ({product, amountp, total}: Props) => {
  const [amount, setAmount] = useState<number>(amountp);
  const {deleteProduct, order, updateProduct} = useContext(ShoppingContext);
  const {openF} = useContext(SnackBarContext);
  const increment = () => {
    let newValue = Math.min(amount + 1, 10);
    updateProduct(product.id!, newValue);
    setAmount(newValue);
  };
  const decrement = () => {
    let newValue = Math.max(amount - 1, 1);
    updateProduct(product.id!, newValue);
    setAmount(newValue);
  };

  const deleteProductCart = () => {
    deleteProduct(product.id!);
  };
  return (
    <Card theme={DefaultTheme} key={product.id!} style={[styleCard.card]}>
      <Card.Title
        theme={DefaultTheme}
        titleStyle={{
          fontSize: 16,
          color: 'black',
          fontWeight: 'bold',
        }}
        style={{backgroundColor: 'rgba(195, 134, 22,0.6)'}}
        title={product.name}
      />
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Card.Cover
          source={{uri: product.image!}}
          style={{width: 100, height: 100, borderRadius: 5}}
        />
        <View>
          <Card.Content>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 260,
              }}>
              <View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={styleCard.title}>Precio:</Text>
                  <Text style={styleCard.price}>${product.price}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={styleCard.title}>Cantidad:</Text>
                  <Text style={styleCard.price}>{amountp}</Text>
                </View>
              </View>
              <View>
                <Text style={styleCard.title}>Total</Text>
                <Text style={[styleCard.price, {fontSize: 25}]}>$ {total}</Text>
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="outlined"
              style={styleCard.buttonRest}
              color="black"
              onPress={() => decrement()}>
              <Text theme={DefaultTheme} style={styleCard.txtButton}>
                -
              </Text>
            </Button>
            <Text style={styleCard.titleAmount}>{amount}</Text>
            <Button
              mode="outlined"
              style={styleCard.buttonAdd}
              color="black"
              onPress={() => increment()}>
              <Text theme={DefaultTheme} style={styleCard.txtButton}>
                +
              </Text>
            </Button>

            <Button
              mode="contained"
              color={Colors.red400}
              style={{marginLeft: 60}}
              onPress={() => deleteProductCart()}>
              <Icon name="delete" size={20} />
              <Text style={{fontWeight: 'bold', color: 'black'}}>Eliminar</Text>
            </Button>
          </Card.Actions>
        </View>
      </View>
    </Card>
  );
};
const styleCard = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(244,171,37,1)',
    marginBottom: 20,
  },
  titleAmount: {
    paddingVertical: 13,
    paddingHorizontal: 14,
    color: 'black',
    backgroundColor: 'white',
  },
  buttonRest: {
    width: 30,
    padding: 0,
    borderColor: 'black',
    borderWidth: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonAdd: {
    width: 30,
    padding: 0,
    borderColor: 'black',
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  txtButton: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  price: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    width: 70,
  },
});
