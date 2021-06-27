import * as React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  CheckBox,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { isPasswordValid } from '../src/Validation/Valid';
import { Input, Button } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';

export default function RegScreen({ navigation }) {
  const [inputName, setInputName] = useState('');
  const [inputLogin, setInputLogin] = useState('');
  const [inputPassword1, setinputPassword1] = useState('');
  const [inputPassword2, setinputPassword2] = useState('');
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [Test, setTest] = useState('');

  const Registrarion = () => {
    setIsLoading(true);
    let userData = {
      UserLogin: inputLogin.toString(),
      Name: inputName.toString(),
      Number: inputPhoneNumber.international.toString(),
      Password: inputPassword1.toString(),
    };
    fetch(`https://localhost:44368/reg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },

      body: JSON.stringify(userData),
    }).then((res) => {
      setIsLoading(false);
      if (res.status === 200) {
        navigation.goBack();
        Alert.alert('Успех', 'Вы успешно зарегистрировались!');
      } else alert('Ошибка');
      setIsLoading(true);
    });
  };

  return (
    <View>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}>
          <ActivityIndicator size="large" color="#00aa00"></ActivityIndicator>
        </View>
      ) : (
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: '35%',
              fontSize: 25,
              marginBottom: 20,
            }}>
            Регистрация
          </Text>
          <Input
            placeholder="Логин"
            maxLength={29}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            value={inputLogin}
            autoCorrect={false}
            onChangeText={(text) => {
              setInputLogin(text);
            }}
            errorStyle={{ marginHorizontal: 34 }}
            error={inputLogin.length < 8 ? (inputLogin === '' ? false : true) : false}
            errorMessage={
              inputLogin.length < 8 ? (inputLogin === '' ? true : 'Укажите более 8 символов') : true
            }
            style={styles.input}
          />
          <Input
            placeholder="Имя"
            maxLength={29}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            value={inputName}
            autoCorrect={false}
            onChangeText={(name) => {
              setInputName(name);
            }}
            errorStyle={{ marginHorizontal: 34 }}
            error={inputName.length < 6 ? (inputName === '' ? false : true) : false}
            errorMessage={
              inputName.length < 6 ? (inputName === '' ? true : 'Укажите более 6 символов.') : true
            }
            style={styles.input}
          />

          <View>
            <TextInputMask
              placeholder="Номер телефона"
              type={'cel-phone'}
              options={{
                maskType: 'Custom',
                withDDD: true,
                dddMask: '+7(***)-***-**-**',
              }}
              style={styles.inputNumber}
              value={inputPhoneNumber.international}
              maxLength={17}
              onChangeText={(text) => {
                setInputPhoneNumber({
                  international: text,
                });
              }}
            />
          </View>

          <Input
            secureTextEntry={true}
            placeholder="Пароль"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            maxLength={30}
            errorStyle={{ marginHorizontal: 34 }}
            value={inputPassword1}
            autoCorrect={false}
            onChangeText={(password1) => {
              setinputPassword1(password1);
            }}
            error={isPasswordValid(inputPassword1) ? (inputPassword1 === '' ? false : true) : false}
            errorMessage={
              isPasswordValid(inputPassword1) ? (
                inputPassword1 === '' ? (
                  false
                ) : (
                  <Text>
                    Пароль должен быть не короче 8 символов и содержать строчную и заглавную буквы и
                    цифру.
                  </Text>
                )
              ) : (
                false
              )
            }
            style={styles.input}
          />
          <Input
            secureTextEntry={true}
            placeholder="Повторите пароль"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            maxLength={32}
            value={inputPassword2}
            errorStyle={{ marginHorizontal: 34 }}
            onChangeText={(password2) => {
              setinputPassword2(password2);
            }}
            autoCorrect={false}
            error={inputPassword1 !== inputPassword2 && inputPassword2.length > 0}
            errorMessage={
              inputPassword1 !== inputPassword2 ? (
                inputPassword2 !== '' ? (
                  <Text> Пароли не совпадают</Text>
                ) : (
                  <Text> </Text>
                )
              ) : (
                false
              )
            }
            style={styles.input}
          />

          <View
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Button
              onPress={() => {
                Registrarion();
              }}
              disabled={
                inputPassword1 !== inputPassword2 ||
                inputName.length < 2 ||
                inputPassword1.length < 1
              }
              buttonStyle={styles.buttonReg}
              title="Зарегестрироваться"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonReg: {
    marginTop: 50,
    marginHorizontal: '23%',
    borderRadius: 17,
    padding: 10,
    backgroundColor: '#00a86b',
  },
  input: {
    borderWidth: 2,
    borderRadius: 14,
    height: 50,
    fontSize: 20,
    marginHorizontal: 30,
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
    paddingHorizontal: 20,
  },
  inputNumber: {
    borderWidth: 2,
    borderRadius: 14,
    height: 50,
    fontSize: 20,
    marginHorizontal: 30,
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputNumber: {
    borderWidth: 2,
    borderRadius: 14,
    height: 50,
    fontSize: 20,
    marginHorizontal: 39,
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
    paddingHorizontal: 20,
    marginTop: 0,
    marginBottom: 20,
  },
});
