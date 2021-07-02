import React, { Component, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { ActionSheet, Root } from 'native-base';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function AddClothing({ navigation }) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [nameOfCategory, setNameOfCategory] = React.useState('Верхняя одежда');
  const [nameOfSeason, setNameOfSeason] = React.useState('Зима');

  const onClickAddImage = () => {
    const BUTTONS = ['Take Photo', 'Choose Photo Library', 'Cancel'];
    ActionSheet.show(
      { options: BUTTONS, cancelButtonIndex: 2, title: 'Select a Photo' },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            navigation.navigate('AddThingPictureNow');
            break;
          case 1:
            openImagePickerAsync();
            break;
          default:
            break;
        }
      },
    );
  };

  const onSaveThing = () => {
    navigation.goBack();
    alert('Вещь в шкафу:)');
  };

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  const DropdownCategory = () => {
    return (
      <RNPickerSelect
        value={nameOfCategory}
        useNativeAndroidPickerStyle={false}
        onValueChange={(value) => setNameOfCategory(value)}
        items={[
          { label: 'Верхняя одежда', value: 'Верхняя одежда' },
          { label: 'Штаны', value: 'Штаны' },
          { label: 'Носки', value: 'Носки' },
        ]}>
        <Text style={styles.DropdownText}>{nameOfCategory}</Text>
      </RNPickerSelect>
    );
  };
  const DropdownSeason = () => {
    return (
      <RNPickerSelect
        value={nameOfCategory}
        useNativeAndroidPickerStyle={false}
        onValueChange={(value) => setNameOfSeason(value)}
        items={[
          { label: 'Зима', value: 'Зима' },
          { label: 'Весна', value: 'Весна' },
          { label: 'Лето', value: 'Лето' },
        ]}>
        <Text style={styles.DropdownText}>{nameOfSeason}</Text>
      </RNPickerSelect>
    );
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.content}>
        <View style={styles.contentImage}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Text style={styles.header}>Добавление вещи</Text>
            <TouchableOpacity onPress={onSaveThing}>
              <Text style={styles.bthSave}> Сохранить </Text>
            </TouchableOpacity>
          </View>
          <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        </View>
        <View style={styles.wrapperDropdown}>
          <View style={styles.Dropdown}>
            <Text style={styles.headerDropdown}>Категория</Text>
            <DropdownCategory />
          </View>
          <View style={styles.Dropdown}>
            <Text style={styles.headerDropdown}>Сезон</Text>
            <DropdownSeason />
          </View>
        </View>
      </View>
    );
  }

  return (
    <Root>
      <View style={styles.contentRoot}>
        <TouchableOpacity onPress={onClickAddImage} style={styles.bthPressStyle}>
          <Text style={{ fontWeight: 'bold' }}> Ура, добавим новые вещи </Text>
        </TouchableOpacity>
      </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  contentRoot: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentImage: {
    alignItems: 'center',
    marginTop: '10%',
    height: '60%',
  },
  content: {
    marginTop: '5%',
  },
  bthPressStyle: {
    backgroundColor: '#ffffff',
    height: 50,
    width: width - 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    backgroundColor: '#2F455C',
    height: 150,
    width: width - 60,
    resizeMode: 'contain',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  header: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: '10%',
    marginLeft: '35%',
  },
  wrapperDropdown: {
    marginTop: '18%',
    height: '15%',
    marginHorizontal: '10%',
  },
  Dropdown: {
    marginTop: '10%',
    width: '80%',
    // backgroundColor:"#000000"
  },
  DropdownText: {
    color: 'gray',
    fontSize: 15,
    marginTop: '2%',
  },
  headerDropdown: {
    fontSize: 20,
  },
  bthSave: { fontWeight: 'bold', marginLeft: '25%', color: '#138598' },
});
