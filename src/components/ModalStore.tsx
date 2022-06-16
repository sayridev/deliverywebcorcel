import {collection, getDocs, query, where} from 'firebase/firestore';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Button,
  Colors,
  DefaultTheme,
  Modal,
  Portal,
  Provider,
  Text,
  TextInput,
} from 'react-native-paper';
import {AuthContext} from '../context/auth/AuthContext';
import {Collection, FirebaseContext} from '../context/firebase/FirebaseContext';
import {ShoppingContext} from '../context/shopping/ShoppingContext';
import {SnackBarContext} from '../context/snackBar/SnackBarContext';
import {TYPEALERT} from '../context/snackBar/SnackBarReducer';
import {db} from '../firebase/firebase';
import {IStore} from '../interface/IStore';
import {styles} from '../theme/appTheme';
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ModalStore = ({open, setOpen}: Props) => {
  const itemsCollectionStore = collection(db, Collection.Stores);
  const [stores, setStores] = useState<IStore[]>([]);
  const [store, setStore] = useState('');
  const [address, setAddress] = useState('');
  const {openF} = useContext(SnackBarContext);
  const {order, updateOrder, clearOrder} = useContext(ShoppingContext);
  const {createCollection} = useContext(FirebaseContext);
  const [show, setShow] = useState(true);
  const {userApp} = useContext(AuthContext);
  const [send, setSend] = useState(false);

  useEffect(() => {
    const getStores = async () => {
      const result = await getDocs(
        query(itemsCollectionStore, where('name', '!=', 'MASTER')),
      );
      setStores(
        result.docs.map(doc => {
          return {...(doc.data() as IStore), id: doc.id};
        }),
      );
    };
    getStores();
  }, []);

  const sendOrder = () => {
    if (address === '' || store === '') {
      return openF('Todos los campos son obligatorios', 2000, TYPEALERT.DANGER);
    }
    updateOrder(userApp!, store, address);
    setShow(false);
  };
  const sendOrderFirebase = async () => {
    setSend(true);
    await createCollection(Collection.Orders, order);
    clearOrder();
    openF('El pedido se realizo correctamente!', 2000, TYPEALERT.SUCCESS);
    setSend(false);
    setOpen(false);
    setShow(true);
  };
  if (send) {
    return (
      <ActivityIndicator
        animating={true}
        color={Colors.purple600}
        style={{flex: 1}}
        size="large"
      />
    );
  }

  return (
    <Provider>
      <Portal>
        <Modal
          visible={open}
          onDismiss={() => setOpen(false)}
          contentContainerStyle={styleModal.container}>
          <TextInput
            label="Dirección de envio"
            mode="flat"
            theme={DefaultTheme}
            underlineColorAndroid="black"
            activeUnderlineColor="black"
            style={styles.input}
            onChangeText={value => setAddress(value)}
          />
          <Text theme={DefaultTheme}>Eliga la tienda</Text>
          {stores.length > 0 &&
            stores.map(storeM => (
              <TouchableOpacity
                key={storeM.id}
                style={{
                  borderColor: storeM.id === store ? '#22bb33' : '#E4E2DE',
                  borderStyle: 'solid',
                  backgroundColor:
                    storeM.id === store ? '#22bb33' : 'transparent',
                  borderWidth: 1,
                  marginVertical: 3,
                  borderRadius: 5,
                  padding: 5,
                  paddingVertical: 10,
                  alignItems: 'center',
                }}
                onPress={() => setStore(storeM.id!)}>
                <View>
                  <Text theme={DefaultTheme}>{storeM.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          {show ? (
            <Button
              style={{marginTop: 20}}
              mode="contained"
              color="black"
              onPress={() => sendOrder()}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>ACEPTAR</Text>
            </Button>
          ) : (
            <Button
              style={{marginTop: 20}}
              mode="contained"
              color="black"
              onPress={() => sendOrderFirebase()}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>ENVIAR</Text>
            </Button>
          )}
        </Modal>
      </Portal>
    </Provider>
  );
};

const styleModal = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
  },
});
