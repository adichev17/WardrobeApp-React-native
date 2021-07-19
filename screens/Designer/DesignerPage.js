import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryScrollView from './ComponentsDesignerPages/TitleCategoryScrollView';

import FlatListGridFor3Items from './ComponentsDesignerPages/GridThing/FlatListGridFor3Items';
import FlatListGridFor4Items from './ComponentsDesignerPages/GridThing/FlatListGridFor4Items';
import FlatListGridForMore4Items from './ComponentsDesignerPages/GridThing/FlatListGridForMore4Items';

const Item = ({ uri }) => (
  <View style={styles.item}>
    <Image
      style={styles.tinyLogo}
      source={{
        uri: uri,
        // cache: 'force-cache',
      }}
    />
  </View>
);

export default function DesiggerPage({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [ListThing, setListThing] = useState(null);

  const [SortedListThing, setSortedListThing] = useState(null);

  const [listThingSRCArray, setListThingSRCArray] = useState(null);

  const [ThingsInConstructor, setThingsInConstructor] = useState(null);

  const [Data, setData] = useState(null);

  const ToListSRCArray = (data) => {
    let ListSRC = [];
    data.forEach((el) => {
      el.includeThings.forEach((el) => {
        ListSRC.push(el);
      });
    });
    return ListSRC;
  };

  useEffect(() => {
    if (Data !== null && ThingsInConstructor !== null) {
      let NewData = Data.slice();
      let i = NewData.indexOf(ThingsInConstructor);
      if (i === -1) {
        NewData.push(ThingsInConstructor);
        setData(NewData);
      } else {
        let UpdArray = NewData.splice(i, 1);
        setData(NewData);
      }
    } else if (ThingsInConstructor !== null && Data === null) {
      let ThingArray = [];
      ThingArray.push(ThingsInConstructor);
      setData(ThingArray);
    }
  }, [ThingsInConstructor]);

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

  const renderItem = ({ item }) => <Item uri={item} />;

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
      {Data === null || Data.length > 4 ? (
        <View style={styles.container}>
          <FlatListGridForMore4Items Data={Data} />
        </View>
      ) : Data.length <= 3 ? (
        <View style={styles.container}>
          <FlatListGridFor3Items Data={Data} />
        </View>
      ) : Data.length === 4 ? (
        <View style={styles.container}>
          <FlatListGridFor4Items Data={Data} />
        </View>
      ) : (
        <Text>Начните добавлять вещи.</Text>
      )}

      <SafeAreaView>
        <CategoryScrollView
          _ListThing={ListThing}
          _SortedListThing={SortedListThing}
          _listThingSRCArray={listThingSRCArray}
          setThingsInConstructor={setThingsInConstructor}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '60%',
    marginVertical: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    marginHorizontal: '3%',
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
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: 'gray',
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
