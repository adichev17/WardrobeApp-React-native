import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { BottomSheet, ListItem, Button } from 'react-native-elements';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

import ThingComponentScrollViewWrapper from './Components/ThingComponentScrollViewWrapper';

import { FAB } from 'react-native-elements';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function WardRobePage({ navigation }) {
  const [isVisible, setIsVisible] = useState(false);
  const [nameActiveCategory, setNameActiveCategory] = useState('Все вещи');
  const [isLoading, setIsLoading] = useState(false);

  const [ListThing, setListThing] = useState(null);

  const [SortedListThing, setSortedListThing] = useState(null);

  const [ListCategory, setListCategory] = useState(null);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetAllThings();
    // wait(2000).then(() => setRefreshing(false));
  }, []);

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
              setRefreshing(false);
            }
          });
      }
    });
  };

  const SortedForCategory = () => {
    if (nameActiveCategory !== 'Все вещи' && ListThing !== null) {
      let newList = [];
      let sortCategory = ListThing.filter((name) => {
        return name.category == nameActiveCategory;
      })[0];
      newList.push(sortCategory);
      setSortedListThing(newList);
      console.log('-------------------------');
      console.log(sortCategory);
    } else if (nameActiveCategory === 'Все вещи' && ListThing !== null) {
      setSortedListThing(ListThing);
    }
  };

  useEffect(() => {
    GetAllThings();
  }, []);

  useEffect(() => {
    SortedForCategory();
  }, [nameActiveCategory]);

  useEffect(() => {
    if (ListThing !== null) {
      let ListTitleCategorys = [];
      let TitleAllThing = {};

      TitleAllThing['title'] = 'Все вещи';
      TitleAllThing['onPress'] = () => {
        setNameActiveCategory('Все вещи'), setIsVisible(false);
      };
      ListTitleCategorys.push(TitleAllThing);

      ListThing.map((el) => {
        let TitleCategory = {};
        TitleCategory['title'] = el.category;
        TitleCategory['onPress'] = () => {
          setNameActiveCategory(el.category), setIsVisible(false);
        };
        ListTitleCategorys.push(TitleCategory);
      });

      let TitleExit = {};
      TitleExit['title'] = 'Выйти из меню';
      TitleExit['containerStyle'] = { backgroundColor: 'red' };
      TitleExit['titleStyle'] = { color: 'white' };
      TitleExit['onPress'] = () => setIsVisible(false);

      ListTitleCategorys.push(TitleExit);

      setListCategory(ListTitleCategorys);
    }
  }, [ListThing]);

  if (ListThing === null || SortedListThing === null) {
    return <Loader />;
  }

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.containerPage}>
        <ScrollView
          contentContainerStyle={styles.scrollViewPage}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={{ flex: 1 }}>
            <Text style={styles.header}>Ваш гардероб</Text>
            <Button
              title={nameActiveCategory}
              buttonStyle={styles.openModalCategory}
              titleStyle={styles.titleCategory}
              onPress={(state) => setIsVisible(true)}
            />
            <BottomSheet
              isVisible={isVisible}
              containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}>
              {ListCategory !== null ? (
                ListCategory.map((l, i) => (
                  <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                    <ListItem.Content>
                      <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))
              ) : (
                <Text></Text>
              )}
            </BottomSheet>
          </View>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              {SortedListThing.map((thing, i) => {
                return (
                  <ThingComponentScrollViewWrapper
                    key={i}
                    includeThings={thing.includeThings}
                    titleCategory={thing.category}
                  />
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.wrapperFAB}>
        <FAB
          icon={<Icon name="download" size={23} color="black" />}
          titleStyle={{ color: 'black' }}
          buttonStyle={styles.buttonFAB}
          onPress={() => {
            navigation.navigate('addClothing');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: '5%',
    marginVertical: '10%',
    flex: 1,
  },
  header: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  openModalCategory: {
    backgroundColor: '#ffffff',
    marginTop: '10%',
  },
  titleCategory: {
    color: '#706E6E',
    fontSize: 15,
    fontWeight: 'bold',
  },
  container: {
    flex: 4,
    paddingTop: StatusBar.currentHeight,
    zIndex: 1,
    marginTop: '5%',
  },
  scrollView: {
    marginHorizontal: 0,
    width: '100%',
  },
  text: {
    fontSize: 42,
  },
  wrapperCategoryThing: {
    height: 100,
    width: 100,
    backgroundColor: '#ffffff',
  },
  containerPage: {
    flex: 1,
  },
  wrapperFAB: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 0,
    right: 0,
    zIndex: 2,
  },
  buttonFAB: {
    width: 55,
    height: 55,
    backgroundColor: '#DADADA',
  },
});
