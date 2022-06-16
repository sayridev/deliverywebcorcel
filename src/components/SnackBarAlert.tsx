import React, {useContext} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Snackbar, Text} from 'react-native-paper';
import {SnackBarContext} from '../context/snackBar/SnackBarContext';
import {GetColor} from './ColorAlert';

export const SnackBarAlert = () => {
  const {open, message, closeF, duration, typeAlert} =
    useContext(SnackBarContext);
  let color = GetColor(typeAlert);
  return (
    <Snackbar
      visible={open}
      style={{...styleSnackBar.snack, backgroundColor: color}}
      duration={duration}
      onDismiss={() => closeF()}
      action={{
        label: 'X',
        labelStyle: {color: 'white', fontSize: 20, fontWeight: 'bold'},
        onPress: () => {
          closeF();
        },
      }}>
      <Text style={styleSnackBar.message}>{message}</Text>
    </Snackbar>
  );
};

const styleSnackBar = StyleSheet.create({
  snack: {
    zIndex: 2,
    opacity: 0.95,
    width: Dimensions.get('screen').width - 20,
    position: 'relative',
  },
  message: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
