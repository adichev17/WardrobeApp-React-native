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
} from 'react-native';
import { BottomSheet, ListItem, Button } from 'react-native-elements';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddClothing from './AddNewClothing/AddClothing';

import ThingComponentScrollViewWrapper from './Components/ThingComponentScrollViewWrapper';

import { ActionSheet, Root } from 'native-base';

import { FAB } from 'react-native-elements';
import { style } from 'styled-system';

export default function HomeScreen({ navigation }) {
  const [isVisible, setIsVisible] = useState(false);
  const [nameActiveCategory, setNameActiveCategory] = useState('Все вещи');

  const list = [
    {
      title: 'Все вещи',
      onPress: () => {
        setIsVisible(false), setNameActiveCategory('Все вещи');
      },
    },
    {
      title: 'Верхняя одежда',
      onPress: () => {
        setIsVisible(false), setNameActiveCategory('Верхняя одежда');
      },
    },
    {
      title: 'Штаны',
      onPress: () => {
        setIsVisible(false), setNameActiveCategory('Штаны');
      },
    },
    {
      title: 'Выйти из меню',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

  const ListThing = [
    {
      category: 'Штаны',
      includeThing: [
        'https://shop4big.ru/image/cache/catalog/data/Bruki%20leto/Bryuki%20Leto%202017/meyer-bonn-5404-17-1-460x460.jpeg',
        'https://li0.rightinthebox.com/images/500x500/201910/uwanqr1570525788498.jpg',
        'https://indiastyle.ru/files_ru/products/original/14307-2213-6-3.jpg',
      ],
    },
    {
      category: 'Верхняя одежда',
      includeThing: [
        'https://homedorf.ru/upload/iblock/f32/f32e61630aaa46cbf656c6e4eae96756.jpg',
        'https://www.vitoricci.ru/images/131865052562889531-2.jpg',
        'https://avatars.mds.yandex.net/get-marketpic/364498/market_A7P6pT7Wb3sEQWBU840iMA/orig',
      ],
    },
    {
      category: 'Кроссовки',
      includeThing: ['https://static.kupivip.ru/V0/04/09/02/00/3b.jpg'],
    },
  ];

  const onClickAddImage = () => {
    const BUTTONS = ['Take Photo', 'Choose Photo Library', 'Cancel'];
    ActionSheet.show(
      { options: BUTTONS, cancelButtonIndex: 2, title: 'Select a Photo' },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.takePhotoFromCamera();
          case 1:
            openImagePickerAsync();
          default:
            break;
        }
      },
    );
  };

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
          {ListThing.map((thing) => {
            return (
              <ThingComponentScrollViewWrapper
                includeThing={thing.includeThing}
                titleCategory={thing.category}
              />
            );
          })}
          {/* <ScrollView style={styles.wrapperCategoryThing} horizontal={true}></ScrollView> */}
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
