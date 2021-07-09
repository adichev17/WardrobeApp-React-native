import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/core';
import DataUserComponent from './DataUserComponent/DataUserComponent';

export default function SettingPage({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <DataUserComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    height: '100%',
  },
});
