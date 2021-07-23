import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import { AuthContex } from '../../../components/contex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewLook from './ComponentsSavedLooks/ViewLook';
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Loader from '../../../components/Loader';

export default function Looks({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [looks, setLooks] = useState(null);

  React.useEffect(() => {
    AsyncStorage.getItem('id', (err, result) => {
      if (result) {
        fetch(`https://wardrobeapp.azurewebsites.net/GetAllLooks/${result}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data !== undefined) {
              setLooks(data);
              setIsLoading(false);
            }
          });
      }
    });
  }, []);

  if (isLoading === true || looks === null) {
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
          {looks.map((item, index) => {
            return <ViewLook look={item} key={index} />;
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
