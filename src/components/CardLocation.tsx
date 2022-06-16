import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DefaultTheme, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IStore} from '../interface/IStore';
interface Props {
  store: IStore;
}
export const CardLocation = ({store}: Props) => {
  return (
    <View style={style.container}>
      <View>
        <Text theme={DefaultTheme} style={style.title}>
          {store.name}
        </Text>
      </View>
      <View style={{display: 'flex', width: 150}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Icon
            name="location-arrow"
            style={{opacity: 0.5, marginRight: 10}}
            color={'black'}
            size={16}
          />
          <Text theme={DefaultTheme} style={style.address}>
            {store.address}
          </Text>
        </View>
        <Text theme={DefaultTheme}>{store.phone}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  address: {
    fontSize: 14,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
