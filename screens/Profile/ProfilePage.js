import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContex } from '../../components/contex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/core';

export default function ProfileScreen({ navigation }) {
  const { signOut } = React.useContext(AuthContex);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isFocused = useIsFocused();

  React.useEffect(() => {
    AsyncStorage.getItem('user', (err, result) => {
      if (result) {
        let localUser = JSON.parse(result);
        setUser(localUser);
        setIsLoading(false);
      }
    });
  }, [user, isFocused]);
  if (user === null || isLoading === true) {
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
    <View style={{ marginVertical: '10%', flex: 1 }}>
      <View style={styles.wrapperHeaderName}>
        <Text style={styles.headerName}>{user.name}</Text>
      </View>
      <View style={styles.wrapperSettingProfile}>
        <View style={styles.fieldsWrapper}>
          <TouchableOpacity
            style={styles.fields}
            onPress={() => {
              navigation.navigate('Настройки', { user: user });
            }}>
            <View style={styles.punkt}>
              <Text style={styles.textof}>Настройки профиля</Text>
              <Ionicons
                style={{ position: 'absolute', right: 0 }}
                name={'chevron-forward-sharp'}
                size={32}></Ionicons>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.fieldsWrapper}>
          <TouchableOpacity
            style={styles.fields}
            onPress={() => {
              signOut();
            }}>
            <View style={styles.bthExit}>
              <Text style={styles.textof}>Выход</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldsWrapper: {
    flexDirection: 'row',
  },
  fields: {
    marginTop: '3%',
    marginBottom: '3%',
    width: '100%',
    height: '100%',
  },
  textof: {
    fontSize: 20,
    textAlign: 'center',
  },
  punkt: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  bthExit: {
    padding: '2%',
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: 'gray',
    borderRadius: 3,
  },
  headerName: {
    fontSize: 22,
    textAlign: 'center',
    color: 'gray',
  },
  wrapperHeaderName: {
    marginTop: '5%',
    borderBottomWidth: 0.7,
    borderColor: '#fff',
    borderBottomColor: '#BCBCBC',
  },
  wrapperSettingProfile: {
    borderBottomWidth: 0.7,
    borderColor: 'gray',
    borderBottomColor: '#BCBCBC',
    marginHorizontal: '2%',
    flex: 3,
  },
});
