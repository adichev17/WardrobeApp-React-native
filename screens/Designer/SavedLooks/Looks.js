import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import { AuthContex } from '../../../components/contex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewLook from './ComponentsSavedLooks/ViewLook';
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Loader from '../../../components/Loader';

const images = [
  [
    'https://wardrobeapp.azurewebsites.net/Images/Thu Jul 08 2021 18:50:04 GMT+0300 (MSK).jpg',
    'https://wardrobeapp.azurewebsites.net/Images/Thu Jul 08 2021 18:52:38 GMT+0300 (MSK).jpg',
  ],
  [
    'https://wardrobeapp.azurewebsites.net/Images/Thu Jul 08 2021 18:46:59 GMT+0300 (MSK).jpg',
    'https://wardrobeapp.azurewebsites.net/Images/Thu Jul 08 2021 18:54:01 GMT+0300 (MSK).jpg',
    'https://wardrobeapp.azurewebsites.net/Images/Thu Jul 08 2021 18:51:53 GMT+0300 (MSK).jpg',
  ],
];
export default function Looks({ navigation }) {
  const { signOut } = React.useContext(AuthContex);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    AsyncStorage.getItem('user', (err, result) => {
      if (result) {
        let localUser = JSON.parse(result);
        setUser(localUser);
        setIsLoading(false);
      }
    });
  }, [user]);

  if (user === null || isLoading === true) {
    return <Loader />;
  }
  return (
    <View style={{ marginVertical: '10%', flex: 1 }}>
      <TouchableOpacity
        style={styles.wrapperFAB}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="arrow-left" size={33} color="black" />
        <Text style={styles.headerTitle}>Образы</Text>
      </TouchableOpacity>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView>
          {images.map((item) => {
            return <ViewLook look={item} />;
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  wrapperFAB: {
    marginHorizontal: '2%',
    marginVertical: '3%',
    flexDirection: 'row',
  },
  headerTitle: {
    fontWeight: '500',
    color: '#706E6E',
    fontSize: 18,
    marginTop: '1.5%',
    marginLeft: '34%',
  },
});
