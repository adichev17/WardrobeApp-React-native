import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Button from '../../components/button';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{}}>
      <ImageBackground
        source={require('../../src/bgmain.jpg')}
        style={styles.imgBackground}
        resizeMode="cover">
        <View style={styles.wrapperMainInfo}>
          <Text style={styles.logo}>style wardrobe</Text>
          <Text style={styles.mainInfo}>Ваш цифровой шкаф.</Text>
          <Text style={styles.mainInfo}>Спланируйте идельный лук для любого случая.</Text>
        </View>

        <View style={styles.WrapperButtons}>
          <View>
            <Button nav={navigation} text="Вход" />
          </View>
          <Text
            style={{
              fontSize: 18,
              color: '#ffffff',
              textAlign: 'center',
              marginVertical: 7,
            }}>
            или
          </Text>
          <View>
            <Button nav={navigation} text="Зарегистрироваться" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  imgBackground: {
    height: '100%',
  },
  WrapperButtons: {
    marginTop: '60%',
  },
  mainInfo: {
    color: '#ffffff',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '500',
  },
  logo: {
    color: '#ffffff',
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '20%',
  },
  wrapperMainInfo: {
    marginHorizontal: '10%',
    marginTop: '20%',
  },
});
