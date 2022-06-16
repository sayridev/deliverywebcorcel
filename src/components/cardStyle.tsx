import {StyleSheet} from 'react-native';

export const cardStyles = StyleSheet.create({
  imgCategory: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.24,
    shadowRadius: 7,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
