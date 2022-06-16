import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {
  Button,
  Colors,
  DefaultTheme,
  IconButton,
  Modal,
  Portal,
  Provider,
  Text,
  TextInput,
} from 'react-native-paper';
import {AuthContext} from '../context/auth/AuthContext';
import {Collection, FirebaseContext} from '../context/firebase/FirebaseContext';
import {SnackBarContext} from '../context/snackBar/SnackBarContext';
import {TYPEALERT} from '../context/snackBar/SnackBarReducer';
import {db} from '../firebase/firebase';
import {IOrder} from '../interface/IOrder';
import {IReview} from '../interface/IReview';
import {IUserApp} from '../interface/IUserApp';
import {styles} from '../theme/appTheme';
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  order: IOrder;
}
export const ModalSucess = ({order, open, setOpen}: Props) => {
  const [review, setReview] = useState('');
  const [show, setShow] = useState(false);
  const {openF} = useContext(SnackBarContext);
  const {userApp} = useContext(AuthContext);
  const {createCollection} = useContext(FirebaseContext);
  const [delivery, setDelivery] = useState<IUserApp>();
  useEffect(() => {
    const getName = async () => {
      if (order.delivery !== '') {
        await getNameDelivery();
      }
    };
    getName();
  }, [order]);
  const sendReview = async () => {
    if (review.trim() === '') {
      openF('El campo es obligatorio!', 1000, TYPEALERT.ERROR);
    }
    let reviewDoc: IReview = {
      review: review,
      user: userApp as IUserApp,
    };
    await createCollection(Collection.Reviews, reviewDoc);
    setOpen(false);
    openF('Lamentamos los inconvenientes!', 1000, TYPEALERT.SUCCESS);
  };
  const close = () => {
    setShow(false);
    setOpen(false);
    openF('Me alegra que te sientas bien!', 1500, TYPEALERT.SUCCESS);
  };
  const getNameDelivery = async () => {
    const docRef = doc(db, 'users', order.delivery);
    const docSnap = await getDoc(docRef);
    let user = docSnap.data() as IUserApp;
    setDelivery(user);
  };
  return (
    <Provider>
      <Portal>
        <Modal
          visible={open}
          onDismiss={() => setOpen(false)}
          contentContainerStyle={styleModal.container}>
          <Text theme={DefaultTheme} style={styleModal.title}>
            ¿Como estuvo tu entrega con {delivery?.name}?
          </Text>
          <View
            style={{
              display: 'flex',
              paddingTop: 20,
              paddingBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <IconButton
              icon="heart"
              color="#393939"
              style={{backgroundColor: Colors.purple300}}
              size={30}
              onPress={() => close()}
            />
            <IconButton
              icon="heart-broken"
              color="#393939"
              style={{backgroundColor: Colors.purple300}}
              size={30}
              onPress={() => setShow(true)}
            />
          </View>
          {show && (
            <>
              <TextInput
                label="Envianos tu reseña"
                mode="flat"
                theme={DefaultTheme}
                underlineColorAndroid="black"
                activeUnderlineColor="black"
                style={styles.input}
                onChangeText={value => setReview(value)}
              />

              <Button
                style={{marginTop: 20}}
                mode="contained"
                color="black"
                onPress={() => sendReview()}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  ENVIAR COMENTARIO
                </Text>
              </Button>
            </>
          )}
        </Modal>
      </Portal>
    </Provider>
  );
};

const styleModal = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 225,
    padding: 20,
    marginHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
});
