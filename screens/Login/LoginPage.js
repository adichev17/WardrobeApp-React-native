import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { isPasswordValid } from '../../src/Validation/Valid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContex } from '../../components/contex';
import Loader from '../../components/Loader';

export default function LoginScreen({ route, navigation }) {
  const [inputLogin, setInputLogin] = useState('DmtriyHi3');
  const [inputPassword, setinputPassword] = useState('Admin12345_');
  const { signIn } = React.useContext(AuthContex);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={{ backgroundColor: 'black', height: '100%' }}>
      <ImageBackground
        source={require('../../src/bgLogin.jpg')}
        style={styles.wrapperPage}
        cache="force-cache"
        resizeMode="cover">
        {isLoading ? (
          <Loader />
        ) : (
          <View>
            <Text style={styles.header}>Добро пожаловать!</Text>
            <Input
              placeholder="Логин"
              maxLength={32}
              autoCorrect={false}
              value={inputLogin}
              errorStyle={{ marginHorizontal: 34 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onChangeText={(login) => {
                setInputLogin(login);
              }}
              error={inputLogin.length < 6 ? (inputLogin === '' ? false : true) : false}
              errorMessage={
                inputLogin.length < 6
                  ? inputLogin === ''
                    ? true
                    : 'Укажите более 6 символов.'
                  : true
              }
              style={styles.inputLogin}
            />
            <Input
              placeholder="Ваш Пароль"
              maxLength={25}
              autoCorrect={false}
              errorStyle={{ marginHorizontal: 34 }}
              secureTextEntry={true}
              value={inputPassword}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onChangeText={(password) => {
                setinputPassword(password);
              }}
              errorMessage={
                isPasswordValid(inputPassword) ? (
                  inputPassword === '' ? (
                    false
                  ) : (
                    <Text>
                      Пароль должен быть не короче 8 символов и содержать строчную и заглавную буквы
                      и цифру.
                    </Text>
                  )
                ) : (
                  false
                )
              }
              error={isPasswordValid(inputPassword) ? (inputPassword === '' ? false : true) : false}
              style={styles.inputPass}></Input>

            <View
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Button
                onPress={() => {
                  signIn(inputLogin, inputPassword, setIsLoading);
                  setIsLoading(true);
                  AsyncStorage.setItem('test123', 'true');
                }}
                buttonStyle={styles.buttonAuth}
                disabled={isPasswordValid(inputPassword) || inputLogin < 8}
                title="Войти"
              />
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  inputLogin: {
    borderWidth: 1,
    color: '#ffffff',
    borderRadius: 14,
    height: 50,
    fontSize: 20,
    marginHorizontal: 30,
    backgroundColor: '#A9A9A9',
    borderColor: '#e0e0e0',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  buttonAuth: {
    marginTop: 40,
    marginHorizontal: '23%',
    borderRadius: 17,
    backgroundColor: '#00a86b',
  },
  inputPass: {
    borderWidth: 1,
    borderRadius: 14,
    height: 50,
    fontSize: 20,
    marginHorizontal: 30,
    backgroundColor: '#A9A9A9',
    borderColor: '#e0e0e0',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  wrapperPage: {
    height: '100%',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: '70%',
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
