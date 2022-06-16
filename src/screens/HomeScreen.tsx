import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Colors,
  DefaultTheme,
  Text,
} from 'react-native-paper';
import {ICategory} from '../interface/ICategory';
import {RootStackParams} from '../navigator/StackNavigator';
import {styles} from '../theme/appTheme';
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import {db} from '../firebase/firebase';
import {CardList} from '../components/CardList';
import {FlatList, ScrollView, View} from 'react-native';
import {CardItem} from '../components/CardItem';
import {IProduct} from '../interface/IProduct';
import {CardLocation} from '../components/CardLocation';
import {IStore} from '../interface/IStore';
import {Collection} from '../context/firebase/FirebaseContext';

interface Props extends StackScreenProps<RootStackParams, 'DrawerNavigator'> {}
export const HomeScreen = ({navigation, route}: Props) => {
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => <Button title="Carrito" />,
  //   });
  // }, []);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [stores, setStores] = useState<IStore[]>([]);
  const [category, setCategory] = useState<ICategory>({} as ICategory);
  const itemsCollection = collection(db, Collection.Categories);
  const itemsCollectionProduct = collection(db, Collection.Products);
  const itemsCollectionStore = collection(db, Collection.Stores);

  useEffect(() => {
    const getCategories = async () => {
      const result = await getDocs(query(itemsCollection));
      setCategories(
        result.docs.map(doc => {
          return {...(doc.data() as ICategory), id: doc.id};
        }),
      );
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const result = await getDocs(query(itemsCollectionProduct, limit(3)));
      setProducts(
        result.docs.map(doc => {
          return {...(doc.data() as IProduct), id: doc.id};
        }),
      );
    };
    getProducts();
  }, []);
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

  if (categories.length === 0 && products.length === 0) {
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
    <ScrollView style={[styles.globalMargin, styles.container]}>
      <View>
        <Text theme={DefaultTheme} style={styles.titleH1}>
          Categorias
        </Text>
        <FlatList
          data={categories}
          keyExtractor={item => item.id!.toString()}
          renderItem={({item}) => (
            <CardList setCategory={setCategory} category={item} />
          )}
          horizontal={true}
        />
      </View>
      <View>
        <Text theme={DefaultTheme} style={styles.titleH1}>
          Mas Populares
        </Text>

        <FlatList
          data={products}
          keyExtractor={item => item.id!.toString()}
          renderItem={({item}) => <CardItem product={item} />}
        />
      </View>
      <View>
        <Text theme={DefaultTheme} style={styles.titleH1}>
          Encuentranos en
        </Text>

        <FlatList
          data={stores}
          keyExtractor={item => item.id!.toString()}
          renderItem={({item}) => <CardLocation store={item} />}
        />
      </View>
    </ScrollView>
  );
};
