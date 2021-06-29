import React, { Component } from 'react';
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

import * as ImagePicker from 'expo-image-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function AddClothing() {
  const [selectedImage, setSelectedImage] = React.useState(null);

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

  if (selectedImage !== null) {
    return (
      <View style={styles.content}>
        <Text style={styles.header}>Добавление вещи</Text>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
      </View>
    );
  }

  return (
    <Root>
      <View style={styles.content}>
        <TouchableOpacity onPress={onClickAddImage} style={styles.bthPressStyle}>
          <Text> Press-Add-image </Text>
        </TouchableOpacity>
      </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
  },
  bthPressStyle: {
    backgroundColor: '#0080ff',
    height: 50,
    width: width - 60,
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
    width: 500,
    height: height - 350,
    resizeMode: 'contain',
  },
  header: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: '10%',
  },
});
