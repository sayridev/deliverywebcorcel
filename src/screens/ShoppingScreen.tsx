import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {collection, getDocs, query, where} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Colors, DefaultTheme, Text} from 'react-native-paper';
import {CardList} from '../components/CardList';
import {CardProduct} from '../components/CardProduct';
import {SnackBarAlert} from '../components/SnackBarAlert';
import {Collection} from '../context/firebase/FirebaseContext';
import {db} from '../firebase/firebase';
import {ICategory} from '../interface/ICategory';
import {IProduct} from '../interface/IProduct';
import {RootTabsParams} from '../navigator/Tabs';
import {styles} from '../theme/appTheme';

interface Props
  extends BottomTabScreenProps<RootTabsParams, 'ShoppingScreen'> {}
export const ShoppingScreen = ({route}: Props) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const itemsCollection = collection(db, Collection.Categories);
  const itemsCollectionProduct = collection(db, Collection.Products);
  const [category, setCategory] = useState<ICategory>({id: ''} as ICategory);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (route.params !== undefined) {
      setCategory(route.params.category);
    } else {
      setCategory({id: ''} as ICategory);
    }
  }, [route]);

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
  let q = query(itemsCollectionProduct, where('category', '==', category.id!));
  useEffect(() => {
    const getProducts = async () => {
      if (category.id === '') {
        q = query(itemsCollectionProduct);
      }
      const result = await getDocs(q);
      setProducts(
        result.docs.map(doc => {
          return {...(doc.data() as IProduct), id: doc.id};
        }),
      );
    };
    getProducts();
  }, [category]);

  const onRefreshing = () => {
    setRefresh(true);
    setCategory({id: ''} as ICategory);
    setRefresh(false);
  };
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
    <View style={[styles.globalMargin, styles.container]}>
      <SnackBarAlert />
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
      <View style={styleShopping.containerTitle}>
        <Text style={styleShopping.title}>
          {category.id === '' ? 'Platos' : category.name}
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefreshing} />
        }>
        <View style={styleShopping.contentCard}>
          {products.length !== 0 &&
            products.map(product => (
              <CardProduct product={product} key={product.id!} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styleShopping = StyleSheet.create({
  containerTitle: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
  },
  contentCard: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
