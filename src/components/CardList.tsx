import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DefaultTheme, Text} from 'react-native-paper';
import {ICategory} from '../interface/ICategory';
import {cardStyles} from './cardStyle';
interface Props {
  category: ICategory;
  setCategory: React.Dispatch<React.SetStateAction<ICategory>>;
}
export const CardList = ({setCategory, category}: Props) => {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();
  const navigate = () => {
    setCategory(category);
    navigation.navigate('ShoppingScreen', {category});
  };
  return (
    <TouchableOpacity onPress={() => navigate()}>
      <View
        style={{
          alignItems: 'center',
          marginHorizontal: 20,
          height: 115,
        }}>
        <View style={cardStyles.shadow}>
          <Image
            source={{uri: category.image!}}
            style={cardStyles.imgCategory}
          />
        </View>
        <Text theme={DefaultTheme} style={cardStyles.title}>
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
