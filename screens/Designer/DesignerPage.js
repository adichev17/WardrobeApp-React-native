import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryScrollView from './ComponentsDesignerPages/TitleCategoryScrollView';
import Loader from '../../components/Loader';

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

  const SaveImages = () => {
    setIsLoading(true);
    if (Data !== null) {
      AsyncStorage.getItem('id', (err, id) => {
        if (id) {
          let Look = {
            ImagesURI: Data,
          };
          console.log(Look);
          fetch(`https://wardrobeapp.azurewebsites.net/AddLook/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(Look),
          }).then((res) => {
            if (res.status === 200) {
              setData(null);
              setIsLoading(false);
              Alert.alert('Успешно', 'Образ сохранён.');
            } else {
              setData(null);
              setIsLoading(false);
              Alert.alert('Ошибка', 'Упс... что-то пошло не так.');
            }
          });
        }
      });
    } else {
      Alert.alert('Ошибка', 'Выберите вещи которые хотите добавить.');
    }
  };

  const renderItem = ({ item }) => <Item uri={item} />;

  if (ListThing === null || SortedListThing === null || isLoading === true) {
    return <Loader />;
  }

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerTitle}>Конструктор</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Looks')}>
          <Text>Образы</Text>
        </TouchableOpacity>
      </View>
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
      <View style={styles.wrapperFAB}>
        <FAB
          icon={<Icon name="angle-double-down" size={28} color="#ffffff" />}
          titleStyle={{ color: 'black' }}
          buttonStyle={styles.ButtonFAB}
          onPress={() => {
            SaveImages();
          }}
        />
      </View>
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
  ActivityIndicator: {
    flex: 1,
    height: '100%',
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonFAB: {
    // borderRadius: '5%',
    width: 55,
    height: 55,
    backgroundColor: '#2C3138',
  },
  wrapperFAB: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 30,
    right: 10,
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: '2%',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    marginHorizontal: '3%',
    paddingBottom: 5,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#699CDE',
  },
});
