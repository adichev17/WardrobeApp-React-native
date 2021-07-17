import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Button from '../../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThingWrapper from '../Wardrobe/Components/ThingWrapper';
import CategoryScrollView from './ComponentsDesignerPages/TitleCategoryScrollView';

const DATA = [
  {
    category: 'Верхняя одежда',
    uri: 'https://wardrobeapp.azurewebsites.net/Images/Thu Jul 08 2021 18:54:01 GMT+0300 (MSK).jpg',
    id: 1,
  },
  {
    category: 'Аксессуары',
    uri: 'https://wardrobeapp.azurewebsites.net/Images/Thu Jul 08 2021 18:51:53 GMT+0300 (MSK).jpg',
    id: 2,
  },
  {
    category: 'Шорты',
    uri: 'https://wardrobeapp.azurewebsites.net/Images/Fri Jul 09 2021 14:43:40 GMT+0300 (MSK).jpg',
    id: 3,
  },
  {
    category: 'Обувь',
    uri: 'https://wardrobeapp.azurewebsites.net/Images/Thu Jul 08 2021 18:51:53 GMT+0300 (MSK).jpg',
    id: 4,
  },
  {
    category: 'Толстовки и худи',
    uri: 'https://wardrobeapp.azurewebsites.net/Images/Thu Jul 08 2021 18:51:53 GMT+0300 (MSK).jpg',
    id: 5,
  },
  {
    category: 'Нижнее бельё',
    uri: 'https://wardrobeapp.azurewebsites.net/Images/Thu Jul 08 2021 18:51:53 GMT+0300 (MSK).jpg',
    id: 5,
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Image
      style={styles.tinyLogo}
      source={{
        uri: 'https://wardrobeapp.azurewebsites.net/Images/Thu Jul 08 2021 18:53:24 GMT+0300 (MSK).jpg',
        // cache: 'force-cache',
      }}
    />
  </View>
);

export default function DesiggerPage({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [nameActiveCategory, setNameActiveCategory] = useState('Все вещи');
  const [ListThing, setListThing] = useState(null);

  const [SortedListThing, setSortedListThing] = useState(null);

  const [listThingSRCArray, setListThingSRCArray] = useState(null);

  const ToListSRCArray = (data) => {
    let ListSRC = [];
    data.forEach((el) => {
      el.includeThings.forEach((el) => {
        ListSRC.push(el);
      });
    });
    return ListSRC;
  };

  const GetAllThings = () => {
    AsyncStorage.getItem('id', (err, result) => {
      if (result) {
        fetch(`https://wardrobeapp.azurewebsites.net/GetAllThings/${result}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data !== undefined) {
              setListThing(data);
              setIsLoading(false);
              setSortedListThing(data);

              setListThingSRCArray(ToListSRCArray(data));
            }
          });
      }
    });
  };
  useEffect(() => {
    GetAllThings();
  }, []);

  const renderItem = ({ item }) => <Item title={item.category} />;

  if (ListThing === null || SortedListThing === null) {
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          marginTop: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#00aa00"></ActivityIndicator>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      <SafeAreaView>
        <CategoryScrollView
          _ListThing={ListThing}
          _SortedListThing={SortedListThing}
          _listThingSRCArray={listThingSRCArray}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '60%',
    marginVertical: 20,
    // marginHorizontal: 30,
    // alignItems: 'center',
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
  },
  containerForTitleCategory: {
    width: '100%',
    marginHorizontal: '3%',
    height: '20%',
  },
  scrollViewForTitleCategory: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    marginVertical: 8,
    height: 130,
    width: '35%',
    marginHorizontal: 16,
  },
  tinyLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
