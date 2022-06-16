import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, DefaultTheme, Paragraph, Text} from 'react-native-paper';
import {ShoppingContext} from '../context/shopping/ShoppingContext';
import {SnackBarContext} from '../context/snackBar/SnackBarContext';
import {TYPEALERT} from '../context/snackBar/SnackBarReducer';
import {IProduct} from '../interface/IProduct';
interface Props {
  product: IProduct;
}
export const CardProduct = ({product}: Props) => {
  const [amount, setAmount] = useState<number>(1);
  const {addProduct, order} = useContext(ShoppingContext);
  const {openF} = useContext(SnackBarContext);
  const increment = () => {
    let newValue = Math.min(amount + 1, 10);
    setAmount(newValue);
  };
  const decrement = () => {
    let newValue = Math.max(amount - 1, 1);
    setAmount(newValue);
  };

  const addProductInCar = () => {
    let existe = false;
    order.orders.length > 0 &&
      order.orders.map(detail => {
        if (detail.product?.id === product.id) {
          existe = true;
        }
      });

    if (existe)
      return openF('El producto ya se agrego!', 2000, TYPEALERT.DANGER);
    addProduct(product, amount);
    return openF(
      'El producto se agrego correctamente!',
      2000,
      TYPEALERT.SUCCESS,
    );
  };
  return (
    <Card
      theme={DefaultTheme}
      key={product.id!}
      style={[styleCard.card, {width: 185}]}>
      <Card.Title
        theme={DefaultTheme}
        titleStyle={{
          fontSize: 16,
          color: 'black',
          fontWeight: 'bold',
        }}
        title={product.name}
      />

      <Card.Cover
        source={{uri: product.image!}}
        style={{width: 185, height: 100}}
      />
      <Card.Content>
        <Paragraph style={{color: 'black'}}>{product.description}</Paragraph>
        <Text style={styleCard.price}>${product.price}</Text>
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
          color="black"
          style={{marginLeft: 15}}
          onPress={() => addProductInCar()}>
          Añadir
        </Button>
      </Card.Actions>
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
    fontSize: 20,
    backgroundColor: '#22bb33',
    padding: 2,
    borderRadius: 5,
    position: 'absolute',
    fontWeight: 'bold',
    right: 0,
  },
});
