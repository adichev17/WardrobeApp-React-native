import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { BottomSheet, ListItem, Button } from 'react-native-elements';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddClothing from './AddNewClothing/AddClothing';

import { FAB } from 'react-native-elements';

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

  return (
    <View style={styles.wrapper}>
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
      <View style={{ marginTop: '10%' }}>
        <FAB
          icon={<Icon name="download" size={30} color="black" />}
          titleStyle={{ color: 'black' }}
          buttonStyle={{
            // borderRadius: '50%',
            width: 70,
            height: 70,
            marginBottom: '5%',
            backgroundColor: '#A9A9A9',
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
    marginHorizontal: '10%',
    marginVertical: '10%',
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
    color: '#000000',
    fontSize: 15,
  },
});
