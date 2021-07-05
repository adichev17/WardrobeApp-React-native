import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';

import { ActionSheet, Root } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function AddThingPictureNow({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [nameOfCategory, setNameOfCategory] = React.useState('Верхняя одежда');
  const [nameOfSeason, setNameOfSeason] = React.useState('Зима');
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageTobase64, setImageTobase64] = React.useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onSaveThing = () => {
    setIsLoading(() => true);
    fetch(
      `https://wardrobeapp.azurewebsites.net/CreateThing/1fdd05d8-3052-478b-95cb-aaf72b9b89e3`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          ImageSrc: imageTobase64,
          Season: nameOfSeason,
          Category: nameOfCategory,
        }),
      },
    ).then((response) => {
      if (response.status === 200) {
        navigation.goBack();
        alert('Вещь в шкафу:)');
        setIsLoading(false);
      } else {
        alert('Error');
      }
    });
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

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (selectedImage != null) {
    return (
      <View style={styles.content}>
        {isLoading ? (
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
        ) : (
          <View>
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
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignSelf: 'center' }}
            onPress={async () => {
              if (cameraRef) {
                let photo = await cameraRef.takePictureAsync({ base64: true });
                setSelectedImage({ localUri: photo.uri });

                setImageTobase64(photo.base64);
              }
            }}>
            <View
              style={{
                borderWidth: 2,
                borderRadius: '50%',
                borderColor: 'white',
                height: 50,
                width: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: '50%',
                  borderColor: 'white',
                  height: 40,
                  width: 40,
                  backgroundColor: 'white',
                }}></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  contentRoot: {
    // flex: 1,
    // marginTop: '50%',
    height: '100%',
    justifyContent: 'center',
    // marginHorizontal: '5%',
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
