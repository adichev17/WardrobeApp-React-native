import React from 'react';
import { useState } from 'react';
import { Input, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { isEmailValid } from '../../../../src/Validation/Valid';
import Loader from '../../../../components/Loader';

export default function DataUserComponent(props) {
  const [user, setUser] = useState(null);
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [BirthDay, setBirthDay] = useState('');
  const [Email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    AsyncStorage.getItem('user', (err, result) => {
      if (result) {
        let localUser = JSON.parse(result);
        setUser(localUser);
        setIsLoading(false);

        setBirthDay({
          dt: localUser.dateBirth,
        });
        setPhoneNumber({
          international: localUser.phoneNumber,
        });
        setEmail(localUser.email);
      }
    });
  }, []);

  if (user === null || isLoading === true) {
    return <Loader />;
  }

  return (
    <View style={{ marginVertical: '20%' }}>
      <View style={{ marginHorizontal: 10, marginBottom: '5%' }}>
        <Text style={{ marginHorizontal: 30, color: '#808080', fontSize: 18, fontWeight: '500' }}>
          Номер телефона
        </Text>
        <TextInputMask
          type={'cel-phone'}
          options={{
            maskType: 'Custom',
            withDDD: true,
            dddMask: '+7(***)-***-**-**',
          }}
          style={styles.inputData}
          value={PhoneNumber.international}
          maxLength={17}
          onChangeText={(text) => {
            setPhoneNumber({
              international: text,
            });
          }}
        />
      </View>

      <View style={{ marginHorizontal: 10, marginBottom: '5%' }}>
        <Text style={{ marginHorizontal: 30, color: '#808080', fontSize: 18, fontWeight: '500' }}>
          Дата рождения
        </Text>
        <TextInputMask
          style={styles.inputData}
          type={'datetime'}
          value={BirthDay.dt}
          options={{
            format: 'DD.MM.YYYY',
          }}
          onChangeText={(text) => {
            setBirthDay({
              dt: text,
            });
          }}
        />
      </View>

      <Input
        label="Электронная почта"
        error={isEmailValid(Email) ? (Email === '' ? false : true) : false}
        errorStyle={{ marginHorizontal: 34 }}
        errorMessage={
          isEmailValid(Email) ? (Email === '' ? false : 'Формат example@mail.ru') : false
        }
        defaultValue={Email}
        labelStyle={{ marginHorizontal: 30, color: '#808080', fontSize: 18, fontWeight: '500' }}
        autoCorrect={false}
        style={styles.inputData}
        onChangeText={(text) => {
          setEmail(text);
        }}
        inputContainerStyle={{ borderBottomWidth: 0 }}></Input>
    </View>
  );
}

const styles = StyleSheet.create({
  inputData: {
    borderRadius: 14,
    height: 50,
    fontSize: 20,
    marginHorizontal: 30,
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
