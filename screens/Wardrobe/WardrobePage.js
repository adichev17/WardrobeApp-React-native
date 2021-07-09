import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { BottomSheet, ListItem, Button } from 'react-native-elements';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddClothing from './AddNewClothing/AddClothing';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ThingComponentScrollViewWrapper from './Components/ThingComponentScrollViewWrapper';

import { ActionSheet, Root } from 'native-base';

import { FAB } from 'react-native-elements';
import { style } from 'styled-system';

export default function WardRobePage({ navigation }) {
  const [isVisible, setIsVisible] = useState(false);
  const [nameActiveCategory, setNameActiveCategory] = useState('Все вещи');
  const [isLoading, setIsLoading] = useState(false);

  const [ListThing, setListThing] = useState(null);

  const [SortedListThing, setSortedListThing] = useState(null);

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
            }
          });
      }
    });
  };

  useEffect(() => {
    GetAllThings();
  }, []);

  useEffect(() => {
    SortedForCategory();
  }, [nameActiveCategory]);

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

  const list = [
    {
      title: 'Все вещи',
      onPress: () => {
        setNameActiveCategory('Все вещи'), setIsVisible(false);
      },
    },
    {
      title: 'Верхняя одежда',
      onPress: () => {
        setNameActiveCategory('Верхняя одежда'), setIsVisible(false);
      },
    },
    {
      title: 'Обувь',
      onPress: () => {
        setIsVisible(false), setNameActiveCategory('Обувь');
      },
    },
    {
      title: 'Джинсы',
      onPress: () => {
        setIsVisible(false), setNameActiveCategory('Джинсы');
      },
    },
    {
      title: 'Выйти из меню',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

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
    <View style={styles.wrapper}>
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
          {list.map((l, i) => (
            <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
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
      <View
        style={{
          position: 'absolute',
          width: 50,
          height: 50,
          bottom: 0,
          right: 0,
          zIndex: 2,
        }}>
        <FAB
          icon={<Icon name="download" size={23} color="black" />}
          titleStyle={{ color: 'black' }}
          buttonStyle={{
            borderRadius: '5%',
            width: 55,
            height: 55,
            backgroundColor: '#DADADA',
          }}
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
  },
  scrollView: {
    // backgroundColor: '#ffffff',
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
});
